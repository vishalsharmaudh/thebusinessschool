import React, { useEffect, useState } from 'react';
import {  View,  Text,  FlatList,  Image,  StyleSheet,  ActivityIndicator,  Dimensions,  Modal ,    TouchableOpacity} from 'react-native';
import { supabase } from '../supabaseClient';
  
const IMAGE_SIZE = (Dimensions.get('window').width - 40) / 2;

export default function GalleryScreen() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ For modal image

  const fetchGalleryImages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .storage
      .from('gallery')
      .list('gallery-images', { limit: 100 });

    if (error) {
      console.error('Error fetching images:', error.message);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      console.warn('No images found in gallery bucket.');
      setImages([]);
      setLoading(false);
      return;
    }

    const urls = data
      .filter(file => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
      .map(file => ({
        name: file.name,
        url: `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/gallery/gallery-images/${file.name}`,
      }));

    setImages(urls);
    setLoading(false);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Gallery</Text>

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
        />
      )}

      {/* ✅ Image Modal */}
      <Modal visible={!!selectedImage} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
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
    marginTop: 40,
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
