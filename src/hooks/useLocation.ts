import { useState, useEffect, useRef, useCallback } from 'react';
import * as Location from 'expo-location';

/**
 * Custom hook for real-time location tracking
 * @returns Location data, speed in km/h, and any error messages
 */
const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const isMounted = useRef<boolean>(true);

  /**
   * Request location permissions from the user
   */
  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== 'granted') {
        setErrorMsg('Location permission denied. Please enable location services to use this app.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setErrorMsg('Failed to request location permission.');
      return false;
    }
  }, []);

  /**
   * Start watching location with high accuracy for real-time updates
   */
  const startLocationTracking = useCallback(async () => {
    try {
      // Configure for real-time updates with highest possible accuracy
      const subscription = await Location.watchPositionAsync(
        {
          // Use highest accuracy for real-time speed tracking
          accuracy: Location.Accuracy.BestForNavigation,
          // Remove fixed time interval to get updates as fast as possible
          // Set minimal distance threshold to get frequent updates
          distanceInterval: 0,
          // Get updates as soon as they're available
          timeInterval: 0,
        },
        (newLocation: Location.LocationObject) => {
          if (isMounted.current) {
            setLocation(newLocation);

            // Calculate speed in km/h from m/s
            // Ensure speed is a number before calculation
            const currentSpeed = newLocation.coords.speed ?? 0;
            // Convert m/s to km/h (multiply by 3.6)
            setSpeed(Math.max(0, currentSpeed * 3.6));
          }
        }
      );

      if (isMounted.current) {
        locationSubscription.current = subscription;
      } else {
        subscription.remove();
      }
    } catch (error) {
      console.error('Error starting location tracking:', error);
      setErrorMsg('Failed to start location tracking.');
    }
  }, []);

  // Initialize location tracking when component mounts
  useEffect(() => {
    isMounted.current = true;

    const initializeLocationTracking = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        await startLocationTracking();
      }
    };

    initializeLocationTracking();

    // Cleanup on unmount
    return () => {
      isMounted.current = false;
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [requestLocationPermission, startLocationTracking]);

  return {
    location,
    speed,
    errorMsg,
    permissionStatus,
    requestLocationPermission
  };
};

export default useLocation;
