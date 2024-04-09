import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'; // Your new RegisterScreen component
import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import StepScreen from './screens/StepScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen'

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Project" component={ProjectScreen} options={{ headerShown: false, gestureEnabled: false }} /> 
        <Stack.Screen name="Step" component={StepScreen} options={{ headerShown: false, gestureEnabled: false }} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
