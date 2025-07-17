import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function VerifyCodeScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const handleVerify = async () => {
    if (code.length !== 6) {
      return Alert.alert('Invalid Code', 'Please enter the 6-digit code.');
    }

    setLoading(true);
    try {
      const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/auth/verify-code`
, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return Alert.alert('Error', data.error || 'Code verification failed');
      }

      Alert.alert('Success', 'Code verified');
      navigation.navigate('ResetPasswordScreen', { email });
    } catch (err) {
      setLoading(false);
      Alert.alert('Network Error', 'Could not verify the code. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.description}>
        We sent a 6-digit code to your email. Please enter it below to continue.
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        placeholder="123456"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity onPress={handleVerify} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  description: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
