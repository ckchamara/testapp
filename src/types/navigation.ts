import * as Location from 'expo-location';

// Define type for stack navigator params
export type RootStackParamList = {
  Home: undefined; // No params expected for Home
  Map: { location: Location.LocationObject }; // Params for Map screen
};
