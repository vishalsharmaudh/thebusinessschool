import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/farah.png')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Farah Choudhary</Text>
          <Text style={styles.designation}>
            Sr. Assistant Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>House No. 1, Gujjar colony, Near K B Public School, Channi By-pass, 

</Text>
        <Text>Jammu-180015
</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('farah.choudhary@jammuuniversity.ac.in  ')}>
          farah.choudhary@jammuuniversity.ac.in  
        </Text>
        <Text>Mobile: 9419228111</Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

    {/* Education  */}
<View style={styles.section}>
  <Text style={styles.title}>Education</Text>
<Text style={[styles.degree, {marginTop: 10}]}>Ph.D. in Management</Text>
 
  <Text>• Thesis: "Online Visual Merchandising for Affective Consumer Response Behaviour"</Text>
  <Text>• University of Jammu (2018)</Text>
  <Text>• Supervisor: Prof. Alka Sharma</Text>

  <Text style={[styles.degree, {marginTop: 10}]}>Master's in Business Administration (M.B.A.)</Text>
  <Text>• University of Jammu (2010)</Text>
  <Text>• Specialization: Marketing and Finance</Text>

  <Text style={[styles.degree, {marginTop: 10}]}>Bachelor of Commerce (B.Com.)</Text>
  <Text>• University of Jammu (2008)</Text>
</View>

    {/* Research */}
<View style={styles.section}>
  <Text style={styles.title}>Research</Text>
  
  <Text style={[styles.student, {marginTop: 10}]}>• Arjun Hans</Text>
  <Text>  Topic: "Impact of Behavioural Factors on Investment Decisions and Performance in Indian Equity Market"</Text>
  <Text>  Registered: May 1, 2018 (Ongoing)</Text>
  
  <Text style={[styles.student, {marginTop: 10}]}>• Najma Khatoon</Text>
  <Text>  Topic: "Social Media Functionality for Green Destination Image and Loyalty"</Text>
  <Text>  Registered: September 1, 2020 (Ongoing)</Text>
  
  <Text style={[styles.student, {marginTop: 10}]}>• Kanika Juneja</Text>
  <Text>  Topic: "Strategizing e-WOM for Purchase Intentions: A Case of e-Tailing"</Text>
  <Text>  Registered: September 1, 2020 (Ongoing)</Text>
</View>
      {/* Academic Interest */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interest</Text>
  
  <Text>• TOTAL TEACHING EXPERIENCE: 11 Years & 01 Months</Text>
  <Text>•  Courses Taught:  Production & Operation Management, Management Perspectives, Quantitative Methods, Investment Analysis, Project Management, IT Application in Management, Financial Management.  </Text>
  
</View>
     {/* Publications */}

<View style={styles.section}>
  <Text style={styles.sectionTitle}> PUBLICATIONS</Text>

  <Text style={[styles.student, {marginTop: 10}]}>Journal Articles:</Text>
  
  <Text>1. Choudhary, F.S. BSNL: Is There A Way Forward Or Is It Time To Hang-Up? Asian Journal of Management Cases (Accepted)</Text>
  
  <Text>2. Choudhary, F.S. (2022). In-Store Atmospherics: A Contextual Background Influencing Patronage Intentions. South Asian Journal of Management, 29(4), 81-107</Text>
  
  <Text>3. Choudhary, F.S. (2022). Does visual merchandising affect response behaviour? Role of atmospheric cues in online retailing. International Journal of Electronic Marketing and Retailing, 13(4), 466-489</Text>
  
  <Text>4. Choudhary, F.S. (2019). Mediating Role of Analysis of Affective State for Generating Consumer Response Towards Visual Merchandising in Online Context. Researcher- A Multidisciplinary Journal, 14(2), 134-150</Text>
  
  <Text >5. Choudhary, F.S. (2019). Impact of FDI on GDP: A comparative study of India and China. Manthan Journal of Commerce and Management, Special Issue, 6, 87-99</Text>
  
  <Text >6. Choudhary, F.S. (2017). Multi-Dimensional Framework of Online Visual Merchandising- A content analysis of Amazon and Flipkart. Journal of Advance Management Research, 5(3)</Text>
  
  <Text>7. Choudhary, F.S. (2017). Demographics Difference Towards Online Atmospherics: A Case of Apparel Websites. International Research Journal of Management and Commerce, 4(8)</Text>
  
  <Text>8. Choudhary, F.S. (2017). Connecting Online Visual Merchandising and Consumer Response Behaviour. International Education and Research Journal, 3(5)</Text>
  
  <Text >9. Choudhary, F.S. (2016). An overview of online environment of apparel web stores. International Journal of Science, Technology & Management, 5(S1), 472-483</Text>

  <Text style={[styles.subTitle, {marginTop: 15}]}>Book Chapters:</Text>
  
  <Text>• Choudhary, F.S. (2022, February). Exploring antecedents of electronic word-of-mouth in tourism: A case of Trip Advisor. In Handbook on Tourism and Social Media. Edward Elgar Publishing, UK. ISBN: 9781800371408</Text>
  
  <Text>• Choudhary, F.S. (2021, January). Novel Method for detecting DDoS Attacks to make robust IoT systems. In Security and Privacy in the Internet of Things. CRC Press. pp. 81-94. ISBN: 978-0-367-85994-7</Text>
  
  <Text>• Choudhary, F.S. (2019, May). Content Analysis of Online Visual Merchandising for Indian Online Travel Agents- A Case of Makemytrip & Yatra. In International Travel Agency and Tour Operation Management. IGI Global. pp. 216-237. ISBN: 9781522584346</Text>
</View>
 {/* other information*/}

<View style={styles.section}>
<Text style={styles.sectionTitle}> Other Information</Text>
  <Text style={[styles.sectionTitle, {marginTop: 10}]}>DEVELOPMENT OF E-LEARNING MATERIAL</Text>
  
  <Text>• Developed content for ePathshala MHRD project 2017:</Text>
  <Text>• Module: Strategic Management: Functional Implementation</Text>
  <Text>• Module: Strategic Management: Structural Implementation</Text>

  <Text style={[styles.sectionTitle, {marginTop: 15}]}>REVIEW EXPERIENCE</Text>
  
  <Text>• Journal of Fashion Marketing and Management (Emerald)</Text>
  <Text>• South Asian Journal of Management</Text>
  <Text>• Manthan Journal of Commerce and Management</Text>
  <Text>• Researcher - A Multidisciplinary Journal</Text>
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