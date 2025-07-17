import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Animated, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  const buttonScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleSendCode = async () => {
    animateButton();

    if (emailError || !email) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    setSubmitting(true);

    try {
      const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/auth/request-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (!res.ok) {
        return Alert.alert('Error', data.error || 'Something went wrong');
      }

      Alert.alert('Success', 'Verification code sent to your email');
      navigation.navigate('VerifyCodeScreen', { email }); // Pass email to next screen

    } catch (err) {
      setSubmitting(false);
      Alert.alert('Network Error', 'Unable to reach the server.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 80 })}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Animated.View style={[styles.card, { opacity: cardOpacity }]}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🔒</Text>
          </View>

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            Enter your email to receive a verification code.
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              style={[styles.input, emailError && styles.errorInput]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (!text || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
                  setEmailError('Enter a valid email address');
                } else {
                  setEmailError('');
                }
              }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
            />
            {email.length > 0 && (
              emailError ? (
                <Text style={styles.errorIcon}>⚠️</Text>
              ) : (
                <Text style={styles.successIcon}>✅</Text>
              )
            )}
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>

          <TouchableWithoutFeedback onPress={handleSendCode} disabled={isSubmitting}>
            <Animated.View
              style={[
                styles.button,
                isSubmitting && styles.buttonDisabled,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Sending...' : 'Send Code'}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePlaceholderText: {
    fontSize: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    paddingRight: 35,
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  successIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
    fontSize: 18,
  },
  errorIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
});
