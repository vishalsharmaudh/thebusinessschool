import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/neelu.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Dr. Neelu Rohmetra</Text>
          <Text style={styles.designation}>
           Professor & Dean Research Studies
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>The Business School, University of Jammu,</Text>
        <Text>Jammu- 180006, J&K, India</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:neelurohmetra@jammuuniversity.ac.in')}>
          neelurohmetra@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9469213474</Text>

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
        <Text>• M.Com; Ph.D (Management Studies)</Text>
        <Text>• Post Doc. Commonwealth Fellow, (UK)</Text>
        <Text>• IVLP (USA); Fulbright Fellow, (USA)</Text>
        <Text>• ITP-LBS (UK)</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>Gold medals & Scholarships</Text>
        <Text>• University of Jammu Dr S. Radhakrishnan Best Graduate Award, 1985 (Gold Medal*)</Text>
        <Text>• University of Jammu J&K Bank Best Commerce Graduate Award, 1985. (Gold Medal*)</Text>
        <Text>• University of Jammu Gold Medal* for ranking Ist Class Ist in B. Com. Merit list, 1985.</Text>
        <Text>•  J&K Board of School Education Gold Medal for ranking Ist Class Ist in Hr. Sec. Part II Commerce merit list, 1983.</Text>
        <Text>•  J&K Board of School Education Gold Medal in Hr. Sec. Part I for ranking Ist in the Commerce merit list, 1982.</Text>
        <Text>• National Merit Scholarship for P.G. Studies 1985-87</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text>• Current Position: Dean Research Studies, University of Jammu, Jammu</Text>
        <Text>• Supervising doctoral research (Ph.D) </Text>
        <Text>• Specialisation: (Management Studies) - Human Resource Management/Development, Organisation Behaviour, Cross-Cultural Management</Text>
      </View>

      {/* Academic Interest */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interest</Text>
        <Text>• Work Experience: Over 35 years teaching and research at Post Graduate level / CFTI-IIM/ University level</Text>
        <Text>• Interest Areas: Leadership, Cross Cultural Studies, Gender studies, human Resource Development, Behavioural studies, Community outreach & research</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>
          Academic Administration (Positions held):
        </Text>

        <Text>• Dean Research Studies, University of Jammu, Jammu, J&K, India (Presently)</Text>
        <Text>• Former (Founding) Director, Indian Institute of Management Sirmaur (IIM Sirmaur), H.P., India (5 years term)</Text>
        <Text>• Former Director, Directorate of Distance and Online Education, University of Jammu, Jammu, J&K, India</Text>
        <Text>• Former Rector Kathua Campus, University of Jammu, Jammu, J&K, India</Text>
        <Text>• Former Director Billawar Campus, University of Jammu, Jammu, J&K, India</Text>
        <Text>• Former Director, The Business School, University of Jammu, Jammu, J&K, India</Text>
        <Text>• Former (Founding) Director, International Centre for Cross Cultural Research and Human Resource Management (ICccR & HRM), University of Jammu, Jammu, J&K, India</Text>
        <Text>• Former Dean Students Placement, University of Jammu, Jammu, J&K, India</Text>
      </View>

     <View style={styles.section}>
  <Text style={styles.title}>OTHER INFORMATION</Text>
  <Text style={[styles.title, { marginTop: 10 }]}>Awards (Select):</Text>
  <Text>• "First Ladies Award" Grantee of Union Ministry of Women and Child Development, Govt. of India, for being the '1st Woman to head an IIM' in the Country (2018)</Text>
  <Text>• (Founding Director IIM Sirmaur, Himachal Pradesh, India, under aegis of Union Ministry of Education, GoI- Premier Institution of national importance; 5 years term: March 09, 2017- March 09, 2022)</Text>
  <Text style={[styles.title, { marginTop: 10 }]}>Fellowships (Select):</Text>
  <Text>• International Teachers Programme (ITP) at London Business School, UK (Part I & Part II) under aegis of ISBM-EFMD Global (2019-2021 Edition)</Text>
  <Text>• Fulbright-Nehru USIEF Education Administrators Seminar Grantee/Awardee at USA (Washington DC, Chicago, USA and Nebraska Lincoln and Omaha), 2013.</Text>
  <Text>• 'International Visitor leadership Programme (IVLP) of the U State Department, USA' for Jammu and Kashmir on "Educational Leadership" at USA (Washington D.C, California, Chicago, Philadelphia, New York), 2006.</Text>
  <Text>• Post-Doctoral Commonwealth Fellowship, tenable at Department of Management Learning, Lancaster University, UK. (Thrust Area: HRD, T&D), 2001-02.</Text>
  <Text>• Visiting Faculty/ Fellow, EAP- Centre for Cross - Cultural Management Research, OXFORD, UK, 1998</Text>
  
  <Text style={[styles.title, { marginTop: 10 }]}>References:</Text>
  <Text style={styles.link} onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Neelu_Rohmetra')}>
    • Neelu Rohmetra - Wikipedia
  </Text>
  <Text style={styles.link} onPress={() => Linking.openURL('https://economictimes.indiatimes.com/news/politics-and-nation/meet-neelu-rohmetra-the-first-woman-at-the-helm-of-an-iim/articleshow/63219681.cms')}>
    • Meet Neelu Rohmetra, the first woman at the helm of an IIM - The Economic Times
  </Text>
  <Text style={styles.link} onPress={() => Linking.openURL('https://www.dailyexcelsior.com/prof-neelu-rohmetra-appointed-director-iim-sirmaur/')}>
    • Prof Neelu Rohmetra appointed Director IIM Sirmaur - Daily Excelsior
  </Text>
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