import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface LocationActionButtonProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * A premium action button for location-related actions
 */
const LocationActionButton: React.FC<LocationActionButtonProps> = ({
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
          backgroundColor: isDarkMode ? theme.colors.card : theme.colors.card,
          borderColor: isDarkMode ? theme.colors.border : theme.colors.border,
          opacity: disabled ? 0.6 : 1,
          ...theme.shadows.sm,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={[
          styles.iconContainer, 
          { 
            backgroundColor: isDarkMode 
              ? 'rgba(255, 215, 0, 0.1)' 
              : 'rgba(255, 215, 0, 0.1)' 
          }
        ]}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? theme.colors.text : theme.colors.text },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: isDarkMode ? theme.colors.textSecondary : theme.colors.textSecondary },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default LocationActionButton;
