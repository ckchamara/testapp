import React, { useEffect } from 'react';
import { View, StyleSheet, Linking, Platform, Share, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import useLocation from '../hooks/useLocation';
import { RootStackParamList } from '../types/navigation';
import LocationCard from '../components/LocationCard';
import PremiumSpeedDisplay from '../components/PremiumSpeedDisplay';
import ThemeToggle from '../components/ThemeToggle';

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
  const { isDarkMode, toggleTheme, theme } = useTheme();

  // Update header with theme colors
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.card,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        borderBottomWidth: 0,
      },
      headerTintColor: theme.colors.primary,
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
        letterSpacing: 0.5,
      },
      headerRight: () => (
        <ThemeToggle compact style={styles.headerThemeToggle} />
      ),
    });
  }, [navigation, theme, isDarkMode]);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View style={styles.speedContainer}>
        <PremiumSpeedDisplay
          speed={speed}
          loading={!location && !errorMsg}
          error={errorMsg || (permissionStatus === 'denied' ? 'Location permission denied' : null)}
        />
      </View>

      <View style={styles.cardsContainer}>
        <LocationCard
          title="Open in Maps"
          subtitle="View your real-time location in your maps app"
          icon="map-pin"
          onPress={openInMaps}
          disabled={!location}
        />

        <LocationCard
          title="Interactive Map"
          subtitle="View your location on an interactive map"
          icon="map"
          onPress={() => location && navigation.navigate('Map', { location })}
          disabled={!location}
        />

        <LocationCard
          title="Share Location"
          subtitle="Share your current location with others"
          icon="share-2"
          onPress={shareLocation}
          disabled={!location}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerThemeToggle: {
    marginRight: 16,
  },
  speedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardsContainer: {
    width: '90%',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default HomeScreen;
