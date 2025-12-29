import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { supabase } from '../supabaseClient';

const QueriesScreen = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');

  const loadQueries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_queries')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch queries:', error);
      Alert.alert('Error loading queries.');
    } else {
      setQueries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQueries();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadQueries();
    setRefreshing(false);
  };

  const openReply = (query) => {
    setSelectedQuery(query);
    setReplyText('');
    setShowReplyBox(true);
  };
  const sendQueryReplyEmail = async (to_name, to_email, reply_message) => {
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
        reply_message,
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('📨 Reply email sent!');
        return true;
      } else {
        console.error('❌ Email sending failed:', await response.text());
        return false;
      }
    } catch (err) {
      console.error('💥 Network error in email send:', err);
      return false;
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      Alert.alert('Write a reply before sending.');
      return;
    }

    const idToUpdate = Number(selectedQuery?.id);
    console.log('Updating reply for ID:', idToUpdate);

    // 1. Update Supabase
    const { data, error } = await supabase
      .from('contact_queries')
      .update({ replied: true, reply_message: replyText })
      .eq('id', idToUpdate)
      .select();

    if (error || !data || data.length === 0) {
      console.error('Supabase update error:', error);
      Alert.alert('Supabase Error', error?.message || 'Update failed.');
      return;
    }

    // 2. Send email using EmailJS
    const sent = await sendQueryReplyEmail(
      selectedQuery.name,
      selectedQuery.email,
      replyText
    );

    if (sent) {
      Alert.alert('Success', 'Reply sent via email!');
    } else {
      Alert.alert('Error', 'Reply saved, but email failed.');
    }

    await loadQueries();
    setShowReplyBox(false);
    setSelectedQuery(null);
    setReplyText('');
  };



  const renderItem = ({ item }) => {
    const isReplied = item.replied === true || item.replied === 'true';

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>📧 {item.email}</Text>
        <Text style={styles.detail}>📞 {item.phone}</Text>
        <Text style={styles.message}>📝 {item.message}</Text>
        <Text style={styles.date}>
          📅 {new Date(item.created_at).toLocaleString()}
        </Text>

        <View style={styles.replyRow}>
          {isReplied ? (
            <Text style={styles.replied}>✅ Reply Sent</Text>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => openReply(item)}
            style={styles.replyBtn}
          >
            <Text style={styles.replyBtnText}>Reply</Text>
          </TouchableOpacity>
        </View>

        {isReplied && item.reply_message ? (
          <View style={styles.replyBox}>
            <Text style={styles.replyLabel}>Your Reply:</Text>
            <Text style={styles.replyText}>{item.reply_message}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading queries...</Text>
        </View>
      ) : queries.length === 0 ? (
        <View style={styles.center}>
          <Text>No queries found.</Text>
        </View>
      ) : (
        <FlatList
          data={queries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      {/* Reply Modal */}
      <Modal visible={showReplyBox} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Reply to {selectedQuery?.name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Write your reply..."
              multiline
              value={replyText}
              onChangeText={setReplyText}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setShowReplyBox(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={sendReply} style={styles.sendBtn}>
                <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#334155',
  },
  message: {
    fontSize: 15,
    color: '#0f172a',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
    textAlign: 'right',
  },
  replyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  replied: {
    color: 'green',
    fontWeight: 'bold',
  },
  replyBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  replyBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  replyBox: {
    backgroundColor: '#ecfdf5',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  replyLabel: {
    fontWeight: 'bold',
    color: '#047857',
  },
  replyText: {
    color: '#065f46',
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    minHeight: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    backgroundColor: '#9ca3af',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default QueriesScreen;
