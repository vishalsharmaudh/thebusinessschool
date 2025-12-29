import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../supabaseClient';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';

let isSharing = false;
const sendAcceptanceEmail = async (to_name, to_email) => {
  const serviceId = 'service_tzg7ufr';
  const templateId = 'template_kvakrn1';
  const publicKey = 'Asc9kLzHm3kouw0kS';

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      to_name,
      to_email,
      payment_link: 'https://www.youtube.com/',
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      Alert.alert('Success', 'Email sent successfully!');
    } else {
      const errText = await response.text();
      console.error('Email send error:', errText);
      Alert.alert('Error', 'Failed to send email.');
    }
  } catch (error) {
    console.error('EmailJS Network Error:', error);
    Alert.alert('Error', 'Email sending failed.');
  }
};

const sendRejectionEmail = async (to_name, to_email) => {
  const serviceId = 'service_tzg7ufr';
  const templateId = 'template_yrwmzo7'; 
  const publicKey = 'Asc9kLzHm3kouw0kS';

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      to_name,
      to_email,
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('📨 Rejection email sent!');
      Alert.alert('Sent', 'Rejection email sent successfully.');
    } else {
      const errText = await response.text();
      console.error('❌ Rejection email failed:', errText);
    }
  } catch (err) {
    console.error('❌ Network error in rejection email:', err);
  }
};

const openPDFInApp = async (pdfUrl) => {

  if (isSharing) return;

  try {
    setIsSharing(true); // start sharing

    const fileName = pdfUrl.split('/').pop();
    const localPath = `${FileSystem.cacheDirectory}${fileName}`;
    const { uri } = await FileSystem.downloadAsync(pdfUrl, localPath);

    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Error', 'Sharing not supported on this device.');
      setIsSharing(false);
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (err) {
    console.error('Error opening PDF:', err);
    Alert.alert('Error', 'Could not open the PDF file.');
  } finally {
    setIsSharing(false); // reset sharing flag
  }
};


export default function AdmissionsScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchApplications(); // just fetch without checking auth
  }, []);

  const fetchApplications = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error.message);
      Alert.alert('Error', 'Failed to load applications');
    } else {
      console.log('Fetched applications:', data);
      setApplications(data);
    }

    setLoading(false);
  };

  const handleStatusUpdate = async (id, status, email, name) => {
    try {
      console.log('🔁 Starting status update for ID:', id, 'Status:', status);

      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select()
        .maybeSingle(); // 👈 ensures one object, not array

      if (error) {
        console.error('❌ Supabase update error:', error.message);
        Alert.alert('Error', 'Failed to update status.');
        return;
      }

      if (!data) {
        console.warn('⚠️ No matching row found with ID:', id);
        Alert.alert('Warning', 'No application found with this ID.');
        return;
      }

      console.log('✅ Status updated for:', data);

      // Only send email if status is Accepted
      if (status === 'Accepted ✅') {
        await sendAcceptanceEmail(name, email);
      } else if (status === 'Rejected ❌') {
        await sendRejectionEmail(name, email);
      }

      await fetchApplications();
      Alert.alert('Success', `Status updated to "${status}"`);

    } catch (err) {
      console.error('💥 Unexpected error in status update:', err);
      Alert.alert('Error', 'Something went wrong while updating.');
    }
  };



  const renderItem = ({ item, index }) => {
    const form = item.form_data || {};
    const name = form.applicantName || 'No Name';
    const email = form.email || 'No Email';
    const status = item.status || 'Pending';
    const date = new Date(item.created_at).toLocaleString();
    const pdfUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/applicant-uploads/${item.pdf_url}`;

    console.log('🧪 ID passed to buttons:', item.id, typeof item.id);

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{index + 1}. {name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.date}>Submitted on: {date}</Text>
        <Text style={styles.status}>Status: {status}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PDFViewerScreen', { applicationId: item.id })}
            style={styles.viewBtn}>
            <Text style={styles.buttonText}>View PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleStatusUpdate(item.id, 'Accepted ✅', email, name)}
            style={styles.acceptBtn}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleStatusUpdate(item.id, 'Rejected ❌', email, name)}
            style={styles.rejectBtn}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Applications</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : applications.length === 0 ? (
        <Text style={styles.noData}>No applications submitted yet.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 6,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 6,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  noData: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
});