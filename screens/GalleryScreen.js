import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

// 🔁 Replace these with your actual image files
const images = [
  require('../assets/Picture1.jpg'),
  require('../assets/Picture2.png'),
  require('../assets/Picture3.jpg'),
  require('../assets/Picture4.jpg'),
  require('../assets/Picture5.jpg'),
  require('../assets/Picture6.jpg'),
];

export default function GalleryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Gallery</Text>

        <View style={styles.galleryContainer}>
          {images.map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={img}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f9fa',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 20,
    textAlign: 'center',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: (width - 48) / 2, // 2 columns with margins
    aspectRatio: 4 / 3,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
