import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Card from './Card';

interface SpeedDisplayProps {
  speed: number;
  loading?: boolean;
  error?: string | null;
  style?: ViewStyle;
}

/**
 * A premium speed display component
 */
const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ 
  speed, 
  loading = false, 
  error = null, 
  style 
}) => {
  const { isDarkMode, theme } = useTheme();

  const getSpeedColor = () => {
    if (speed < 20) return theme.colors.success;
    if (speed < 60) return theme.colors.info;
    if (speed < 100) return theme.colors.warning;
    return theme.colors.error;
  };

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Waiting for speed...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={[styles.speedValue, { color: getSpeedColor() }]}>
          {speed.toFixed(1)}
        </Text>
        <Text style={[styles.speedUnit, { color: theme.colors.textSecondary }]}>
          km/h
        </Text>
      </View>
    );
  };

  return (
    <Card 
      variant="elevated" 
      style={[
        styles.container, 
        { 
          backgroundColor: isDarkMode 
            ? 'rgba(30, 30, 30, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
        },
        style
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.textSecondary }]}>
        CURRENT SPEED
      </Text>
      {renderContent()}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginVertical: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  speedValue: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 72,
  },
  speedUnit: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: 8,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SpeedDisplay;
