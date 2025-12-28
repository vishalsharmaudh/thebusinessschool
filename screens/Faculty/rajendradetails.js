import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/rajendra.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Prof. Rajendra Mishra</Text>
          <Text style={styles.designation}>
            Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>250-A, Shastri Nagar,
</Text>
        <Text> Jammu -180004

</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('rajendramishra@jammuuniversity.ac.in ')}>
          rajendramishra@jammuuniversity.ac.in   
        </Text>
        <Text>Mobile:9419188402</Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

         {/* Published Books */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PUBLISHED BOOKS</Text>
        
        <Text style={styles.item}>1. Organizational Behaviour (2008)</Text>
        <Text style={styles.subItem}>   Publisher: Matrix Educare Pvt. Ltd.</Text>
        
        <Text style={styles.item}>2. Brajmandal: The Pilgrimage Destination (2001)</Text>
        <Text style={styles.subItem}>   Publisher: Tirtha Publications, New Delhi</Text>
      </View>
    {/* Chapters in Books */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CHAPTERS IN BOOKS</Text>
        
        <Text style={styles.item}>1. Human Resource and Outstanding Performers</Text>
        <Text style={styles.subItem}>   In: Human Resource Development Practices In Travel and Tourism Sectors</Text>
        <Text style={styles.subItem}>   Publisher: Centre for Mountain Tourism & Hospitality Studies (2007)</Text>
        
        <Text style={styles.item}>2. Tourism policy for Jammu region of J&K</Text>
        <Text style={styles.subItem}>   In: Strategic Service Marketing</Text>
        <Text style={styles.subItem}>   Publisher: Wisdom Publication, Delhi (2008)</Text>
        
        <Text style={styles.item}>3. Vaishno Devi Pilgrimage: Social and Economic Perspective</Text>
        <Text style={styles.subItem}>   In: Travel and Tourism Management</Text>
        <Text style={styles.subItem}>   Publisher: Abhishek Publications, Chandigarh (2008)</Text>
      </View>

    {/* Research Publications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESEARCH PUBLICATIONS (SELECTED)</Text>
        
        <Text style={styles.item}>1. Female Consumers' Demographic Analysis in Online Shopping (2018)</Text>
        <Text style={styles.item}>2. Cross Cultural Challenges While Doing Business in India (2012)</Text>
        <Text style={styles.item}>3. Human Resource Planning Practices - Lupin Pharmaceuticals (2016)</Text>
        <Text style={styles.item}>4. Role of Food Processing Industry in Food Security (2023)</Text>
        <Text style={styles.item}>5. Making Indian Healthcare a Global Medical Destination (2012)</Text>
      </View>
    
     
      {/* PhD Supervision */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PhD SUPERVISION</Text>
        
        <Text style={styles.subTitle}>Current Scholars:</Text>
        <Text style={styles.item}>1. Sanjeev Kumar</Text>
        <Text style={styles.subItem}>   Topic: Socio Economic Impact of Tourism</Text>
        
        <Text style={styles.item}>2. Mohmmad Rafiq Dar</Text>
        <Text style={styles.subItem}>   Topic: Impact of Service Quality on Pilgrimage Tourism</Text>
        
        <Text style={styles.subTitle}>Awarded PhDs:</Text>
        <Text style={styles.item}>1. Pilgrimage Tourism in Vaishno Devi (2008)</Text>
        <Text style={styles.item}>2. Pilgrimage Tourism in J&K (2007)</Text>
        <Text style={styles.item}>3. Human Resource Planning in Pharma Companies</Text>
      </View>

      {/* Positions Held */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>POSITIONS HELD</Text>
        
        <Text style={styles.item}>• Professor/Chief Faculty, JKEDI Srinagar (2010-11)</Text>
        <Text style={styles.item}>• Coordinator, PGDBM Programme, University of Jammu (2012)</Text>
        <Text style={styles.item}>• Member, Board of Studies in Business Management</Text>
        <Text style={styles.item}>• Convener, BBA Programme Revision Committee</Text>
        <Text style={styles.item}>• Founder Member, All India Tourism Teachers Association</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe7',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  designation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  department: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  contactSection: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  icons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  section: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default FacultyProfile;