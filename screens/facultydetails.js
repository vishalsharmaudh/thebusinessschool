import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const facultyData = [
   {
    name: 'Vinay Chauhan, Ph.D',
    title: 'Director',
    photo: require('../assets/vinay.jpg'),
  },
  {
    name: 'Alka Sharma',
    title: 'Dean, Business Studies',
    extraTitle: 'Director, SIIEDC',
    photo: require('../assets/alka.jpg'),
  },
   {
    name: 'Prof Sameer Gupta',
    title: 'Professor',
    photo: require('../assets/sameer.jpeg'),
  },
  {
    name: 'Prof Rajendra Mishra',
    title: 'Professor',
    photo: require('../assets/rajendra.jpeg'),
  },
  {
    name: 'Amisha Gupta',
    title: 'Professor',
    photo: require('../assets/amisha.jpg'),
  },
  {
    name: 'Komal Nagar',
    title: 'Professor',
    photo: require('../assets/komal.jpg'),
  },
  {
    name: 'Dr. Rachna Mahajan',
    title: 'Associate Professor',
    photo: require('../assets/rachna.jpg'),
  },
  {
    name: 'Dr. Saloni Devi',
    title: 'Asst. Professor',
    photo: require('../assets/saloni.jpg'),
  },
  {
    name: 'Farah Choudhary',
    title: 'Sr. Asst. Professor',
    photo: require('../assets/farah.png'),
  },
  {
    name: 'Aubid Hussain Parrey',
    title: 'Asst. Professor',
    photo: require('../assets/aubid.jpg'),
  },
  {
    name: 'Dr. Shelleka Gupta',
    title: 'Sr. Asst. Professor',
    photo: require('../assets/shelleka.jpg'),
  },
  {
    name: 'Dr. Versha Mehta',
    title: 'Professor',
    photo: require('../assets/versha.jpg'),
  },
  {
    name: 'Dr. Neelu Rohmetra',
    title: 'Dean, Research Studies',
    photo: require('../assets/neelu.jpg'),
  },
  {
    name: 'Dr. Saloni Devi',
    title: 'Asst. Professor',
    photo: require('../assets/saloni.jpg'),
  },
  
];

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

const FacultyCard = ({ faculty, navigation }) => {
  return (
    <View style={styles.card}>
      <Image source={faculty.photo} style={styles.photo} />
      <Text style={styles.name}>{faculty.name}</Text>
      <Text style={styles.title}>{faculty.title}</Text>
      {faculty.extraTitle && (
        <Text style={styles.extraTitle}>{faculty.extraTitle}</Text>
      )}
      
        {/* Conditional rendering for different faculty members */}
  {faculty.name === 'Alka Sharma' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('alkadetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  
  {faculty.name === 'Amisha Gupta' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Amishadetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Aubid Hussain Parrey' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('aubiddetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Dr. Versha Mehta' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('vershadetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Dr. Neelu Rohmetra' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('neeludetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Dr. Rachna Mahajan' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('rachnadetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Dr. Shelleka Gupta' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('shelkhadetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
   {faculty.name === 'Dr. Saloni Devi' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('salonidetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
   {faculty.name === 'Farah Choudhary' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('farahdetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Komal Nagar' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('komaldetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Prof Rajendra Mishra' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('rajendradetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Prof Sameer Gupta' && (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Sameerdetails')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
  {faculty.name === 'Vinay Chauhan, Ph.D' && (
    <TouchableOpacity 
      style={styles.buttonvinay}
      onPress={() => navigation.navigate('vinaydetail')}
    >
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  )}
</View>
  );
};

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FACULTY PROFILES</Text>
      <FlatList
        data={facultyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FacultyCard faculty={item} navigation={navigation} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  extraTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonvinay: {
    marginTop: 22,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
});