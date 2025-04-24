import React, { useEffect } from 'react';
import { Text, View, Button, Switch, Linking, Platform, Share } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { useTheme } from '../contexts/ThemeContext';
import useLocation from '../hooks/useLocation';
import styles from '../styles/styles';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

/**
 * Home screen component displaying real-time speed and location options
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Use our custom hooks
  const { location, speed, errorMsg, permissionStatus } = useLocation();
  const { isDarkMode, toggleTheme, setDarkMode, theme } = useTheme();

  // Update header with theme colors
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.card,
      },
      headerTintColor: theme.colors.text,
    });
  }, [navigation, theme]);

  /**
   * Open the device's native maps app with current location
   */
  const openInMaps = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${latitude},${longitude}`;
      const label = 'My Current Location';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      if (url) Linking.openURL(url);
    }
  };

  /**
   * Share current location via the device's share dialog
   */
  const shareLocation = async () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      try {
        await Share.share({
          message: `Here is my current location: ${mapUrl}`,
          url: mapUrl,
          title: 'My Location',
        });
      } catch (error) {
        console.error('Error sharing location:', error);
      }
    }
  };

  // Prepare display text based on current state
  let speedText = 'Waiting for speed...';
  if (errorMsg) {
    speedText = errorMsg;
  } else if (permissionStatus === 'denied') {
    speedText = 'Location permission denied. Please enable location services.';
  } else if (location) {
    speedText = `Speed: ${speed.toFixed(1)} km/h`;
  }

  // Apply theme styles
  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.switchContainer}>
        <Text style={textStyle}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
      <Text style={[styles.speedText, textStyle]}>{speedText}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Open Real-time Location in Maps"
          onPress={openInMaps}
          disabled={!location}
          color={isDarkMode ? theme.colors.primary : undefined}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Show My Location on Map"
          onPress={() => location && navigation.navigate('Map', { location })}
          disabled={!location}
          color={isDarkMode ? theme.colors.primary : undefined}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Share Location"
          onPress={shareLocation}
          disabled={!location}
          color={isDarkMode ? theme.colors.primary : undefined}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
