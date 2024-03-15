import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const isUserProjectManager = await AsyncStorage.getItem('isProjectManager')
  
        if (userEmail) {
          // If there is a saved email, navigate to the Home screen
          navigation.navigate('Home', { email: userEmail, isProjectManager: isUserProjectManager });
        } else {
          // If there is no saved email, navigate to the Login screen
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking user email:', error);
      }
    };

    checkUserEmail();
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default AuthLoadingScreen;
