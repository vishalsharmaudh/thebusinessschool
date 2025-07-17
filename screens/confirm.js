import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    Alert.alert('Success', 'Your password has been reset successfully');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>🔐 Reset Your Password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe', // light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    width: width * 0.9,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#60a5fa', // light blue shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0284c7', // bold blue
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f9ff',
    color: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#bae6fd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#38bdf8', // vibrant light blue
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewPasswordScreen;