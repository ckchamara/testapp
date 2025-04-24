import { StyleSheet, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // Add subtle gradient overlay effect
    backgroundColor: 'transparent',
  },
  lightContainer: {
    backgroundColor: '#ffffff',  // Brighter white for premium feel
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightText: {
    color: '#1a1a1a',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  darkText: {
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  lightHeaderText: {
    color: '#1a1a1a',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif-medium',
    marginRight: 8,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  darkHeaderText: {
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif-medium',
    marginRight: 8,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  speedText: {
    fontSize: 32,
    fontWeight: '600',
    marginVertical: 40,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  buttonContainer: {
    marginVertical: 12,
    width: '85%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  switchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  premiumButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  premiumButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFD700',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export const mapDarkStyle = [
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

export default styles;
