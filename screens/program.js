import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

const programs = [
  {
    title: 'MBA (Master of Business Administration)',
    seats: 69,
    seatsDisplay: 'Total Seats: 60 + 9 (Self-Finance) = 69',
    description: 'A flagship two-year postgraduate program designed to prepare students for leadership roles in business and management.',
    icon: 'business-center',
    gradient: ['#dc2626', '#f59e0b']
  },
  {
    title: 'PGDBM (Post Graduate Diploma in Business Management)',
    seats: 52,
    seatsDisplay: 'Total Seats: 45 + 7 (Self-Finance) = 52',
    description: 'A one-year diploma program aimed at providing a solid foundation in core business disciplines for aspiring professionals.',
    icon: 'school',
    gradient: ['#0284c7', '#06b6d4']
  },
  {
    title: 'EMBA (Executive MBA)',
    seats: 20,
    seatsDisplay: 'Total Seats: 20 (Self-Finance)',
    description: 'Tailored for working professionals, this program enhances managerial skills and career advancement through part-time study.',
    icon: 'work-outline',
    gradient: ['#16a34a', '#65a30d']
  },
  {
    title: 'Ph.D (Doctor of Philosophy)',
    seats: 74,
    seatsDisplay: 'Total Registered: 74 (as on date)',
    description: 'Research-intensive doctoral program focused on advanced topics in business, preparing candidates for academic and consulting roles.',
    icon: 'emoji-objects',
    gradient: ['#7c3aed', '#db2777']
  },
];

const totalSeats = programs.reduce((sum, program) => sum + program.seats, 0);

const AnimatedCard = ({ program, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 120),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, translateYAnim, index]);

  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Card style={styles.cardContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.98)', 'rgba(241, 245, 249, 0.96)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardInner}
          >
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
                  {program.title}
                </Text>
                <Text style={styles.seats} numberOfLines={1}>
                  {program.seatsDisplay}
                </Text>
                <Text style={styles.description} numberOfLines={3}>
                  {program.description}
                </Text>
              </View>
              <View style={styles.chartContainer}>
                <LinearGradient
                  colors={program.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.chartGradient}
                >
                  <AnimatedCircularProgress
                    size={isSmallScreen ? 85 : 95}
                    width={isSmallScreen ? 8 : 10}
                    fill={(program.seats / totalSeats) * 100}
                    tintColor={program.gradient[0]}
                    backgroundColor="rgba(255, 255, 255, 0.85)"
                    rotation={0}
                    lineCap="round"
                    duration={800}
                  >
                    {() => (
                      <View style={styles.chartInner}>
                        <Text
                          style={[styles.chartText, { color: program.gradient[0] }]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {program.seats}
                        </Text>
                        <MaterialIcons
                          name={program.icon}
                          size={isSmallScreen ? 18 : 20}
                          color={program.gradient[0]}
                          style={styles.chartIcon}
                        />
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ProgramsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#1e3a8a', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <Text
            style={styles.header}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Programs We Offer
          </Text>
        </LinearGradient>

        {programs.map((program, index) => (
          <AnimatedCard key={index} program={program} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingVertical: isSmallScreen ? 28 : 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  cardInner: {
    padding: isSmallScreen ? 10 : 12,
    borderRadius: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: isSmallScreen ? 8 : 10,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartGradient: {
    borderRadius: isSmallScreen ? 40 : 45,
    padding: isSmallScreen ? 5 : 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  chartInner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: isSmallScreen ? 30 : 35,
    padding: isSmallScreen ? 10 : 12,
    width: isSmallScreen ? 65 : 75,
    height: isSmallScreen ? 65 : 75,
  },
  chartText: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  chartIcon: {
    marginTop: 4,
  },
  title: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  seats: {
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
  },
  description: {
    fontSize: isSmallScreen ? 10 : 11,
    color: '#4b5563',
    lineHeight: isSmallScreen ? 14 : 16,
  },
});

export default ProgramsScreen;