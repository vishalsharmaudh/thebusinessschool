import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '../supabaseClient';
import { decode as atob } from 'base-64';

const IMAGE_SIZE = (Dimensions.get('window').width - 40) / 2;

export default function GalleryAdmin() {
  const [imageUri, setImageUri] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleting, setDeleting] = useState(null); // Track which image is being deleted

  const fetchGalleryImages = async () => {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from('gallery')
      .list('gallery-images', { limit: 100 });

    if (error) {
      console.error('Error fetching images:', error.message);
      setLoading(false);
      return;
    }

    const urls = data
      .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
      .map((file) => ({
        name: file.name,
        fullPath: `gallery-images/${file.name}`, // Store full path for deletion
        url: `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/gallery/gallery-images/${file.name}`,
      }));

    setImages(urls.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchGalleryImages();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current session:', session);
    if (!session) {
      console.warn('WARNING: No authenticated session found!');
    } else {
      console.log('Authenticated user:', session.user.email);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    console.log('Upload button clicked');

    if (!imageUri) {
      Alert.alert('Error', 'No image selected');
      return;
    }

    setUploading(true);
    console.log('Starting upload for:', imageUri);

    try {
      const fileExt = imageUri.split('.').pop();
      const fileName = `gallery-images/gallery_${Date.now()}.${fileExt}`;
      const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

      console.log('Reading file as base64...');
      const fileBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: 'base64',
      });

      console.log('Converting to byte array...');
      const byteCharacters = atob(fileBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      console.log('Uploading to Supabase...');
      const { error } = await supabase.storage
        .from('gallery')
        .upload(fileName, byteArray, {
          contentType,
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error.message);
        Alert.alert('Upload failed', error.message);
      } else {
        console.log('Upload successful!');
        Alert.alert('Success', 'Upload successful!');
        setImageUri(null);
        await fetchGalleryImages();
      }
    } catch (err) {
      console.error('Final upload error:', err);
      Alert.alert('Upload failed', err.message || 'Network or permission issue.');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imagePath, imageName) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(imageName);
            console.log('Attempting to delete image with path:', imagePath);

            try {
              // Try multiple path formats to see which one works
              const pathsToTry = [
                imagePath,
                imageName,
                `gallery-images/${imageName}`,
              ];

              console.log('Trying paths:', pathsToTry);

              // First, let's verify the file exists
              const { data: listData, error: listError } = await supabase.storage
                .from('gallery')
                .list('gallery-images');

              console.log('Files in bucket:', listData);

              // Now try to delete
              const { data, error } = await supabase.storage
                .from('gallery')
                .remove([imagePath]);

              console.log('Delete response data:', data);
              console.log('Delete response error:', error);

              if (error) {
                console.error('Delete error details:', JSON.stringify(error, null, 2));
                Alert.alert('Delete failed', `Error: ${error.message || JSON.stringify(error)}`);
              } else if (data && data.length > 0) {
                console.log('Delete successful!');
                Alert.alert('Success', 'Image deleted successfully!');
                await fetchGalleryImages();
              } else {
                console.log('No error but no data returned');
                Alert.alert('Warning', 'Delete command sent but no confirmation received. Refreshing...');
                await fetchGalleryImages();
              }
            } catch (err) {
              console.error('Final delete error:', err);
              Alert.alert('Delete failed', err.message || 'An error occurred.');
            } finally {
              setDeleting(null);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={{ uri: item.url }} style={styles.image} />
      </TouchableOpacity>
      
      {deleting === item.name ? (
        <View style={styles.deleteButtonContainer}>
          <ActivityIndicator size="small" color="#ff0000" />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={() => deleteImage(item.fullPath, item.name)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Upload Image</Text>
      <Button title="Pick Image" onPress={pickImage} disabled={uploading} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      {uploading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginVertical: 20 }}
        />
      ) : (
        <Button
          title="Upload to Gallery"
          onPress={uploadImage}
          disabled={!imageUri}
        />
      )}

      <View style={styles.separator} />

      <Text style={styles.heading}>Gallery Preview</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : images.length === 0 ? (
        <Text style={styles.noImages}>No images found.</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          scrollEnabled={false}
        />
      )}

      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeModal}
          >
            <Image
              source={{ uri: selectedImage?.url }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.modalDeleteButton}
              onPress={() => {
                closeModal();
                deleteImage(selectedImage.fullPath, selectedImage.name);
              }}
            >
              <Text style={styles.modalDeleteButtonText}>Delete Image</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  preview: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  deleteButtonContainer: {
    marginTop: 4,
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  noImages: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
  modalDeleteButton: {
    marginTop: 20,
    backgroundColor: '#ff0000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalDeleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
