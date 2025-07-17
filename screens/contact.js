import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient'; 
import * as Animatable from 'react-native-animatable';

const ContactUs = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 360;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'Invalid email format';
  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone.trim()) ? '' : 'Phone number must be 10 digits';
  const validateName = (name) =>
    name.trim().length >= 3 ? '' : 'Name must be at least 3 characters';
  const validateMessage = (msg) =>
    msg.trim().length >= 10 ? '' : 'Message must be at least 10 characters';

  const handleSubmit = async () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const messageError = validateMessage(message);

    const newErrors = { name: nameError, email: emailError, phone: phoneError, message: messageError };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;

    const { data, error } = await supabase
      .from('contact_queries')
      .insert([{ name, email, phone, message, archived: false }]);

    if (error) {
      console.error('Insert error:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});
      navigation.navigate('ThankYou');  
    }
  };

  const animatedError = (field) => (
    <Animatable.View>
      {errors[field] && (
        <Animatable.View
          from={{ opacity: 0, translateY: -5 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -5 }}
          style={styles.errorContainer}
        >
          <Text style={styles.errorText}>{errors[field]}</Text>
        </Animatable.View>
      )}
    </Animatable.View>
  );

  return (
    <LinearGradient colors={['#e0f7fa', '#fff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>We would love to hear from you!</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(val) => {
            setName(val);
            setErrors((prev) => ({ ...prev, name: validateName(val) }));
          }}
        />
        {animatedError('name')}

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          keyboardType="email-address"
          onChangeText={(val) => {
            setEmail(val);
            setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
          }}
        />
        {animatedError('email')}

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(val) => {
            const filtered = val.replace(/[^0-9]/g, '');
            if (filtered.length <= 10) {
              setPhone(filtered);
              setErrors((prev) => ({ ...prev, phone: validatePhone(filtered) }));
            }
          }}
        />
        {animatedError('phone')}

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          value={message}
          multiline
          numberOfLines={4}
          onChangeText={(val) => {
            setMessage(val);
            setErrors((prev) => ({ ...prev, message: validateMessage(val) }));
          }}
        />
        {animatedError('message')}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>

        <View style={styles.contactInfoContainer}>
          <Text style={styles.infoTitle}>Our Address</Text>
          <Text style={styles.infoText}>The Business School, University of Jammu</Text>
          <Text style={styles.infoText}>Jammu, J&K - 180006</Text>

          <Text style={[styles.infoTitle, { marginTop: 12 }]}>Email</Text>
          <Text style={styles.infoText}>mbaadmissions2024@jammuuniversity.ac.in</Text>

          <Text style={[styles.infoTitle, { marginTop: 12 }]}>Phone</Text>
          <Text style={styles.infoText}>0191-2430023</Text>

          <Text style={[styles.infoTitle, { marginTop: 12 }]}>Office Timing</Text>
          <Text style={styles.infoText}>Mon - Fri , 9:00 AM - 5:00 PM</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    marginBottom: 6,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
    marginLeft: 4,
  },
  contactInfoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 6,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default ContactUs;
