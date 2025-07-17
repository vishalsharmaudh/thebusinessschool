import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const publications = {
  "Books (Edited)": [
    "Aima, Ashok, Chauhan,V. & Bhasin, Jaya. (2011) 'Emerging Trends in Tourism : Issues and Perspective', Excell Publications.",
    "Aima, Ashok, Chauhan,V. & Bhasin, Jaya (2014), 'Contemporary Trends in Tourism and Hospitality Management', Primus Book New Delhi",
    "Sharma, Keshav, Chauhan, V., Komal, Nagar & Rachana (2016), 'Marketing of Tourism and Allied Services', Kaniska Publications, New Delhi",
    "Chauhan V & Mohinder Chand (2019), Handbook of Research on International Travel Agency and Tour Operation Management, IGI Global Publishing, USA."
  ],
  "Refereed Research Publications": [
    "Bhagat, R & Chauhan V, (2024), Exploring Factors influencing purchasing Behavior of Consumers: An empirical study of green purchasing behavior, World Review of Entrepreneurship, Management and sustainable Development(Scopus Indexed), 2(2)",
    // ... (rest of your publications data)
  ],
  "Research Papers in Edited Books/Conference Proceedings": [
    "Chauhan, V. & Bhagat, R.,(2017), Ecologically Conscious Green Consumption: A Theotical Framework, (edt. Bhardwaj Sunil & Bhagat Rohit), 'Entrepreneurship Skill Development and Rural Livelihood', Bharti Publication New Delhi.",
    // ... (rest of your publications data)
  ]
};

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/vinay.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Vinay Chauhan</Text>
          <Text style={styles.designation}>
           Professor and Director
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>University of Jammu</Text>
        <Text>Jammu, J&K 180006</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:vinaychauhan@jammuuniversity.ac.in')}>
          vinaychauhan@jammuuniversity.ac.in
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
        <Text>• Ph.D. in Faculty of Commerce and Management, Kurukshetra University in the year 2002</Text>
        <Text>• SCHE (Swiss Certificate in Hospitality Education) from SHMS University Centre, Leysin, Swiss Education Group, Switzerland, in the year 2006</Text>
        <Text>• National Eligibility Test(NET) UGC, New Delhi in the year 2000</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text style={[styles.title, { marginTop: 10 }]}> A. RESEARCH PUBLICATIONS : 64</Text>
        <Text>• Books (Edited) : 04</Text>
        <Text>• Refereed Research Publications : 45</Text>
        <Text>• RESEARCH PAPERS IN EDITED BOOKS/ CONFERENCE PROCEEDINGS - 15</Text>

        <Text style={[styles.title, { marginTop: 10 }]}>B. RESEARCH PROJECTS  : 05(UGC 03, ICSSR 02)</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>C. RESEARCH GUIDANCE : Ph.D - Awarded : 11;  Ongoing : 05</Text>
      </View>

      {/* Academic Information */}
      <View style={styles.section}>
        <Text style={styles.title}> Academic Information</Text>
        <Text style={styles.sectionTitle}>Area of Specialization</Text>
        <Text style={styles.paragraph}>
          Marketing, Consumer Behavior, Entrepreneurship, Tourism & Hospitality Services
        </Text>

        {/* Teaching and Academic Assignments */}
        <Text style={styles.sectionTitle}>Teaching and Academic Assignments</Text>
        <Text style={styles.subheading}>A. Teaching and Research Experience: 22 Years (Post Graduate level) since 25-02-2002 in the University of Jammu:</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>• Professor, The Business School, University of Jammu (Since 09-06-2014)</Text>
          <Text style={styles.bullet}>• Associate Professor, The Business School (09-06-2011 to 09-06-2014)</Text>
          <Text style={styles.bullet}>• Reader, The Business School (09-06-2008 to 09-06-2011)</Text>
          <Text style={styles.bullet}>• Lecturer, Dept. of Management Studies (25-02-2002 to 09-06-2008)</Text>
        </View>

        {/* Other Academic Recognitions */}
        <Text style={styles.sectionTitle}>Other Academic Recognitions</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>• NAAC Peer Team Member</Text>
          <Text style={styles.bullet}>• UGC Nominee, SAP Advisory Committee, Dept. of Commerce, Dibrugarh University, Assam</Text>
          <Text style={styles.bullet}>• Deputy Coordinator, UGC SAP DRS-II, The Business School, University of Jammu</Text>
          <Text style={styles.bullet}>• Editor, "Researcher: A Multidisciplinary Journal", University of Jammu</Text>
          <Text style={styles.bullet}>• Convener, Publication Cell, University of Jammu</Text>
          <Text style={styles.bullet}>• Member, Editorial Board, International Journal of Tourism and Hospitality Systems</Text>
          <Text style={styles.bullet}>• Member, BoS, Dept. of HR&OB, School of Management, Central University of Himachal Pradesh</Text>
          <Text style={styles.bullet}>• Member, BoS, Dept. of Travel and Tourism, Central University of Jammu</Text>
          <Text style={styles.bullet}>• Member, BoS (Management), Cluster University of Jammu</Text>
        </View>
      </View>

      {/* OTHER INFORMATION*/}
      <View style={styles.section}>
        <Text style={styles.title}>OTHER INFORMATION</Text>
        <Text style={[styles.title, { marginTop: 10 }]}> Administrative Experience :</Text>
        <Text>• Director,  The Business School, University of Jammu, J&K, w.e.f. Feburary10, 2023 onwards.</Text>
        <Text>•Dean Student Placement, University of Jammu w.e.f. September 30, 2019 to June 12, 2023.</Text>
        <Text>•  OSD to Vice-chancellor on NEP-2020, University of Jammu w.e.f August 17, 2020 to  June 01, 2021</Text>
        <Text>•  Dean , Planning & Development,  (on Deputation), Himachal Pradesh Technical University, Hamirpur, HP, w.e.f. August 14, 2018 to August 13, 2019</Text>
        
        <Text style={[styles.title, { marginTop: 10 }]}>INTERNATIONAL ACADEMIC VISITS</Text>
        <Text>• Switzerland for Attending Two Week Skill Development Workshop for Hospitality Teachers from June, 17 to July 01, 2006.</Text>
        <Text>• Visited Italy for paper presentation in the EURAC Conference on Facing Climate Change and the Global Economic Crises : Challenges for the Future of Tourism held on November 20-21, 2009.</Text>
        <Text>• Visited Sri Lanka for paper presentation in the Third International Conference on "Regional Tourism – Trends, Changes and Challenges in South Asia, June 23-26, 2011.</Text>
      </View>
       
      {/* Publications */}
      <View style={styles.section}>
        <Text style={styles.title}>Publications</Text>
        {Object.entries(publications).map(([category, items], index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.subtitle}>{category}</Text>
            {items.map((item, subIndex) => (
              <Text key={subIndex} style={styles.publicationItem}>• {item}</Text>
            ))}
          </View>
        ))}
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
    color: '#333',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
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
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
  },
  bulletContainer: {
    marginLeft: 10,
  },
  bullet: {
    marginBottom: 5,
  },
  publicationItem: {
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default FacultyProfile;