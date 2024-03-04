import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
  const [email, setEmail] = useState(route.params?.email || '');
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

 

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        let userEmail;
  
        // Check if email is available in route parameters, otherwise, check AsyncStorage
        if (route.params?.email) {
          userEmail = route.params.email;
        } else {
          userEmail = await AsyncStorage.getItem('userEmail');
          // Update the state with the fetched email
          setEmail(userEmail);
        }
  
        if (userEmail) {
          const response = await axios.get(`http://10.55.5.124:8000/api/get-user-projects/${userEmail}/`);
          setProjects(response.data);
          console.log(response.data);
  
          // Update the stored email in AsyncStorage
          await AsyncStorage.setItem('userEmail', userEmail);
        } else {
          console.error('Email not available in route parameters or AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };
  
    fetchUserProjects();
  }, [route.params?.email]); // Include route.params.email in the dependency array
  
  const handleProjectClick = (projectId) => {
    // Navigate to the ProjectScreen with the selected project ID
    console.log("Navigate")
    navigation.navigate('Project', { projectId: projectId, email: email  });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://10.55.5.124:8000/api/logout/${email}/`);
      console.log(response.data);
      // Handle successful logout, update UI, navigate to the login screen, etc.
      await AsyncStorage.removeItem('userEmail');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout error, show error message, etc.
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Jobs</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {projects.map((project) => (
          <TouchableOpacity key={project.id} onPress={() => handleProjectClick(project.id)}>
            <View style={styles.projectContainer}>
              <Text style={{ fontSize: 24, marginBottom: 20 }}>{project.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 80,
    alignItems: 'center', // Center content horizontally within the screen
  },
  welcomeText: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center', // Center content horizontally within the ScrollView
  },
  projectContainer: {
    width: 300, // Set a fixed width for the square container
    height: 150, // Set a fixed height for the square container
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20, // Set border radius to create round corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  logoutText: {
    color: '#206422',
    fontSize: 16,
  },

});
export default HomeScreen;
