 import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Using placeholder images from Unsplash (free educational images)
const PLACEHOLDER_IMAGES = {
  eligibility: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500',
  admission: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500',
  exam: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
  selection: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
  fees: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500',
  refund: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=500',
  academic: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500'
};

const sections = [
  {
    title: 'Eligibility',
    icon: 'school',
    image: PLACEHOLDER_IMAGES.eligibility,
    content: `A Bachelor's Degree (10+2+3 pattern) with at least 50% marks (45% for SC/ST), or:
- CA / Cost Accountants / Company Secretaries,
- AMIE (Engineering) with 50% (45% for SC/ST),
- Final year candidates may apply with appropriate certificates.
Must have appeared in CAT-2024.`
  },
  {
    title: 'Admission Procedure',
    icon: 'assignment',
    image: PLACEHOLDER_IMAGES.admission,
    content: `Admission is done through the department website: https://tbs.jammuuniversity.ac.in.
Fill out the online form as per the admission notice.`
  },
  {
    title: 'CAT/MAT Eligibility',
    icon: 'quiz',
    image: PLACEHOLDER_IMAGES.exam,
    content: `- CAT/MAT ≥ 50% for The Business School (Main Campus)
- CAT/MAT ≥ 25% for Kathua, Baderwah Campuses and IMS, Jammu
1st Preference: CAT
2nd Preference: MAT if seats remain vacant.`
  },
  {
    title: 'Selection Criteria',
    icon: 'star',
    image: PLACEHOLDER_IMAGES.selection,
    content: `Selection is based on:
1. CAT/MAT Score – 70%
2. Personal Interview – 10%
3. Group Discussion – 10%
4. Academic Credentials – 10%`
  },
  {
    title: 'Intake & Fee Structure',
    icon: 'attach-money',
    image: PLACEHOLDER_IMAGES.fees,
    content: `Open Merit: 60 Seats
Self-finance: 09 Seats
Fee: ₹3 Lakhs (Main), ₹2 Lakhs (Kathua/Bhaderwah)
Seats filled as per Govt. reservation policy.`
  },
  {
    title: 'Refund Rules',
    icon: 'monetization-on',
    image: PLACEHOLDER_IMAGES.refund,
    content: `100%: ≥15 days before last date
90%: <15 days before
80%: ≤15 days after
50%: 16–30 days after
0%: >30 days after last date`
  },
  {
    title: 'Academic Weightage',
    icon: 'grade',
    image: PLACEHOLDER_IMAGES.academic,
    content: `Max 10 marks:
- 10th/11th/12th: up to 5 marks
- Qualifying degree: up to 5 marks
Marks scale based on percentage bands.`
  }
];

export default function AboutScreen() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e3c72', '#2a5298']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.header}>MBA Admission</Text>
          <Text style={styles.subHeader}>University of Jammu</Text>
        </View>
      </LinearGradient>

      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <TouchableOpacity
            style={[
              styles.sectionHeader,
              activeIndex === index && styles.activeSectionHeader
            ]}
            onPress={() => toggleSection(index)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: getRandomColor() }]}>
              <MaterialIcons name={section.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <MaterialIcons 
              name={activeIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#555" 
            />
          </TouchableOpacity>
          
          <Collapsible collapsed={activeIndex !== index}>
            <View style={styles.contentContainer}>
              <Image 
                source={{ uri: section.image }} 
                style={styles.contentImage}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            </View>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}

// Helper function for random colors
const getRandomColor = () => {
  const colors = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
    '#9b59b6', '#1abc9c', '#d35400', '#34495e'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  activeSectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  contentContainer: {
    padding: 0,
  },
  contentImage: {
    width: '100%',
    height: 150,
    opacity: 0.9,
  },
  textContainer: {
    padding: 20,
  },
  sectionContent: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
  },
});