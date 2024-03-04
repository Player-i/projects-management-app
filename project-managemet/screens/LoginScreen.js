import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.55.5.124:8000/api/email-login/', {
        username: email, // Assuming email is the username for your login
        password: password,
      });
      console.log(response.data);
      console.log(response.data.detail)
      if (response.data.detail == 'Login successful') {

        // Save user email to login automatically:
        await AsyncStorage.setItem('userEmail', email);

        // Navigate to the Home screen upon successful login
        navigation.navigate('Home', { email: email });
      }
      // Handle successful login, update UI, navigate to the next screen, etc.
      // For example, you can use navigation libraries like React Navigation
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error, show error message, etc.
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={{  fontSize: 24, marginBottom: 20 }}>Sign in</Text>

        <View style={styles.textInputContainer}>
  <TextInput
    style={styles.textInput}
    placeholder="Email"
    value={email}
    onChangeText={(text) => setEmail(text)}
  />
</View>
<View style={styles.textInputContainer}>
  <TextInput
    style={styles.textInput}
    placeholder="Password"
    value={password}
    onChangeText={(text) => setPassword(text)}
    secureTextEntry
  />
</View>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.signUpButton} onPress={handleNavigateToRegister}>
          <Text style={styles.signUpButtonText}>Do not have an account? <Text style={styles.signUpBoldText}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#206422',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.1)', // Subtle grey background
    borderRadius: 20,
  },
  textInput: {
    color: 'rgba(0, 0, 0, 0.7)', // Set the text color with opacity
    padding: 10,
    borderRadius: 5,
  },

  signInButton: {
    backgroundColor: '#206422',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  signInButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16, 
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light grey color with 10% opacity
    marginVertical: 15,
  },
  signUpButton: {

  },
  signUpButtonText: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 12,
  },
  signUpBoldText: {
    fontWeight: 'bold',
  },
});
export default LoginScreen;
