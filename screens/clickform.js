import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MBAAdmissionForm() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('MBAAdmissionForm'); // This matches the name in App.js
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e6f0ff' }}>
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: '#ffffff',
          padding: 20,
          borderRadius: 16,
          width: '100%',
          maxWidth: 600,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#003366', textAlign: 'center' }}>
            MBA Admission Information
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 12, lineHeight: 22, textAlign: 'center' }}>
            Welcome to the MBA Admission Portal. Explore the details about the eligibility, process, and selection criteria below.
          </Text>

          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15, color: '#003366' }}>Eligibility:</Text>
          <Text style={{ fontSize: 16, marginBottom: 10, lineHeight: 22 }}>
            - Bachelor’s degree in any discipline with at least 50% marks (45% for reserved categories).{'\n'}
            - Final-year students can also apply.
          </Text>

          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: '#003366' }}>Admission Procedure:</Text>
          <Text style={{ fontSize: 16, marginBottom: 10, lineHeight: 22 }}>
            - Fill the online admission form.{'\n'}
            - Appear in entrance exams (CAT/MAT/CMAT).{'\n'}
            - Participate in Group Discussion & Personal Interview.
          </Text>

          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: '#003366' }}>Selection Criteria:</Text>
          <Text style={{ fontSize: 16, marginBottom: 20, lineHeight: 22 }}>
            - Entrance exam performance.{'\n'}
            - Academic record.{'\n'}
            - GD & PI performance.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#0077cc',
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center'
            }}
            onPress={handleButtonPress}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              Click Here to Fill the Form
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}