import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(187, 134, 252)', // Example purple accent
    background: '#121212',
    card: '#1e1e1e', // Slightly lighter background for cards/headers
    text: '#ffffff',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 122, 255)', // Default iOS blue
    background: '#f2f2f2',
    card: '#ffffff',
    text: '#000000',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};
