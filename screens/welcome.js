import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current; // Logo floating
  const fadeTitle = useRef(new Animated.Value(0)).current; // Title fade-in
  const fadeSubtitle = useRef(new Animated.Value(0)).current; // Subtitle fade-in
  const fadeTagline = useRef(new Animated.Value(0)).current; // Tagline fade-in
  const pulseButton = useRef(new Animated.Value(1)).current; // Button pulse

  useEffect(() => {
    // Logo floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Text fade-in animations
    Animated.timing(fadeTitle, {
      toValue: 1,
      duration: 1200,
      delay: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeSubtitle, {
      toValue: 1,
      duration: 1200,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeTagline, {
      toValue: 1,
      duration: 1000,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Button pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseButton, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseButton, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim, fadeTitle, fadeSubtitle, fadeTagline, pulseButton]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  // Fallback for navigation
  const handleNavigation = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('home');
    } else {
      alert('Navigation not set up. Please add a HomeScreen in your navigation stack.');
    }
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.content}>
        {/* Animated Logo */}
        <Animated.View style={[styles.logoContainer, { transform: [{ translateY }] }]}>
          <LinearGradient
            colors={['#1E3A8A', '#64748B']}
            style={styles.logo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoTextPrimary}>The Business School</Text>
            <Text style={styles.logoTextSecondary}>University of Jammu</Text>
          </LinearGradient>
          <View style={styles.logoGlow} />
        </Animated.View>

        {/* Animated Text */}
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.title, { opacity: fadeTitle }]}>
            Welcome to
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeSubtitle }]}>
            The Business School
          </Animated.Text>
          <Animated.Text style={[styles.tagline, { opacity: fadeTagline }]}>
            Where Future Leaders Are Made
          </Animated.Text>
        </View>

        {/* Animated Button */}
        <Animated.View
          style={[styles.buttonContainer, { transform: [{ scale: pulseButton }] }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigation}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#ff8a00', '#ff5e00']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.arrowIcon}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(30, 58, 138, 0.15)',
    zIndex: 1,
  },
  logoTextPrimary: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  logoTextSecondary: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    marginTop: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  button: {
    width: width * 0.7,
    borderRadius: 30,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#ff5e00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  arrowIcon: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});