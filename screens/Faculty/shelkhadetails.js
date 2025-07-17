import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/shelleka.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Dr. Shelleka Gupta</Text>
          <Text style={styles.designation}>
           Sr. Assistant Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>H.No 249 mast Garh Jammu, 

</Text>
        <Text>J&K 180001
</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('shellekagupta@jammuuniversity.ac.in')}>
          shellekagupta@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 8803010608</Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

    {/* Education Qualifications */}
<View style={styles.section}>
  <Text style={styles.title}>Education Qualifications</Text>
  
  <Text>• PhD in Management from The Business School, University of Jammu, 2015</Text>
  
  <Text>• Master of Business Administration (MBA), Specialization in Marketing, from The Business School, University of Jammu, 2002</Text>
  
  <Text>• Bachelor of Commerce (B.Com.), University of Jammu, 2000</Text>
  
  <Text>• Senior Secondary (XII Class), CBSE Board, 1997</Text>
  
  <Text>• Higher Secondary (X Class), CBSE Board, 1995</Text>
  
  <Text style={{marginTop: 10}}>• UGC-NET Examination for Lectureship in Management, June 2004</Text>
  
  <Text>• UGC-NET JRF (Junior Research Fellowship) Examination in Management, June 2012</Text>
</View>
  
      {/* Research Supervision & Publications */}
<View style={styles.section}>
  <Text style={styles.title}>Research</Text>
  <Text style={[styles.title, { marginTop: 10 }]}>PhD Guidance</Text>
  <Text>Currently guiding three registered scholars working in:</Text>
  <Text>• Psychological ownership in online multiplayer games</Text>
  <Text>• Digital Content Marketing</Text>
  <Text>• Augmented Reality and User Experience</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Publications</Text>
  <Text>• Thirteen research papers (UGC/Scopus/ABDC/ABS/WoS/peer-reviewed)</Text>
  <Text>• Eight Book Chapters</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Conferences & Seminars</Text>
  <Text>• Presented papers at 25+ national/international conferences including:</Text>
  <Text>  - MICA</Text>
  <Text>  - IIM Shillong</Text>
  <Text>  - IIM Jammu</Text>
  <Text>  - Emerging Markets Conference Board (EMCB)</Text>
  <Text>  - FIIB</Text>
  <Text>  - Indian Academy of Management (INDAM)</Text>
  <Text>  - Jaipuria Institute of Management</Text>
  <Text>• Attended eighteen training workshops</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Research Projects</Text>
  <Text>• Completed JU-sponsored Seed Grant (2023-24):</Text>
  <Text>  "Generating Consumer Wellbeing through Psychological Ownership: A Case of Fitness Apps"</Text>
  <Text>  (₹50,000 grant)</Text>
  <Text>• Completed JU-sponsored Seed Grant:</Text>
  <Text>  "Understanding the Role of Social Networking Sites in Political Marketing"</Text>
  <Text>  (₹50,000 grant)</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Journal Reviewing</Text>
  <Text>• Acting as reviewer for academic journals</Text>
</View>

      {/* Academic Interest */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interest</Text>
      
        <Text>• Courses taught include Managerial Economics, Business Environment, Strategic Marketing, Service Marketing, Strategic Management, and Research Methodology. </Text>
       </View>
     {/* Publications */}
<View style={styles.section}>
  <Text style={styles.title}>Publications</Text>
  <Text style={[styles.title, { marginTop: 10 }]}>Published Papers in Journals</Text>
  
  <Text>• Gupta, S. and Sharma, B. (2024). A Bibliometric Study on Marketing Perspective of Psychological Ownership, accepted for publication in Management Research Review (Emerald, Scopus, ESCI, ABS, ABDC)</Text>
  
  <Text>• Gupta, S. and Dutt, R. (2024). Identifying consumer-based digital content marketing consumption motives: a qualitative study. Journal of Advances in Management Research. https://doi.org/10.1108/JAMR-08-2023-0218 (Emerald, Scopus Indexed, ABDC)</Text>
  
  <Text>• Gupta, S. and Sharma, B. (2024). The Essence of Psychological Ownership and Emotions in Adaptation of Digital Technologies. GLIMS Journal of Management Review and Transformation, 3(1). https://doi.org/10.1177/jmrt.241249544 (SAGE Spectrum)</Text>
  
  <Text>• Gupta, S., Dutt, R., Sharma, A. and Sharma, B. (2024). Gamification in Digital Marketing: Proposing a Theoretical Framework Based on Uses and Gratifications Theory. BIMTECH BusinessPerspectives,5(1). https://doi.org/10.1177/25819542241246884 (SAGE Spectrum, Indexed in Proquest, J-Gate, India Citation Index, Google Scholar)</Text>
  
  <Text>• Gupta, S., & Chauhan, V. (2023). Understanding the Role of Social Networking Sites in Political Marketing. Jindal Journal of Business Research, 12(1), 58-72. https://doi.org/10.1177/22786821221147592 (SAGE Publications; UGC approved)</Text>
  
  <Text>• Gupta, S. (2021). Investigating the impact of Customer Engagement on Customer Value in case of Mobile Travel Apps. International Journal of Hospitality & Tourism Systems, 14(1), 106-120. [Scopus Indexed, UGC-CARE List (Group A)]</Text>
  
  <Text>• Gupta, S. (2019). Investigating the Impact of Cause Related Marketing on Behavioural Intentions. Researcher, XV (1), 79-90.</Text>
  
  <Text>• Gupta, S., Sharma, A. & Parrey, H. (2018). Cause Related Marketing and Customer Value: The role of service Quality and Perceived Risk as Mediators. Manthan, Journal of Commerce and Management, 5(1), 1-19. https://doi.org/10.17492/manthan.v5i01.13041 [Indian Citation Index, Research Gate, J-Gate, UGC approved]</Text>
  
  <Text>• Bhat, A., Gupta, S., Kachroo, J. & Raina, D. (2017). Evaluating the Performance of Co-operative Societies in Jammu Division of Jammu and Kashmir. Advances in Social Sciences, 3(1), 5-11.</Text>
  
  <Text>• Sharma, A. & Gupta, S. (2015). Cause Related Marketing and Customer Value - A Relationship Analysis. MERC Global's International Journal of Marketing Management, 1(1), 93-104.</Text>
  
  <Text>• Gupta, S. (2015). Measuring effectiveness of cause Related Marketing initiatives. International Journal of Marketing and Technology, 5(6), 95-110.</Text>
  
  <Text>• Sharma, A. & Gupta, S. (2012). Empirical Assessment of Cause Related Marketing and Consumers Perspective: A Case of Idea Cellular's '3 g pe busy' Campaign. International Journal of research in computer application & Management, 2(9), 60-65.</Text>
  
  <Text>• Tandon, S. & Gupta, S. (2012). Mentoring: A Tool For Lifelong Learning In Organizations. Indian Journal of Applied research, 1(11).</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Book Chapters / Conference Proceedings</Text>
  
  <Text>• Gupta, S., Dutt, R. (2023). The Enhancement of Digital Content Marketing: Insights from Beauty Brands' Consumers. Digital Transformation for Business Sustainability & Growth. Jalandhar: Lovely Professional University. ISBN: 978-81-19334-19-3</Text>
  
  <Text>• Gupta, S., Dutt, R. & Sharma, B. (2023). Specialty Agriculture and Marketing An Exploration of Linkages through Case Study Analysis. Entrepreneurship Development in Specialty Agriculture. New Delhi: NIPA. ISBN 978-93-95319</Text>
  
  <Text>• Gupta, S., Sharma, B. & Dutt, R. (2023). Agripreneurs and Speciality Cultivation: The Valuable Insights. Specialty Agriculture. New Delhi: NIPA. ISBN: 978-93-95319-00-0</Text>
  
  <Text>• Gupta, S. (2021). Agri-Tech Start-ups: Transforming Indian Agriculture. Agribusiness Development Planning and Management. New Delhi: New Delhi Publishers. ISBN: 978-81-948993-6-5</Text>
  
  <Text>• Gupta, S. & Chauhan, V. (2020). Branding Indian cities as smart tourism destinations. Tourism in Asian Cities. New York: Routledge. ISBN 9780367210021</Text>
  
  <Text>• Gupta, S. (2019). Investigating the Role of Mediation Analysis in Social Sciences Research. Research Methodology for Social Sciences: An Elementary Book for Researchers. New Delhi: SSPH. ISBN 978-93-88020-44-2</Text>
  
  <Text>• Gupta, S. (2016). Corporate Social Responsibility and Agri-Business Management. Agricultural Marketing: Perspectives & Potential. New Delhi: NIPA. ISBN 978-93-85516-15-3</Text>
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