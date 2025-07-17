import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/komal.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Komal Nagar</Text>
          <Text style={styles.designation}>
            Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>House Number 335 Sector 1-A Trikuta Nagar,

</Text>
        <Text>Jammu (J&K) 180020 

</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('komalnagar@jammuuniversity.ac.in  ')}>
          komalnagar@jammuuniversity.ac.in    
        </Text>
        <Text>Mobile: 9419194664</Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

         {/* Professional Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        
        <Text style={styles.item}>• 2018-2021: Associate Professor</Text>
        <Text style={styles.subItem}>  The Business School, University of Jammu</Text>
        
        <Text style={styles.item}>• 2015-2018: Assistant Professor (Stage III)</Text>
        <Text style={styles.subItem}>  The Business School, University of Jammu</Text>
        
        <Text style={styles.item}>• 2010-2015: Assistant Professor (Stage II)</Text>
        <Text style={styles.subItem}>  The Business School, University of Jammu</Text>
        
        <Text style={styles.item}>• 2004-2010: Assistant Professor (Stage I)</Text>
        <Text style={styles.subItem}>  The Business School, University of Jammu</Text>
      </View>


    {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        
        <Text style={styles.item}>• Ph.D. in Management</Text>
        <Text style={styles.subItem}>  Thesis: "Impact of Advertising and Promotion on Brand Switching Behavior of Consumers"</Text>
        <Text style={styles.subItem}>  University of Jammu (2010)</Text>
        <Text style={styles.subItem}>  Supervisor: Prof. M.R. Rana</Text>
        
        <Text style={styles.item}>• M.B.A.</Text>
        <Text style={styles.subItem}>  University of Jammu (2002)</Text>
        <Text style={styles.subItem}>  Specialization: Marketing and Human Resource Management</Text>
        <Text style={styles.subItem}>  Second Position in University of Jammu</Text>
        
        <Text style={styles.item}>• B.Sc. (Electronics)</Text>
        <Text style={styles.subItem}>  University of Jammu (2000)</Text>
      </View>

     {/* Fellowships & Awards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FELLOWSHIPS & AWARDS</Text>
        
        <Text style={styles.item}>• University Grants Commission – Junior Research Fellowship in Management (UGC-JRF)</Text>
        <Text style={styles.subItem}>  First JRF-Management in Jammu (2003)</Text>
        
        <Text style={styles.item}>• Best Young Teacher Award - 2016</Text>
        <Text style={styles.subItem}>  GRABS Educational Charitable Trust, Chennai</Text>
        
        <Text style={styles.item}>• Best Reviewer Award</Text>
        <Text style={styles.subItem}>  NICE Journal of Business (December 2017)</Text>
        
        <Text style={styles.item}>• Doctoral student (Murtaza Hassan Itoo) received 'Best Doctoral Work Award'</Text>
        <Text style={styles.subItem}>  International Conference on 'Strategic Marketing Initiatives in Emerging Markets' (March 2019)</Text>
      </View>
    
      {/* Publications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PUBLICATIONS (SELECTED)</Text>
        
        <Text style={styles.subTitle}>Journal Articles:</Text>
        <Text style={styles.publication}>1. "Printing Effect of Celebrities on Consumer Response Towards Endorsed Brands..." Journal of Consumer Marketing, 2021</Text>
        <Text style={styles.publication}>2. "Application of the Extended Theory of Planned Behavior to Street Food Consumption..." British Food Journal, 2022</Text>
        <Text style={styles.publication}>3. "An examination of gym supplement choice..." Journal of Food Products Marketing, 2020</Text>
        
        <Text style={[styles.subTitle, {marginTop: 10}]}>Book Chapters:</Text>
        <Text style={styles.publication}>• "Influence of Film-Generated Tourism on Re-imaging Tourist Destination..." 2016</Text>
        <Text style={styles.publication}>• "Assessing Tourist's Mall Shopping versus Street Shopping Behavior..." 2016</Text>
        
        <Text style={[styles.subTitle, {marginTop: 10}]}>Books:</Text>
        <Text style={styles.publication}>1. Marketing of Tourism and Allied Services (2016)</Text>
        <Text style={styles.publication}>2. Advertising and Sales Promotion (2012)</Text>
        <Text style={styles.publication}>3. E-Commerce Issues, Perspectives and Challenges (2010)</Text>
      </View>

 {/* Research Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESEARCH PROJECTS</Text>
        
        <Text style={styles.item}>• "Investigating the Relationship among University Students' Social Media Multitasking..."</Text>
        <Text style={styles.subItem}>  ICSSR-IMPRESS Scheme (2019)</Text>
        <Text style={styles.subItem}>  Grant: ₹8,50,000 for 24 months</Text>
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