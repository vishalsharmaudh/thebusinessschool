import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/alka.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Alka Sharma</Text>
          <Text style={styles.designation}>
            Professor & Dean Faculty of Business Studies and Director, SIIEDC
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>The Business School, University of Jammu (New Campus)</Text>
        <Text>Jammu 180006, Jammu & Kashmir</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:alkasharma@jammuuniversity.ac.in')}>
          alkasharma@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9419140828</Text>

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
        <Text>• Ph.D. in Marketing, University of Jammu (2001)</Text>
        <Text>• MBA in Marketing & Finance, University of Jammu (1990) – 1st Class</Text>
        <Text>• B.Sc. (Chemistry, Botany, Zoology), University of Jammu (1987) – 1st Class</Text>
        <Text>• 12th (PCB), J&K Board – 1st Class</Text>
        <Text>• 10th, CBSE – 1st Class</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text>• 22 years approx. (Ph.D. awarded in Dec. 2001)</Text>
        <Text>• 16 Ph.D. scholars awarded</Text>
        <Text>• 6 scholars currently pursuing doctoral research</Text>

        <Text style={[styles.title, { marginTop: 10 }]}>Research Projects and Consultancies</Text>
        <Text>• ICSSR project: SERVQUAL Governance Reforms, J&K – ₹12 Lac (Ends March 2024)</Text>
        <Text>• UGC: Store Atmospherics in Retail (2015–2018), ₹10.38 Lac</Text>
        <Text>• UGC: Online Buying & B2C E-Commerce (2006–2009), ₹5.62 Lac</Text>
        <Text>• J&K Tourism: Status of Tourism in Patnitop and Sanasar</Text>
        <Text>• JDA: Commercialization in Trikuta Nagar, Jammu</Text>
      </View>

      {/* Publications */}
      <View style={styles.section}>
        <Text style={styles.title}>Publications</Text>
        {publications.map((item, index) => (
          <Text key={index} style={styles.publicationItem}>• {item}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const publications = [
  `Sharma Alka (2024) "Unraveling the Viral Phenomenon..." in Global Knowledge, Memory and Communication (ABDC B)`,
  `Sharma Alka (2024) "Social Media Marketing Activities..." in Journal of Marketing Communication (ABDC B)`,
  `Sharma Alka (2024) "Examining the Efficiency of Governance Reforms..." in IPE Journal of Management`,
  `Sharma Alka (2024) "Transformative Entrepreneurship in Subsistent Environment..." in Journal of Management and Entrepreneurship`,
  `Sharma Alka (2022) "Exploring Antecedents of eWOM in Tourism..." in Edward Elgar Publishing UK`,
  `Sharma Alka (2022) "Instore Technology for Store Loyalty" in NMIMS Management Review`,
  `Sharma Alka (2021) "Atmospheric Cues in Online Retailing" in Int. Journal of Electronic Marketing and Retailing`,
  `Sharma Alka (2021) "Facebook Fanpage & Purchase Intentions" in Int. Journal of Online Marketing`,
  `Sharma Alka (2018) "Cause Related Marketing and Customer Value" in MANTHAN Journal of Commerce and Management`,
  `Sharma Alka (2017) “E-Wallet Brand Trust via Facebook” in Pan IIM World Conference Proceedings`,
  `Sharma Alka (2016) “Impulse Buying in Organized Retail” in Cambridge Scholars UK`,
  `Sharma Alka (2016) "Brand Resonance in Smartphones" in Int. Journal of Customer Relations`,
  `Sharma Alka (2016) "Experiential Value in Wellness Tourism" in Marketing of Tourism and Allied Services Book`,
  `Sharma Alka (2015) “Hypermarkets: Growth and Challenges” in Asia Pacific Journal of Marketing`,
  `Sharma Alka (2015) "Perceived Value in CBR-CCB" in Int. Journal of Applied Business and Economic Research`,
  `Sharma Alka (2015) "Cause Related Marketing Analysis" in MERC Global Int. Journal of Management`,
  `Sharma Alka (2015) "Loyalty Programs & Purchase Intentions" in PRiMa Journal`,
  `Sharma Alka (2015) "Self Brand Connection in Adolescents" in MERC Global Journal`,
  `Sharma Alka (2015) “Promotion Impact on Destination Reputation” in Hospitality and Tourism Systems`,
  `Sharma Alka (2015) "SBC and Brand Involvement" in Excel Books Intl. Conference Proceedings`,
  `Sharma Alka (2015) "Experiential Value & Loyalty in Smartphones" in Excel Books Intl. Conference Proceedings`
];

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
  publicationItem: {
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default FacultyProfile;