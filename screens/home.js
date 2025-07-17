import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const sections = [
  { icon: 'info', title: 'About Us', subtitle: 'Learn more about our mission and history.' },
  { icon: 'people', title: 'Faculty', subtitle: 'Meet our experienced faculty members.' },
  { icon: 'menu-book', title: 'Programs', subtitle: 'Explore the programs we offer to students.' },
  { icon: 'school', title: 'Admissions', subtitle: 'Find out how to apply our community.' },
  { icon: 'call', title: 'Contact Us', subtitle: 'Get in touch with us for any inquiries.' },
  { icon: 'admin-panel-settings', title: 'Login As Admin', subtitle: 'Administrator Access Portal' },
  { icon: 'photo-library', title: 'Gallery Section', subtitle: 'Explore Memorable Moments in Pictures' },
];

export default function BusinessSchoolScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f9fa' }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/business.jpeg')}
            style={styles.logo}
          />
          <Text style={styles.headerText}>The Business School</Text>
        </View>

        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (section.title === 'Faculty') navigation.navigate('Facultydetails');
              else if (section.title === 'Admissions') navigation.navigate('login');
              else if (section.title === 'Contact Us') navigation.navigate('contact');
              else if (section.title === 'About Us') navigation.navigate('about');
              else if (section.title === 'Programs') navigation.navigate('program');
              else if (section.title === 'Login As Admin') navigation.navigate('loginadmin');
              else if (section.title === 'Gallery Section') navigation.navigate('GalleryScreen');
            }}
          >
            <View style={styles.iconContainer}>
              <Icon name={section.icon} size={24} color="#00BCD4" />
            </View>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.title}>{section.title}</Text>
              <Text style={styles.subtitle}>{section.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: 8,
    borderRadius: (width * 0.18) / 2,
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 30,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    color: '#666',
    fontSize: width * 0.035,
    marginTop: 4,
    flexWrap: 'wrap',
  },
});
