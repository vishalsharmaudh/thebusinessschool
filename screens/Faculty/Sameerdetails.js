import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/sameer.jpeg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Prof. Sameer Gupta</Text>
          <Text style={styles.designation}>
           Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>T375-Shastri Nagar, Jammu</Text>
        <Text>(Jammu & Kashmir)- 180004 </Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:sameergupta@jammuuniversity.ac.in')}>
          sameergupta@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9419128182</Text>

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
        <Text>•MBA –Department of Management Studies, University of Jammu(1988)</Text>
        <Text>• PhD “Institutional Financing of Small Scale Industries in Jammu Division” (2006)</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>Degree Awarded - 4</Text>
        <Text>• Preferences of Retail Investors towards Mutual Fund Schemes</Text>
        <Text>• Marketing Strategies and Customer Satisfaction in Life Insurance Sector: A Case Study of LIC and ICICI Prudential Life Insurance</Text>
        <Text>•  Price Discovery Behavior Of Select Spot And Future Commodities In MCX and NCDEX </Text>

        <Text>• Demand Constraints Of Crop Insurance Among Small And Marginal Farmers In Jammu & Kashmir</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>Ongoing PhD - 4</Text>

        <Text>•  Financial Inclusion and Digital Financial Services: An Impact Assessment </Text>
        <Text>•Price volatility and volatility transmission; an empirical investigation using seasonality and structural breaks in Indian Agriculture Commodity Markets.</Text>
        <Text>• Impact of Personal Financial Management Behavior on Financial Well-Being</Text>

        <Text>•Equity Investment Decision by Individual Investors in Cash Segment of Stock Market</Text>
      
      </View>

      {/* Academic Information */}
      <View style={styles.section}>
        <Text style={styles.title}> Academic Information</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>Interest Areas include:-</Text>
        <Text>• Banking & Insurance</Text>
        <Text>• Stock market particularly Derivatives Market</Text>
        <Text>• Financial Inclusion and </Text>
        <Text>• MSME sector</Text>
      </View>





      {/* OTHER INFORMATION*/}
       {/* ICSSR Project */}

       <Text style={styles.title}> OTHER INFORMATION</Text>
      <Text style={[styles.title, { marginTop: 10 }]}>ICSSR Major Research Project (Ongoing)</Text>
      <Text style={styles.paragraph}>
        "Empowering Producers and Entrepreneurs through Sustainable Business Models for Local Products - Agro Based and Essential Oils" under ICSSR Research Projects 2023-24.
      </Text>
      <Text style={styles.highlight}>Grant-in-Aid: Rs. 15,00,000/- (Rupees Fifteen Lacs only)</Text>

      {/* Action Research / Consultancy */}
      <Text style={[styles.title, { marginTop: 10 }]}>Action Research / Consultancy</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Department of Justice (DoJ)</Text>, Ministry of Law and Justice, Government of India, New Delhi (Report Published)
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Title:</Text> “Action Research and Studies on Judicial Reforms for Udhampur District of Jammu & Kashmir State”
      </Text>
      <Text style={styles.highlight}>Capacity: Consultant; Project Cost: Rs. 19,64,000/-</Text>

      {/* Curriculum Design */}
      <Text style={[styles.title, { marginTop: 10 }]}>Curriculum Design and Revision</Text>
      <Text style={styles.subheading}>National Level:</Text>
      <Text style={styles.paragraph}>
        Design of Curriculum for MBA Rural Management at IRMA (2018) under the aegis of Mahatma Gandhi National Council of Rural Education (earlier NCRI), Ministry of HRD, Government of India.
      </Text>

      <Text style={styles.subheading}>University Level:</Text>
      <Text style={styles.paragraph}>
        Designed and revised curriculum as Convener, Board of Studies (BoS), Faculty of Business Studies, University of Jammu (2020–2023) and earlier as member BoS:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>• Executive MBA (under NEP)</Text>
        <Text style={styles.bullet}>• BBA (under NEP)</Text>
        <Text style={styles.bullet}>• MBA (General) – Revised periodically</Text>
      </View>

      {/* Session Chair */}
      <Text style={[styles.title, { marginTop: 10 }]}>Session Chair in Conferences</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>• International Conference on Sustainable Management (ICSM 2018), IIM Kashipur, May 25–27, 2018</Text>
        <Text style={styles.bullet}>• International Conference on Dynamics of Financial Sector Reforms, Mittal School of Business, LPU Punjab, April 6–7, 2018</Text>
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
  "Modeling Conditional Volatility and Causality Linkages between Spot and Future Markets of Crude Oil using VECM and GARCH (1,1) Method, Empirical Economic Letters ISSN 1681-8997, Vol. 21(9), September 2022.",
  
  "An Analytical Study of Performance of Indian Commodity Markets, Journal of Maharaja Sayajirao University of Baroda ISSN 0025-0422, Vol. 21, 2021.",
  
  "Pradhan Mantri Fasal Bhima Yojna and Farm Risk Management, International Journal of Research and Analytical Reviews E-ISSN 2348-1269, P-ISSN 2349-5138, Vol. 6 Issue 1, March 2019.",
  
  "Agro-Tourism and Sustainability for Small and Marginal Farmers in Jammu & Kashmir, International Journal of Research and Analytical Reviews E-ISSN 2348-1269, P-ISSN 2349-5138, Vol. 6 Issue 1, February 2019.",
  
  "Price Discovery in Indian Spot and Future Markets of Gold and Silver, Research Review International Journal of Multidisciplinary ISSN Online: 2455-3085, Vol. 3 Issue 8, August 2018.",
  
  "Relationship between Gross Domestic Product and Derivative Market of India, Journal of Management (JOM) ISSN Print: 2347-3940, ISSN Online: 2347-3959, Vol. 5 Issue 3, May-June 2018."
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