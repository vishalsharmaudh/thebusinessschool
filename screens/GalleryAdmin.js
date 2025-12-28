import React, { useState, useEffect } from 'react';
import {  View,  Button,  Image,  StyleSheet,  Alert,  ScrollView,  ActivityIndicator,  FlatList,  TouchableOpacity,  Modal,  Dimensions,  Text,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../supabaseClient';

const IMAGE_SIZE = (Dimensions.get('window').width - 40) / 2;

export default function GalleryAdmin() {
  const [imageUri, setImageUri] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
      .filter(file => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
      .map(file => ({
        name: file.name,
        url: `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/gallery/gallery-images/${file.name}`,
      }));

    setImages(urls.reverse()); // Show latest uploads first
    setLoading(false);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No image selected');
      return;
    }

    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt = imageUri.split('.').pop();
      const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;
      const fileName = `gallery-images/gallery_${Date.now()}.${fileExt}`;
      const binary = atob(base64);
      const buffer = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
      }

      const { error } = await supabase.storage
        .from('gallery')
        .upload(fileName, buffer, {
          contentType,
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error.message);
        Alert.alert('Upload failed', error.message);
      } else {
        Alert.alert('Upload successful!');
        setImageUri(null);
        fetchGalleryImages(); // Refresh gallery after upload
      }
    } catch (err) {
      console.error('Final upload error:', err);
      Alert.alert('Upload failed', 'Check your internet or permission settings.');
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item.url)}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Upload Image</Text>
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      <Button title="Upload to Gallery" onPress={uploadImage} />

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

      <Modal visible={!!selectedImage} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
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
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
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
});
