import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FacultyProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/rachna.jpg')} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Dr. Rachna Mahajan</Text>
          <Text style={styles.designation}>
           Associate Professor
          </Text>
          <Text style={styles.department}>The Business School</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.title}>Official Address</Text>
        <Text>H.No. 16-17 Sector 4 (Extn) Trikuta Nagar

J&K (India )</Text>
        <Text>Jammu - 180020</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:mahajan.rachna@jammuuniversity.ac.in')}>
          mahajan.rachna@jammuuniversity.ac.in
        </Text>
        <Text>Mobile: 9018459966</Text>

        <View style={styles.icons}>
          <FontAwesome name="facebook-square" size={24} color="#3b5998" style={styles.icon} />
          <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
          <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="linkedin" size={24} color="#0e76a8" style={styles.icon} />
        </View>
      </View>

     {/* Education Details */}
<View style={styles.section}>
  <Text style={styles.title}>Education</Text>
  
  <Text style={styles.subtitle}>PhD</Text>
  <Text>• University: Kurukshetra University</Text>
  <Text>• Title of Thesis: Marketing of Cellular Services (A Comparative of Cellular Players Operating in Punjab Zone)</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Master of Business Administration</Text>
  <Text>• University: G.N.D.U, Amritsar, Punjab</Text>
  <Text>• Dates Attended: 2001-2003</Text>
  <Text>• Specialization: Marketing (major), IT (minor)</Text>
  <Text>• Percentage: 78.6% - First in University (Gold Medal)</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Graduate</Text>
  <Text>• Degree: Bachelor in Computer Science</Text>
  <Text>• Institute: G.N.D.U, Amritsar, Punjab</Text>
  <Text>• Dates Attended: 1998-2001</Text>
  <Text>• Percentage: 76.5% - First Class (Distinction)</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Honors Diploma in Network and Centered Computing</Text>
  <Text>• Institute: NIIT, Batala</Text>
  <Text>• Dates Attended: 1999-00</Text>
  <Text>• Percentage: 90.2% (Excellence)</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Philip B. Cross B Course of Quality Management</Text>
  <Text>• Institute: NIIT, Batala</Text>
  <Text>• Dates Attended: 1999-00</Text>
  <Text>• Distinction: Excellence</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Senior Secondary</Text>
  <Text>• College: D.A.V College, Batala, Punjab</Text>
  <Text>• Board: Punjab School Education Board</Text>
  <Text>• Date of Completion: May 1997</Text>
  <Text>• Percentage: 86.6%</Text>

  <Text style={[styles.subtitle, { marginTop: 10 }]}>Higher Secondary</Text>
  <Text>• School: AVM Senior Secondary School, Batala, Punjab</Text>
  <Text>• Board: Punjab School Education Board</Text>
  <Text>• Date of Completion: May 1995</Text>
  <Text>• Percentage: 87.67% (Distinction)</Text>
</View>

  
      {/* Research Publications */}
<View style={styles.section}>
  <Text style={styles.title}>Paper Presentation at Conferences:</Text>
  <Text>• Presented papers at more than 50 National/International conferences including premium institutes such as IIM Ahmedabad, IIM Indore, MDI Gurgaon, IIT Delhi, MICA Ahmedabad, IBs Hyderabad etc. Received 3 Best Paper awards</Text>
  <Text>• Best Paper Award at IIM Nagpur, K J Somaiya Institute of Management</Text>
  <Text>• Attended around 14 workshops</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Publications:</Text>
  <Text>• 11 Book chapters in different books/Conference Proceedings</Text>
  <Text>• 18 Research papers (Peer reviewed/UGC listed/Scopus/ABDC)</Text>
  <Text>• 1 Edited book</Text>
  <Text>• 2 books Authored</Text>
  <Text>• Study Material of DDE for subject Customer Relationship Management</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>e-Content Developed:</Text>
  <Text>Developed all 4 Quadrants for following modules for e-PGpathsala:</Text>
  <Text>• Strategic Planning and Change Management</Text>
  <Text>• Strategic Issues in Managing Technology and Innovation</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Recent Work:</Text>
  <Text>• Case titled 'BSNL: Is there a way forward or is it time to hang up' in Asian Journal of Management Cases (C Category) (Accepted)</Text>
  <Text>• The role of Social Influencers for Effective Public Health, Online Information Review (ISSN 1468-4527), November 2021 (B Category) (Published)</Text>
  <Text>• Paper title: The impact of influencer-sourced brand endorsement on online consumer-brand engagement, Asia Pacific Journal of Marketing and Logistics (A Category) (Under Review)</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>PhDs Supervised:</Text>
  <Text>4 Scholars have been awarded PhD degree and 3 scholars are pursuing</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Projects Undertaken:</Text>
  <Text>Seed grant from University for Project titled: Community Based Tourism: Case study of Innovative Social Startup 'Not On Map'</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Review Work:</Text>
  <Text>• Mentor at Publons Academy where I have been mentoring scholars and reviewing their reviews on papers assigned to them as a part of their Review Writing course</Text>
  <Text>• Reviewer, Researcher, University of Jammu 2018</Text>
  <Text>• Reviewer, Asia Pacific Journal of Health Management 2020</Text>
  <Text>• Reviewer of manuscripts for International Conference on Strategic Marketing Initiatives in Emerging Markets organized by TBS in collaboration with NASMIE (March 17-18, 2019)</Text>
  <Text>• Reviewer of manuscripts for The Management Conclave, organized by Mittal School of Business, LPU Jalandhar (March 17-18, 2017)</Text>
  <Text>• Reviewed papers submitted for the International Conference on Strategies for Global Competitiveness and Economic Growth (LPU, Jalandhar), 2015</Text>
</View>
      {/* Academic Interest */}
      <View style={styles.section}>
        <Text style={styles.title}>Academic Interest</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>
          Corporate and Teaching Experience:
       </Text>
        <Text>• MBA Gold Medalist of the GNDU batch 2003, Recipient of President award</Text>
        <Text>• Qualified UGC NET and JRF exam in the first attempt while pursuing MBA</Text>
        <Text>• Campus placement for internship at Wipro Infotech Delhi, Campus Placement in HDFC Bank and served the corporate for more than 2years
</Text>
        <Text>• Ventured into teaching by joining Lovely Institute of Management (LPU) as Assistant Professor and handled additional responsibilities of Placements and Girls Hostel. Main Coordinators for admissions and counseling for first batch of LPU. </Text>
        <Text>• Joined University of Jammu and was awarded PhD degree in 2010</Text>

      </View>
      {/* Publications */}
<View style={styles.section}>
  <Text style={styles.title}>Edited Book:</Text>
  <Text>• Sharma, K., Chauhan, V., Nagar, K., Rachna, "Marketing of Tourism and Allied Services", Kanishka Publishers and Distributors, New Delhi, 2016 (ISBN: 978-81-8457-705-1)</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Books Authored:</Text>
  <Text>• Mahajan, R., "Handbook on Campus to Corporate", Write Order Publishers, Bangalore, 2022 (ISBN 978-93-95868-21-1)</Text>
  <Text>• Sundram, S., Mahajan, R., Rajendran, N., "Marketing Management", New Delhi, Taran Publication, 2022 (ISBN: 978-93-92-313-431)</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Book Chapters and Papers in Journals:</Text>
  <Text>• 12 Book Chapters</Text>
  <Text>• 18 Papers in Journals</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>Study Material:</Text>
  <Text>Developed study material of:</Text>
  <Text>• Business Ethics and Environment</Text>
  <Text>• Consumer Behavior</Text>
  <Text>• CRM for DDE students of University</Text>

  <Text style={[styles.title, { marginTop: 10 }]}>E-Content:</Text>
  <Text>• Developed modules for e-PG Pathshala</Text>
  <Text>• Content awaited...</Text>
</View>

     <View style={styles.section}>
  <Text style={styles.title}>OTHER INFORMATION</Text>
  <Text style={[styles.title, { marginTop: 10 }]}>Responsibilities handled at  Departmental Level:</Text>
  <Text>• Coordinator Placements for The Business School since 2020, earlier Member Placement team since 2009 and handled responsibilities placements and summer internships, Making of Placement Brochure/ Information Brochure every year</Text>
  <Text>• Coordinator for AICTE since 2010</Text>
  <Text>• Coordinator NBA ( Got first accreditation for TBS, JU)</Text>
  <Text>• Departmental Coordinator for NAAC & IQAC </Text>
  <Text>• Coordinator for Ranking and Rating process of TBS and coordinated and processed forms for participation in various ranking surveys conducted by different agencies. (Since 2009)</Text>
  <Text>• Coordinators for ICT academy under JEET programme where in two programme were proposed for two batches. One programme on Digital Marketing (150 hrs duration) has completed for batch 2020-2022 and registrations have completed for second programme on Sales Force Management (150 hrs) for batch (2021-23) </Text>
  <Text>• Instrumental for signing of MoU with ICT Academy  - A venture of Govt of India in Collaboration with AICTE and Corporate Partners.  (2021)
Coordinator for the Business Fest Lakshya  and  ‘Youtharva’ for all years the event was held.</Text>
<Text>• Coordinator for Social Immersion Program 2017 (Organized and Coordinated ‘Datri Drive’ and recruited 220 donors for bone marrow registry for the first time in J&K). This drive was first of its kind in UT of J&K. Another drive is in pipeline for 2022 </Text>

<Text style={[styles.title, { marginTop: 10 }]}>Responsibilities handled at the Departmental Level:</Text>
<Text>• Member Industry Academia Partnership Cell (IAPC), University of Jammu  and organized Lecture for Biosciences in collaboration with Merck</Text>
<Text>• Pharmaceuticals, Instrumental in coordinating  MoU with Merck , played key role for preparing the draft of Policy document </Text>
<Text>• Department Coordinator for University of Jammu, Alumni Association   </Text>
<Text>• Member IPR Cell, University of Jammu</Text>
<Text>• Member NAAC Central Committee for Criteria 2.</Text>
  
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