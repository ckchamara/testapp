import React, { useEffect, useRef } from 'react';
import { Text, View, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { useTheme } from '../contexts/ThemeContext';
import styles, { mapDarkStyle } from '../styles/styles';
import { RootStackParamList } from '../types/navigation';
import useMapScreenHeader from '../hooks/useMapScreenHeader';

// Import MapView conditionally to handle web platform
const MapView = Platform.OS !== 'web' ? require('react-native-maps').default : null;
const { Marker, PROVIDER_GOOGLE } =
  Platform.OS !== 'web' ? require('react-native-maps') : { Marker: null, PROVIDER_GOOGLE: null };

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface MapScreenProps {
  route: MapScreenRouteProp;
  navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<MapScreenProps> = ({ route, navigation }) => {
  const { location } = route.params;
  const { isDarkMode, theme, setDarkMode } = useTheme();

  // Setup the header with theme toggle
  useMapScreenHeader({ navigation, isDarkMode, setDarkMode });

  // Reference to the map component
  const mapRef = useRef<typeof MapView>(null);

  // Update the map when location changes
  useEffect(() => {
    if (mapRef.current && location && MapView) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  // Handle web platform
  if (Platform.OS === 'web') {
    const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const textStyle = isDarkMode ? styles.darkText : styles.lightText;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={textStyle}>Map is not available on web.</Text>
      </View>
    );
  }

  // Handle missing location data
  if (!location) {
    const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const textStyle = isDarkMode ? styles.darkText : styles.lightText;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={textStyle}>Location data not available.</Text>
      </View>
    );
  }

  // Render map if available
  return MapView ? (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      mapType={'standard'}
      customMapStyle={isDarkMode ? mapDarkStyle : []}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={false}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="My Location"
        description={`Speed: ${(location.coords.speed ?? 0 * 3.6).toFixed(1)} km/h`}
        pinColor={isDarkMode ? 'yellow' : 'red'}
      />
    </MapView>
  ) : (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>MapView component is not available.</Text>
    </View>
  );
};

export default MapScreen;
