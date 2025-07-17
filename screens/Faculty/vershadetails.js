import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/versha.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Dr. Versha Mehta</Text>
          <Text style={styles.designation}>Professor</Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>The Business School, University of Jammu (New Campus)</Text>
        <Text>Jammu 180006, Jammu & Kashmir</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('mailto:versha.mehta@jammuuniversity.ac.in')}
        >
          versha.mehta@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: </Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.title}>Education</Text>
        <Text>• MCA, Ph.D (Management)</Text>
        <Text>• Post Doc (Commonwealth Fellow, University of Edinburgh, UK)</Text>
        <Text>• LEAP (University of Pennsylvania, USA)</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text>• E-Commerce</Text>
        <Text>• Technology for social and business utility in contemporary organisations</Text>
        <Text>• E-Business, Supply Chain Management for added value</Text>
        <Text>• Digital Organisations and Business Strategy</Text>
        <Text>• Knowledge Management and Business/Technology Imperatives</Text>
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