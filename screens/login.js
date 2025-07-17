import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin() {
    if (!email || !password) {
      return Alert.alert('Error', 'Please enter both email and password');
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Login Error', error.message);
      } else {
        navigation.replace('clickform');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleEmailLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('signup')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0ea5e9"
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1273c4',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 14,
    marginVertical: 8,
    fontSize: 16,
    elevation: 2,
  },
  link: {
    color: '#1273c4',
    marginVertical: 10,
    fontSize: 14,
  },
  button: {
    width: '90%',
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  or: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    fontWeight: '600',
  },
});
