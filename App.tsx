import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

// Import theme provider and types
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { RootStackParamList } from './src/types/navigation';

// Create stack navigator
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main navigation component
 */
const AppNavigator = () => {
  const { theme, isDarkMode } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#f2f2f2'}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'GPS Speed Tracker' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'My Location Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Root App component wrapped with ThemeProvider
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
