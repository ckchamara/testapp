import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Platform, StyleSheet, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../types/navigation';
import ThemeToggle from '../components/ThemeToggle';
import MapControls from '../components/MapControls';

// Import MapView conditionally to handle web platform
const MapView = Platform.OS !== 'web' ? require('react-native-maps').default : null;
const { Marker, PROVIDER_GOOGLE } =
  Platform.OS !== 'web' ? require('react-native-maps') : { Marker: null, PROVIDER_GOOGLE: null };

// Map dark style
const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface MapScreenProps {
  route: MapScreenRouteProp;
  navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<MapScreenProps> = ({ route, navigation }) => {
  const { location } = route.params;
  const { isDarkMode, theme } = useTheme();
  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Reference to the map component
  const mapRef = useRef<typeof MapView>(null);

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

  // Update the map when location changes
  useEffect(() => {
    if (mapRef.current && location && MapView) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  }, [location]);

  // Map control handlers
  const handleZoomIn = () => {
    if (mapRef.current && MapView) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && MapView) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion);
    }
  };

  const handleRecenter = () => {
    if (mapRef.current && location && MapView) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion);
    }
  };

  // Handle web platform
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          Map is not available on web.
        </Text>
      </View>
    );
  }

  // Handle missing location data
  if (!location) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          Location data not available.
        </Text>
      </View>
    );
  }

  // Render map if available
  return MapView ? (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={'standard'}
        customMapStyle={isDarkMode ? mapDarkStyle : []}
        initialRegion={region}
        showsUserLocation={true} // Highlight user location for premium experience
        showsCompass={true} // Add compass for better navigation
        showsTraffic={true} // Display traffic for enhanced usability
        showsBuildings={true} // Show 3D buildings for premium look
        showsIndoors={true} // Show indoor maps where available
        showsPointsOfInterest={true} // Show points of interest
        onRegionChangeComplete={setRegion} // Update region state when map is moved
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="My Location"
          description={`Speed: ${(location.coords.speed ?? 0 * 3.6).toFixed(1)} km/h`}
          pinColor={isDarkMode ? 'gold' : 'orange'} // Use premium colors for marker
        />
      </MapView>

      {/* Add premium map controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
      />
    </View>
  ) : (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        MapView component is not available.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerThemeToggle: {
    marginRight: 16,
  },
});

export default MapScreen;
