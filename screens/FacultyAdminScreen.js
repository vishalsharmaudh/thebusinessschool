import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabaseClient';

export default function FacultyAdminScreen() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('faculty_profiles').select('*');
    if (!error) setFacultyList(data);
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      const response = await fetch(file.uri);
      const blob = await response.blob();
      const fileName = `${Date.now()}_faculty.jpg`;
      const folderName = 'faculty_images';

      setUploading(true);
      const { data, error } = await supabase.storage
        .from(folderName)
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true,
        });
      setUploading(false);

      if (error) {
        console.error('Image upload error:', error.message);
        Alert.alert('Upload Failed', 'Could not upload image.');
        return;
      }

      const imageUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/${folderName}/${fileName}`;
      console.log('Image uploaded:', imageUrl);
      setForm({ ...form, image_url: imageUrl });
    }
  };

  const openModal = (faculty = null) => {
    setEditingFaculty(faculty);
    setForm(faculty || {});
    setModalVisible(true);
  };

  const saveFaculty = async () => {
    const dataToSave = { ...form };
    let result;
    if (editingFaculty) {
      result = await supabase
        .from('faculty_profiles')
        .update(dataToSave)
        .eq('id', editingFaculty.id);
    } else {
      result = await supabase.from('faculty_profiles').insert([dataToSave]);
    }
    if (!result.error) {
      setModalVisible(false);
      fetchFaculty();
    } else {
      alert('Error saving faculty: ' + result.error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openModal(item)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.designation}</Text>
      <Text>{item.department}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Faculty</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>+ Add Faculty</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={facultyList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>{editingFaculty ? 'Edit Faculty' : 'Add Faculty'}</Text>

          {['name', 'designation', 'department', 'email', 'phone', 'address', 'education', 'research_students', 'teaching_experience', 'academic_interests', 'publications_journals', 'publications_book_chapters', 'elearning_modules', 'review_experience'].map((field) => (
            <TextInput
              key={field}
              placeholder={field.replace(/_/g, ' ').toUpperCase()}
              style={styles.input}
              value={form[field] || ''}
              onChangeText={(text) => handleInputChange(field, text)}
              multiline={field.includes('publications') || field.includes('experience')}
            />
          ))}

          {form.image_url ? (
            <Image source={{ uri: form.image_url }} style={styles.imagePreview} />
          ) : null}

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{ color: '#fff' }}>{uploading ? 'Uploading...' : 'Upload Photo'}</Text>
          </TouchableOpacity>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveFaculty}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f1f5f9' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: '100%', height: 140, borderRadius: 6, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  uploadButton: {
    backgroundColor: '#0284c7',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 140,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#9ca3af',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
