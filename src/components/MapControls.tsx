import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
}

/**
 * Premium map controls component
 */
const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onRecenter,
}) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onZoomIn} style={styles.buttonContainer}>
        <LinearGradient
          colors={isDarkMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={onZoomOut} style={styles.buttonContainer}>
        <LinearGradient
          colors={isDarkMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Feather name="minus" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRecenter} style={styles.buttonContainer}>
        <LinearGradient
          colors={isDarkMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Feather name="crosshair" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 100,
    zIndex: 1,
  },
  buttonContainer: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapControls;
