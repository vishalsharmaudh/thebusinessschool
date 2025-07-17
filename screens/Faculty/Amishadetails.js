import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/amisha.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Amisha Gupta</Text>
          <Text style={styles.designation}>
            Professor, The Business School, University of Jammu with Nineteen years
of experience
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>The Business School, University of Jammu (New Campus)</Text>
        <Text>Jammu 180006, Jammu & Kashmir</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:amishagupta@jammuuniversity.ac.in')}>
          amishagupta@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9419110199</Text>

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
        <Text>• B.Com, University of Jammu, 1998 (secured overall 3rd position).</Text>
        <Text>• M.B.A. (Finance and Marketing), The Business School, University of Jammu, 2000 (secured overall 2nd position).</Text>
        <Text>• Ph.D. in Management on the topic “Performance Evaluation of Mutual Funds in India: An Empirical Analysis of Investor’s Perspective” awarded in the Faculty of Business Studies in 2010.</Text>
      </View>

      {/* Research */}
      <View style={styles.section}>
        <Text style={styles.title}>Research</Text>
        <Text>• Ph.D. in Management awarded in the Faculty of Business Studies in 2010, with a thesis on "Performance Evaluation of Mutual Funds in India: An Empirical Analysis of Investor’s Perspective."</Text>
        <Text>• Guided several research works leading to Ph.D. degrees, including titles such as "Herd Behaviour in Investment Decision Making: A case of Mutual Fund Portfolio Selection"</Text>
        <Text>• "Behavioural Finance in Investment Decision Making Process of Mutual Fund Investors""Role of State Level Financial Institutions in Industrial Development of Jammu Division""Demographic and Socio-Economic Analysis of User Perception Towards Credit Cards""An Empirical Study of the Framework of Disposition Effect in the Equity Investors in Jammu Region"</Text>

        <Text>• Served as an Academic Counselor at Indira Gandhi National Open University (IGNOU), Regional Centre, Jammu, guiding dissertations for MBA students.</Text>
        <Text>• Adjudged the Best Paper Award for the paper titled "Mutual Funds in India: A Strategic Option in Investment Decision Making" at the Fifth National Conference on Indian Capital Market: Emerging Issues organized by IBS Gurgaon, Feb. 4-5, 2011.</Text>
        <Text>• Awarded the Gold Medal for the Best paper titled "Global Financial Crisis and its Implications on Investment in South Asia," presented at the University of Jaipur, Rajasthan, December 10-11, 2008.</Text>
      </View>

{/* Education */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interests</Text>
        <Text>• Professor, The Business School, University of Jammu.</Text>
        <Text>• Taught courses on Accounting for Managers, Financial Management, Innovation and Entrepreneurship, Project Management, International Financial Management and Management of Financial Services.</Text>
        <Text>Developed and delivered lectures, seminars, and workshops on various topics related to commerce and management.</Text>
        <Text>• Resource person and academic expert for various programs and courses organized by the Sher-e-Kashmir Police Academy, J&K Excise and Taxation Department, J&K EDI, IGNOU, and other institutions.</Text>
        <Text>• Ph.D. in Management on the topic “Performance Evaluation of Mutual Funds in India: An Empirical Analysis of Investor’s Perspective” awarded in the Faculty of Business Studies in 2010.</Text>
        <Text>• National Educational Test (NET), in the subject of Management, University Grants Commission (UGC), July, 2000.</Text>
        <Text>• State Level Eligibility Test (SLET), in the subject of Management and Finance, University Grants Commission (UGC), October, 2000.</Text>
        
      </View>

      {/* Publications */}
      <View style={styles.section}>
        <Text style={styles.title}>Publications</Text>
        {publications.map((item, index) => (
          <Text key={index} style={styles.publicationItem}>• {item}</Text>
        ))}
      </View>
{/* otherInformation */}
      <View style={styles.section}>
        <Text style={styles.title}>Other Information</Text>
        {otherInformation.map((item, index) => (
          <Text key={index} style={styles.informationItem}>• {item}</Text>
        ))}
      </View>
    </ScrollView>
  );
};
const publications = [
  "Behavioral Perspective on sustainable finance: nudging investors toward SRI, Asian Journal of Economics and Banking, Vol. Ahead of Print No.",
  "Impact of Demographic and Socio-Economic Factors on Credit Card Usage in Public and Private Banks, Journal of Interdisciplinary Cycle Research, Vol. XIII, Issue I, January-2021, ISSN NO: 0022-1945.",
  "Digital Marketing and Civic Society: A case study, Manthan Journal of Commerce and Management, Vol. 6 Special Issue| 2019, ISSN: 2347-4440.",
  "An Assessment of Attitude of Higher Education Students towards Entrepreneurship in Jammu District, Researcher: A Multidisciplinary Journal, Vol. XV, No. 1, 2019, ISSN2278-9022.",
  "Impact of Demographic Factors on Online Booking Behaviour- A study in Jammu district, International Journal for Research Trends and Innovation (IJRTI)Volume 3 Issue 12, December-2018, ISSN Number: 2456 - 3315",
  "Impact of Financial Literacy, Financial Awareness and Financial Inclusion in Jammu, Journal of Emerging Technologies and Innovative Research Volume 5 Issue 11 November 2018, ISSN: 2349-5162.",
  "Performance Evaluation of Index Schemes: A Comparison of Public and Private Sector Mutual Funds in India, International Journal for Research Trends and Innovations Volume 3 Issue 11 November 2018, ISSN: 2455-2631.",
  "Demographic Factors that Influence the Usage of Credit Cards: A study of Jammu Region, Journal of Emerging Technologies and Innovative Research, Vol. 5 Issue 10 October 2018, ISSN: 2349-5162.",
  "Financial Awareness and Approaches towards Credit Card Practices among Users of Udhampur District, International Journal of Creative Research Thoughts, Vol. 6 Issue 2 May 2018, ISSN: 2320-2882.",
  "Factors Influencing Internet Banking Usage- An Investigative Study, Zenith International Journal of Business Economics and Management Research, Vol.8 Issue 2, Feb. 2018, ISSN2249-8826.",
  "On the Behavioural Dynamics of Investment: Empirical Research Findings, Researcher: A Multidisciplinary Journal, Vol. XIII No. 2, 2017, ISSN 2278-9022.",
  "Factors Influencing Consumer’s Perception Towards the Acceptance of Credit Cards, Pacific Business Review International, Vol. 9 Issue 12, June 2017, ISSN0974438X.",
  "Role of Tourism in Local Employment and Income Generation: A Case of Jammu and Kashmir State, JIM Quest Journal of Management and Technology, Vol. 12, No. 1, Jan-June 2016, ISSN No. 0975-6280.",
  "Mutual Funds in India: A Strategic option in Investment Decision Making., MMU Journal of Management Practices, Vol. 6.2 & 7.1.2, July 2012- Dec. 2013, ISSN 0974-7257.",
  "Evaluating Mutual Funds Performance using TOPSIS Method, DRIEMS Business Review, Vol. 1, No.:2 July 2013, ISSN 2320-6241, E-ISSN 2321-4112.",
  "The Indian Banking Sector Post Recession-An Impact Assessment, JIMQUEST Journal of Management and Technology, Vol.7, No. 2, July-Dec.2011, ISSN No. 0975-6280.",
  "Terrorism and its Impact on Financial Performance: A Case of Tourism Industry, International Journal of Financial Management, Vol.1, Issue 4, Oct.2011, ISSNNo.2229-5682.",
  "Mutual Funds’ Performance in India: Impact of Foreign Strategic Alliance, Asia Pacific Journal of Research in Business Management, Vol. 2, Issue 8 Aug. 2011, ISSN 2229-4104.",
  "Losing Grip of Regional Stock Exchanges to National Stock Exchanges- A Case of Ludhiana Stock Exchange, Global Journal of Contemporary Management, Vol.1, No.1 June 2011, ISSN 2249-1899.",
  "Foreign Direct Investment in Indian Retail Sector: Strategic Issues and Implications, International Journal of Marketing and Management Research, Volume 1 Issue 1Dec. 2010, ISSN-2229-6883.",
  "Microfinance: Its Role and Implications for the South Asian Financial Crisis, International Journal of Research in Commerce and Management (IJRCM), Vol. No. 1, Issue No. 5, September 2010, ISSN 0976-2183.",
  "Impact of Global Economic Recession on Destination Branding, Journal of Tourism- An International Research Journal on Travel and Tourism, Vol. X, No. 2, 2009, ISSN: 0972-7310.",

  // Edited books / conference proceedings
  "Perception of Tourists About Usage of Credit Cards, Dynamics of Sustainable Tourism (ed), Wisdom Press, ISBN: 978-93-88387-14-9, 2019.",
  "Introducing Management and Research, Research in Social Sciences: Interdisciplinary Perspective (ed), Social Research Foundation, ISBN: 97881921665-8-2, Feb 2016.",
  "Strategic issues and challenges post-recession: Lessons for Developing Nations, Leadership and Strategy (ed), Bhaddal Tech. Publications, Bhaddal Institute, ISBN: 978-81-921786-9-1, 2013.",
  "Economic Impact of Tourism in an Era of Recession, Strategic Service Management (ed), Excel Books, ISBN: 978-81-7446-891-8, 2010.",
  "Internet Banking: An Analytical Study in the Digital Economy, E-Commerce: Issues, Perspective and Challenges in the Indian Context (ed), KW Publishers Pvt. Ltd., New Delhi, ISBN 13:978-93-80502-10-6, 2010."
];

const otherInformation = [
  "Resource person for the programmes/courses for Police Officers organized by the Sher-e-Kashmir Police Academy, Udhampur (J&K).",
  "Resource Person and Academic Expert for various programmes and courses organized by J&K Excise and Taxation Department, Jammu and Kashmir, J&KEDI.",
  "Resource person and Academic Expert for Certificate Course in Sales Management Module “Communication and Negotiation Skills”, Faculty of Management Studies (FMS), Gurukula Kangri, Haridwar, 18-19 December, 2021.",
  "Resource person and Academic Counsellor for Various Courses and Programmes under IGNOU and Regional Training Institute, Internal Audit and Accounts Department, AG Office, Jammu.",
  "Trained Auditor for Quality Management Systems under ISO 9001:2000.",
  "Faculty nominee as Expert for the post of State Project Manager (IT & Biometrics) in Himayat Mission Management Unit, JKRLM Jammu, November 2022.",
  "Course Coordinator of one week workshop on Accounting/Audit for non-teaching staff of Jammu University organized by UGC-Human Resource Development Centre in collaboration with DIQA, University of Jammu, 30 December 2021 - 06 January 2022.",
  "Faculty nominee as Expert for the selection of State Project Manager (PIA/CD) in Himayat Mission Management Unit, JKRLM Jammu, March 2021.",
  "Workshop Coordinator of One-day workshop on Training needs and its importance for government sector employees for newly recruited Jammu & Kashmir Excise & Taxation Inspectors, 12 December 2018.",
  "Chairperson, Committee Against Sexual Harassment, NABARD, Regional Office, Jammu, 2014-2018.",
  "Coordinated Two Day Management Development Programme with IOCL held at The Business School, University of Jammu, 26-27 August 2016.",
  "Resource Person in the Training Programme on “Management Competencies at IIPA J&K regional Branch, Aug. 31, 2013.",
  "Member Departmental Affairs Committee, The Business School, University of Jammu.",
  "Member Department Research Committee, The Business School, University of Jammu.",
  "Member Local Fund Committee, The Business School, University of Jammu.",
  "Member Purchase Committee, The Business School, University of Jammu.",
  "Course Coordinator, PGDBM, The Business School, University of Jammu since 2015.",
  "Member- Committee for Designing proposed MBA Executive for PG Level, The Business School, University of Jammu.",
  "Course Coordinator for Mutual Funds Certification Program of BSE Institute Limited for MBA IV Semester, 2022.",
  "Member- Committee for Designing of new curricula and courses under Choice Based Credit System, The Business School, University of Jammu, 2018-21.",
  "Member Centralized Placement Cell, University of Jammu since 2018.",
  "Member GPF Committee, University of Jammu since 2018.",
  "Member Publication Cell, University of Jammu since 2017-18.",
  "Executive Member, JUTA, University of Jammu, since 2015.",
  "Member Scrutiny Committee for the post of Semi-Professional Assistant (Main campus, Bhaderwah campus, and Poonch campus), University of Jammu, March 2022.",
  "Member Printing Committee for celebration of the Foundation Day of the University of Jammu, September 2022.",
  "Member- Committee for determination of fresh optimum sanctioned strength of non-teaching staff in various Section/Offices/Departments and to work out new sanctioned strength of the Teaching Departments/Directorates/Offices/Sections, University of Jammu, 2021.",
  "Member- Committee for testing of the website developed internally by Department of Computer Science and IT, University of Jammu, 2021.",
  "Member- Committee for change of Convocation Dress, University of Jammu, August 2020.",
  "Member Organising Committee in Two-day International Conference on Strategic Marketing Initiative in Emerging Markets, The Business School, University of Jammu, 2019.",
  "Member of Various Committees constituted for organizing various University level events like SAUFEST, HARMONY, ISC-101, University Convocation etc."
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