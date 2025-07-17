import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/saloni.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Dr.Saloni Devi</Text>
          <Text style={styles.designation}>
           Assistant Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>University of Jammu, Baba Saheb Ambedkar Road,New University Campus, J&K(UT), 

</Text>
        <Text>Jammu-180006
</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('salonidevi@jammuuniversity.ac.in ')}>
          salonidevi@jammuuniversity.ac.in 
        </Text>
        <Text>Mobile: 9018977766</Text>

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
  
  <Text>• Ph.D: University of Jammu (2020)</Text>
  
  <Text>• MBA: University of Jammu (2008)</Text>
  
  <Text>• Graduation: University of Jammu (2005)</Text>
  
  <Text>• Higher Secondary: JKBOSE (2002)</Text>
  
  <Text>• Matriculation: CBSE (2000)</Text>
</View>

     {/* Research Experience */}
<View style={styles.section}>
  <Text style={styles.title}>Research</Text>
  
  <Text>• More than 13 years of research experience</Text>
  
  <Text>• Specialization in Human Resource Management & Organizational Behavior (HRM & OB)</Text>
  
  <Text>• Published multiple research papers in reputed/indexed journals</Text>
  
  <Text>• Attended various conferences organized by esteemed institutions</Text>
  
  <Text>• Editorial Board Member of 'B' category journal</Text>
  
  <Text>• Project Director of ICSSR-funded collaborative research project (2023)</Text>
</View>

      {/* Academic Interest */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interest</Text>

  <Text style={[styles.subtitle, {marginTop: 10}]}>Teaching Experience</Text>
  
  <Text>• Total Experience: 13 years 10 months</Text>
  
  <Text style={[styles.subtitle, {marginTop: 10}]}>Courses Taught:</Text>
  
  <View style={styles.courseList}>
    <Text>1. Human Resource Management</Text>
    <Text>2. Organizational Behaviour</Text>
    <Text>3. General Management</Text>
    <Text>4. Legal Aspects of Business</Text>
    <Text>5. Research and Publication Ethics</Text>
    <Text>6. Performance and Compensation Management</Text>
    <Text>7. Industrial Relations and Labour Laws</Text>
    <Text>8. Business Research Methods</Text>
  </View>
</View>
     {/* Publications */}
<View style={styles.section}>
  <Text style={styles.title}>Publications</Text>
 
  <Text>• Research paper published in Journals : 14</Text>
  
  <Text>• Research papers published as Book Chapters: 07</Text>
  
 </View>

 {/* other information*/}
<View style={styles.section}>
  <Text style={styles.title}>Other Information</Text>
 
  <Text>• Attended more than fifteen workshops and training programmes</Text>
  
  <Text>• Reviewer of various indexed journals</Text>
  
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