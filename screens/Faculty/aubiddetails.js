import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/aubid.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Aubid Hussain Parrey</Text>
          <Text style={styles.designation}>
           Assistant Professor, The Business School
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>The Business School
University of Jammu
Baba Saheb Ambedkar Road, </Text>
        <Text>New University Campus, J&K UT, Jammu-180006</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:aubidparrey@jammuuniversity.ac.in')}>
          aubidparrey@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9419025867</Text>

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
        <Text>• Ph.D in Management from The Business School, University of    Jammu, Jammu.</Text>
        <Text>• Certificate Course in Global Understanding from University of Jammu in association  with  East Carolina University, University of Central Lancashire and China Agricultural University.</Text>
        <Text>• UGC-NET in Management in the Year 2012.</Text>
        <Text>• MBA from Annamalai University in the year 2009. </Text>
        <Text>•MPA (Masters in Public Administration) from IGNOU in the year 2019.</Text>
        <Text>• B.Sc from University of Kashmir in the year 2007.</Text>
        <Text>• 12th from JKBOSE in the year 2003.</Text>
        <Text>• 10th from JKBOSE in the year 2001.</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>Research Projects / Consultancies</Text>
        <Text>• Conducted an ICSSR sanctioned research project on the title “Impact of PM Ujjwala Yojna in Empowering Households: A Study on Jammu and Kashmir UT” amounting to Rs 13,00000/- (Thirteen Lakhs). </Text>
        <Text>• Conducted a Seed Grant Sponsored Research Project titled “Role of Entrepreneurship and Skill Development Schemes in Empowering Youth: An Empirical Investigation in Jammu & Kashmir and Ladakh UTs” sanctioned vide order no. RA/23/3844 dated 05-04-2023 amounting to Rs 50,000/- (Fifty Thousand Only). </Text>
        <Text>•  Ongoing Interdisciplinary Project titled “Socio-economic effect of cultivating saffron using in-house developed method" as PI sanctioned vide order no. Fin./2022-23/7308-11; dated 27-02-2023 amounting to Rs 10, 00000/- (Ten Lakhs). </Text>

        <Text>• Conducted a Seed Grant Sponsored Research Project on the title “Transformational Leadership for Institution Building in Higher Education: A Leader-Member Exchange (LMX) Perspective” sanctioned vide order no. RUSAJU/2/2020/36/1893-1943 dated 14-07-2020 amounting to Rs 50,000/- (Fifty Thousand Only).</Text>
        <Text>•  Conducted Three Days Training Programme on the topic “Personnel Effectiveness, Emotional Intelligence and Leadership” organized by Dulhasti Power Station, NHPC Limited, Kishtwar from 18-20 February, 2019 and generated an amount of Rs 24,000/- (Twenty-Four Thousand). </Text>
        <Text>• Worked as Research Associate in the Project ‘Border Area Development Programme’ (BADP) constituting Districts Baramulla, Kupwara and Bandipora sponsored by Planning Commission of India through IIM, Lucknow from 1st April to 31st May, 2012.</Text>
        <Text>• Held the position of Star Master Trainer/Gender Master Trainer for Capacity Building in Census of India, 2011 for the Districts Poonch, Rajouri and Doda from 1stOctober 2010 to 5th March 2011, sponsored by UNICEF.</Text>

        <Text style={[styles.title, { marginTop: 10 }]}>ACHIEVEMENTS / AWARDS</Text>
        <Text>• Best Paper Award in research paper titled “Career Adaptability Research Trends in the New Normal World of Work: Exploring the Post Pandemic Research Trends using Bibliometric Analysis” presented in ICBIT 2022 organized by MDI Murshidabad on 16-17 December, 2022.</Text>
        <Text>•  Best Paper Award in research paper titled “Systematic review, synthesis, and future research agenda: Entrepreneurs personality and decision making logics” presented in S team Conference organized by Symbiosis centre for management and human resource development on 30th September, 2022.</Text>
        <Text>•  Best Paper Award in research paper titled “Impact of entrepreneurial orientation and market orientation on financial performance among MSMEs in North India” presented in National Conference on Sustainable development goals organized by Dyal Singh College and Delhi School of Economics, University of Delhi on 9th September, 2022.</Text>
        <Text>• Best Paper Award in research paper titled “Exploring The Role Of Service Quality Value Congruity, Brand Identification and Their Impact On Customer Brand Engagement and Loyalty In Emerging Service Markets” presented in International Conference on Strategic Marketing Initiatives in Emerging Markets organized by The Business School, University of Jammu in collaboration with North American Society For Marketing Education in India from 15th -16th March 2019. </Text>
        <Text>• Maulana Azad National Fellowship Awardee by UGC in the year 2011.</Text>
        <Text>• G L Tandon Gold medal in MBA. </Text>
        <Text>• Reviewer of ‘International Journal of Organizational Analysis’ – An Emerald Journal.</Text>
        <Text>• Editorial Member of ‘European Journal of Applied Social Sciences Research’ (EJASSR) published from United Kingdom on a Quarterly Basis. </Text>
        <Text>• Editorial Member of ‘Journal of Strategic Human Resource Management’ (JSHRM) published from New Delhi on Biannual Basis.</Text>
        <Text>•  Editorial Member of ‘International Journal of Exclusive Management Research’ (IJEMR) published on Monthly Basis.</Text>
        <Text>• Editorial Member of ‘International Journal of Scientific and Engineering Research’. </Text>
        <Text>•  Review Board Member of ‘International Journal of Multidisciplinary Research and Modern Education’. </Text>



        

      </View>
      <View style={styles.section}>
        <Text style={styles.title}>OTHER INFORMATION</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>AREAS OF INTEREST</Text>
        <Text>•Organizational Behaviour</Text>
        <Text>• Human Resource Management</Text>
        <Text>• Entrepreneurship Development</Text>
        <Text>• Training and Development</Text>
        <Text>•Cross Cultural Management</Text>
        <Text>• Change Management</Text>
      
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
  "Career adaptability in the new normal world of work: exploring the post-pandemic research trends using bibliometric analysis, International Journal of Organization Theory & Behavior, Emerald (Scopus), Vol. ahead-of-print No. ahead-of-print. https://doi.org/10.1108/IJOTB-03-2023-0065.",
  
  "The bright side of Post-Pandemic Remote Working: Examining the effect of Self-Efficacy and Work-Related Flow on Employee Resilience, Global Knowledge, Memory and Communication, Emerald (ABDC B), Vol. ahead-of-print No. ahead-of-print. https://doi.org/10.1108/GKMC-09-2023-0344.",
  
  "Clean-tech Startups as Drivers of Sustainable Development Goals: A Society 5.0 Perspective, JIM QUEST (UGC CARE) Vol. 19, No. 2, July-December, 2023.",
  
  "Effectuation and Causation Decision-making Logics: Scale Development and Validation, MANTHAN: Journal of Commerce and Management (UGC CARE), 10 (2), 1-27.",
  
  "Work From Home Amid Black Swan Event (Covid-19): A Bibliometric Analysis from a social science perspective, Kybernetes, Emerald (Scopus), Vol. 53, No. 3, pp. 1015-1038. https://doi.org/10.1108/K-09-2022-1348.",
  
  "Tring-Tring: Will BSNL Wake-up to the New Market Reality? Accepted in Asian Journal of Management Case, Sage (ABDC C).",
  
  "The Five Factor Model of Personality and Discretionary Work Effort: An Interactional Analysis. Researcher – A Multidisciplinary Journal. (Peer reviewed) Vol. XV, No.1, 147-156. ISSN = 2278-9022.",
  
  "Exploring the Role of Service Quality, Value Congruity, Brand identification: Impact on Customer Brand Engagement and Loyalty in Emerging Service Markets. Researcher – A Multidisciplinary Journal. (Peer reviewed) Vol. XV, No.1, 2019. ISSN = 2278-9022.",
  
  "Understanding the Role of Service Quality and Perceived Risk as Mediators in the relationship of Cause Related Marketing and Customer Value. MANTHAN- A Commerce and Management Journal. (UGC CARE). 5 (1), 1-19. Print ISSN: 2347-4440; e-ISSN: 2395-2601.",
  
  "Impact Assessment of Motivation on Discretionary Work effort. Indian Journal of Applied Research, (UGC CARE) Vol (3), Issue 6, ISSN- 2249- 555X.",
  
  "Discretionary Work Effort and Employee Motivation: A Framework for High Quality Service Organizations. Indore Management Journal (Peer reviewed) (IIM-Indore), ISSN: 0975-1653.",
  
  "Quality Interventions in HR Practices: A Case of Higher Education. Journal of Strategic Human Resource Management (JSHRM), (UGC CARE) Vol (1), Issue 2, ISSN: 2277-2138.",
  
  "Correlating Business Process Management and Organizational Performance: A Case Study of J&K Bank. IUP Journal of Organizational Behaviour, (UGC CARE) Vol. XII, No. 4, ISSN 0972-687X."
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