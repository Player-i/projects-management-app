import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Validate password match on the client side
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://10.55.5.124:8000/api/user-registration/', {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      });
      console.log(response.data);
      console.log(response.data.detail)
      if (response.data.detail == 'Registration and login successful') {

        // Save user email in AsyncStorage
      await AsyncStorage.setItem('userEmail', email);

        // Navigate to the Home screen upon successful login
        navigation.navigate('Home', { email: email });
      }
      // Handle successful registration, update UI, navigate to the login screen, etc.
      // For example, you can use navigation libraries like React Navigation
      // navigation.navigate('Login');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration error, show error message, etc.
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.heading}>Sign up</Text>

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
          placeholder="Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password1}
          onChangeText={(text) => setPassword1(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.divider} />
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInButtonText}>
          <Text >Already have an account? </Text> <Text style={styles.signInBoldText}>Sign in </Text>
        </Text>
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
heading: {
  fontFamily: 'SFProDisplay-Bold',
  fontSize: 24,
  marginBottom: 20,
},
textInputContainer: {
  marginBottom: 10,
  backgroundColor: 'rgba(128, 128, 128, 0.1)',
  borderRadius: 20,
},
textInput: {
  color: 'rgba(0, 0, 0, 0.7)',
  padding: 10,
  borderRadius: 5,
},
registerButton: {
  backgroundColor: '#206422',
  padding: 10,
  borderRadius: 20,
  marginTop: 10,
},
registerButtonText: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize: 16,
},
divider: {
  height: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  marginVertical: 8,
},
signInButton: {
  marginTop: 20,

},
signInButtonText: {
  color: '#000000',
  textAlign: 'left',
  fontSize: 12,
},
signInBoldText: {
  fontWeight: 'bold',
},
});

export default RegisterScreen;
