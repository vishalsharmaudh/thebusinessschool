import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { supabase } from '../supabaseClient';

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [authError, setAuthError] = useState('');

  useFocusEffect(
    useCallback(() => {
      setUserId('');
      setPassword('');
      setUserError('');
      setPassError('');
      setAuthError('');
    }, [])
  );

  const handleLogin = () => {
    setUserError('');
    setPassError('');
    setAuthError('');

    let valid = true;

    if (!userId.trim()) {
      setUserError('User ID is required');
      valid = false;
    }

    if (!password.trim()) {
      setPassError('Password is required');
      valid = false;
    }

    if (!valid) return;

    // Hardcoded login credentials
    const ADMIN_USERNAME = 'aubidparrey';
    const ADMIN_PASSWORD = 'Aubid@#123';

    if (userId === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      navigation.navigate('AdminDashboard'); // success
    } else {
      setAuthError('Invalid User ID or Password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="User Id"
        placeholderTextColor="#ccc"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />
      {userError ? <Text style={styles.error}>{userError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {passError ? <Text style={styles.error}>{passError}</Text> : null}
      {authError ? <Text style={styles.error}>{authError}</Text> : null}

      {/* <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1273c4',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'left',
    elevation: 3,
    shadowColor: '#0ea5e9',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  error: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: -8,
  },
  forgotPassword: {
    color: '#1273c4',
    marginVertical: 10,
    fontSize: 14,
  },
  button: {
    width: '90%',
    backgroundColor: '#0ea5e9',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#0ea5e9',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
