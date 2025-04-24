import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

/**
 * A premium button component with different variants and sizes
 */
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { isDarkMode, theme } = useTheme();

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button];
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyle.push(styles.buttonLarge);
        break;
      default:
        baseStyle.push(styles.buttonMedium);
    }
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push({
          backgroundColor: theme.colors.primary,
          borderColor: 'transparent',
        });
        break;
      case 'secondary':
        baseStyle.push({
          backgroundColor: theme.colors.secondary,
          borderColor: 'transparent',
        });
        break;
      case 'outline':
        baseStyle.push({
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
          borderWidth: 2,
        });
        break;
      case 'text':
        baseStyle.push({
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        });
        break;
    }
    
    // Add disabled styles
    if (disabled) {
      baseStyle.push({
        opacity: 0.6,
      });
    }
    
    // Add full width style
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    // Add custom styles
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text];
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.textSmall);
        break;
      case 'large':
        baseStyle.push(styles.textLarge);
        break;
      default:
        baseStyle.push(styles.textMedium);
    }
    
    // Add variant styles
    switch (variant) {
      case 'primary':
      case 'secondary':
        baseStyle.push({
          color: '#ffffff',
        });
        break;
      case 'outline':
      case 'text':
        baseStyle.push({
          color: theme.colors.primary,
        });
        break;
    }
    
    // Add custom text styles
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? '#ffffff' : theme.colors.primary}
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 160,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button;
