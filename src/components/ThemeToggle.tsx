import React from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  style?: ViewStyle;
  compact?: boolean;
}

/**
 * A premium theme toggle component
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ style, compact = false }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  if (compact) {
    return (
      <Switch
        trackColor={{ 
          false: 'rgba(0, 0, 0, 0.1)', 
          true: 'rgba(255, 215, 0, 0.3)' 
        }}
        thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
        ios_backgroundColor="rgba(0, 0, 0, 0.1)"
        onValueChange={toggleTheme}
        value={isDarkMode}
        style={style}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.05)',
          borderColor: isDarkMode ? theme.colors.border : theme.colors.border,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: isDarkMode ? theme.colors.text : theme.colors.text },
        ]}
      >
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        trackColor={{ 
          false: 'rgba(0, 0, 0, 0.1)', 
          true: 'rgba(255, 215, 0, 0.3)' 
        }}
        thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
        ios_backgroundColor="rgba(0, 0, 0, 0.1)"
        onValueChange={toggleTheme}
        value={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
  },
});

export default ThemeToggle;
