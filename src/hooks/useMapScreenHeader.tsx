import { useEffect } from 'react';
import { View, Switch, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/styles';

interface UseMapScreenHeaderProps {
  navigation: StackNavigationProp<any, any>;
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

/**
 * Custom hook to configure the map screen header with theme toggle
 */
const useMapScreenHeader = ({ navigation, isDarkMode, setDarkMode }: UseMapScreenHeaderProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#121212' : '#f2f2f2',
      },
      headerTintColor: isDarkMode ? '#ffffff' : '#000000',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Text style={isDarkMode ? styles.darkHeaderText : styles.lightHeaderText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setDarkMode}
            value={isDarkMode}
          />
        </View>
      ),
    });
  }, [navigation, isDarkMode, setDarkMode]);

  return null;
};

export default useMapScreenHeader;
