import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

/**
 * A premium card component with different variants
 */
const Card: React.FC<CardProps> = ({ children, style, variant = 'default' }) => {
  const { isDarkMode, theme } = useTheme();
  
  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return [
          styles.card,
          {
            backgroundColor: isDarkMode ? theme.colors.card : theme.colors.card,
            borderColor: 'transparent',
            ...theme.shadows.md,
          },
          style,
        ];
      case 'outlined':
        return [
          styles.card,
          {
            backgroundColor: 'transparent',
            borderColor: isDarkMode ? theme.colors.border : theme.colors.border,
            borderWidth: 1,
          },
          style,
        ];
      default:
        return [
          styles.card,
          {
            backgroundColor: isDarkMode ? theme.colors.card : theme.colors.card,
            borderColor: 'transparent',
          },
          style,
        ];
    }
  };

  return <View style={getCardStyle()}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
  },
});

export default Card;
