import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface LocationCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * A premium card component for location actions
 */
const LocationCard: React.FC<LocationCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  disabled = false,
  style,
}) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={isDarkMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconContainer}
      >
        <Feather name={icon as any} size={24} color="#FFFFFF" />
      </LinearGradient>
      
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? '#FFFFFF' : '#1a1a1a' },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Feather 
          name="chevron-right" 
          size={20} 
          color={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  arrowContainer: {
    marginLeft: 8,
  },
});

export default LocationCard;
