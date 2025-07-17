import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ThankYou = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        useNativeDriver
        style={styles.innerContainer}
      >
        <Image
          source={require('../assets/tick1.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.title}>Message Received 😊</Text>
        <Text style={styles.message}>
          We’ll be replying to your query via email, so please keep an eye on your inbox.
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffffdd',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },
});

export default ThankYou;
