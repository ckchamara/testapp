import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
  withPadding?: boolean;
}

/**
 * A container component for consistent layout
 */
const Container: React.FC<ContainerProps> = ({
  children,
  style,
  useSafeArea = true,
  withPadding = true,
}) => {
  const { isDarkMode, theme } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: theme.colors.background },
    withPadding && styles.withPadding,
    style,
  ];

  if (useSafeArea) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={containerStyle}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  withPadding: {
    padding: 16,
  },
});

export default Container;
