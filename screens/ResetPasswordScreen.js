import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { email } = useRoute().params;

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      return setError('Both fields are required');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/auth/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return Alert.alert('Error', data.error || 'Password update failed');
      }

      Alert.alert('Success', 'Your password has been updated.');
      navigation.navigate('Login'); // Or wherever you want to go

    } catch (err) {
      setLoading(false);
      Alert.alert('Network Error', 'Unable to reset password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set a New Password</Text>

      <TextInput
        placeholder="New Password"
        secureTextEntry
        style={[styles.input, error && styles.errorInput]}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={[styles.input, error && styles.errorInput]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={handleReset} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Reset Password'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
