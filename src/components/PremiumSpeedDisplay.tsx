import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

interface PremiumSpeedDisplayProps {
  speed: number;
  loading?: boolean;
  error?: string | null;
}

/**
 * A premium speed display component with animations
 */
const PremiumSpeedDisplay: React.FC<PremiumSpeedDisplayProps> = ({ 
  speed, 
  loading = false, 
  error = null
}) => {
  const { isDarkMode, theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Animate the speed display when it mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.elastic(1.2),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Get color based on speed
  const getSpeedColor = () => {
    if (speed < 20) return ['#4CAF50', '#8BC34A']; // Green for slow speeds
    if (speed < 60) return ['#2196F3', '#03A9F4']; // Blue for medium speeds
    if (speed < 100) return ['#FF9800', '#FFC107']; // Orange for fast speeds
    return ['#F44336', '#E91E63']; // Red for very fast speeds
  };

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.errorText, { color: isDarkMode ? '#FF6B6B' : '#D32F2F' }]}>
            {error}
          </Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.loadingText, { color: isDarkMode ? '#BBBBBB' : '#757575' }]}>
            Waiting for speed...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <LinearGradient
          colors={getSpeedColor()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.speedValueContainer}
        >
          <Text style={styles.speedValue}>
            {speed.toFixed(1)}
          </Text>
        </LinearGradient>
        <Text style={[styles.speedUnit, { color: isDarkMode ? '#BBBBBB' : '#757575' }]}>
          km/h
        </Text>
      </View>
    );
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <Text style={[
        styles.title, 
        { color: isDarkMode ? theme.colors.primary : theme.colors.primary }
      ]}>
        CURRENT SPEED
      </Text>
      {renderContent()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    width: '90%',
    maxWidth: 350,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedValueContainer: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 8,
  },
  speedValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  speedUnit: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default PremiumSpeedDisplay;
