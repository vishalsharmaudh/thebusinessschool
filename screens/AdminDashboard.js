import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert, } from 'react-native';
import { supabase } from '../supabaseClient';

const dashboardItems = [
  { title: 'Queries', icon: '❓', screen: 'QueriesScreen' },
  { title: 'Admission Requests', icon: '📥', screen: 'AdmissionsScreen' },
  { title: 'Update Gallery', icon: '☁️', screen: 'GalleryAdmin' },
];

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

const AdminCard = ({ item, navigation }) => (
  <View style={styles.card}>
    <Text style={styles.icon}>{item.icon}</Text>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.buttonText}>View</Text>
    </TouchableOpacity>
  </View>
);

export default function AdminDashboard({ navigation }) {
  const handleLogout = async () => {
  try {
    await supabase.auth.signOut(); // Optional
  } catch (error) {
    console.error('Error signing out:', error.message);
  }

  // Navigate to Login without resetting the stack
  navigation.navigate('loginadmin');
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <FlatList
        data={dashboardItems}
        keyExtractor={(item) => item.screen}
        numColumns={2}
        renderItem={({ item }) => (
          <AdminCard item={item} navigation={navigation} />
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


export function Facultydetails({ navigation }) {
  return (
    <View style={facultyStyles.container}>
      <Text style={facultyStyles.heading}>Faculty Details</Text>
      <Text style={facultyStyles.text}>List of faculty members will be displayed here.</Text>
      <TouchableOpacity
        style={facultyStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={facultyStyles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

export function QueriesScreen() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching queries:', error);
    } else {
      setQueries(data);
    }
    setLoading(false);
  };

  const deleteQuery = async (id) => {
    Alert.alert(
      'Delete Query',
      'Are you sure you want to delete this query?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('contact_queries')
              .delete()
              .eq('id', id);
            if (error) {
              Alert.alert('Error', 'Could not delete the query');
            } else {
              fetchQueries();
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const renderItem = ({ item }) => (
    <View style={queryStyles.queryCard}>
      <Text style={queryStyles.queryText}>Name: {item.name}</Text>
      <Text style={queryStyles.queryText}>Email: {item.email}</Text>
      <Text style={queryStyles.queryText}>Phone: {item.phone}</Text>
      <Text style={queryStyles.queryText}>Message: {item.message}</Text>
      <Text style={queryStyles.queryTime}>
        Submitted: {new Date(item.created_at).toLocaleString()}
      </Text>
      <TouchableOpacity
        style={queryStyles.deleteButton}
        onPress={() => deleteQuery(item.id)}
      >
        <Text style={queryStyles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={queryStyles.container}>
      <Text style={queryStyles.heading}>User Queries</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={queries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={queryStyles.list}
        />
      )}
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
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 100,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
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
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
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
});

const facultyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    paddingTop: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const queryStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 12,
    backgroundColor: '#f1f5f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  queryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  queryText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#334155',
  },
  queryTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#ef4444',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
