import React, { useState } from 'react';
import { View, Text, Button, TextInput, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { Image } from 'react-native';
import backIcon from '../assets/return-apple-icon.png';
import greenIcon from '../assets/camera-green-icon.png';
import redIcon from '../assets/camera-red-icon.png' 

const StepScreen = ({ route }) => {
  const { stepId, projectName, email, projectId } = route.params;
  const [StepDetails, setStepDetails] = useState({});
  const [StepDate, setStepDate] = useState();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    is_done: false, 
    description: "",
    file: null,
    file2: null,
    file3: null,
    file4: null,
    sign_sheet: null,
  });

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch step details
      const stepResponse = await axios.get(`https://www.facilo.co/api/get_step_details/${stepId}/`);
      setStepDetails(stepResponse.data);
      const step  = stepResponse.data;
      const updatedFormData = {
        is_done: step.is_done,
        description: step.description,
        file: step.file || null,
        file2: step.file2 || null,
        file3: step.file3 || null,
        file4: step.file4 || null,
        sign_sheet: step.sign_sheet || null,
      };
      setStepDate(step.todays_date);
      
      setFormData(updatedFormData);

      // Request camera permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [stepId]); // Dependency array includes stepId// Empty dependency array for camera permissions



  const backToHome = () => {
    console.log("Navigate")
    navigation.navigate('Home');
  };
  const openImagePicker = async (fieldName) => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 1,
      });  
      if (!result.cancelled) {
        // Update the formData with the base64 data directly
        setFormData({ ...formData, [fieldName]: result.assets[0].base64 });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleEditStep = async () => {
    navigation.navigate('Home');
    try {
      const dataToSend = {
        is_done: formData.is_done.toString(),
        description: formData.description,
      };

      // Append base64 fields only if they are not null
      Object.keys(formData).forEach((fieldName) => {
        if (fieldName.startsWith('file') && formData[fieldName] || fieldName.startsWith('sign_sheet') && formData[fieldName] ) {
          dataToSend[fieldName] = formData[fieldName];
        }
      });

      const response = await axios.post(`https://www.facilo.co/api/edit-step/${stepId}/`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Step updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  return (
<View style={styles.container}>
  <TouchableOpacity style={styles.logoutButton} onPress={backToHome}>
    <Image source={backIcon} style={{ width: 20, height: 20 }} />
  </TouchableOpacity>
  <Text style={styles.welcomeText}>Assignment</Text>

    <View style={styles.projectContainer}>
    <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>{projectName}</Text>
     <Text style={{ fontSize: 18, marginBottom: 20}}><Text style={{ fontWeight: 'bold'  }}>Date: </Text>{StepDate}</Text>

    <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>Assignment Finished</Text>
    <Switch style={{marginBottom: 10}} value={formData.is_done} onValueChange={(value) => setFormData({ ...formData, is_done: value })} />

    <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: 'bold' }} >Additional Comments:</Text>
    <TextInput style={{ fontSize: 18, marginBottom: 20 }} 
      value={formData.description}
      onChangeText={(text) => setFormData({ ...formData, description: text })}
      placeholder="Enter description"
    />

<View style={styles.imageContainer}>
  <TouchableOpacity onPress={() => openImagePicker('file')}>
    {formData.file ? (
      <Image source={greenIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    ) : (
      <Image source={redIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    )}
    <Text>9am</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => openImagePicker('file2')}>
    {formData.file2 ? (
      <Image source={greenIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    ) : (
      <Image source={redIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    )}
    <Text>11am</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => openImagePicker('file3')}>
    {formData.file3 ? (
      <Image source={greenIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    ) : (
      <Image source={redIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    )}
    <Text>1pm</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => openImagePicker('file4')}>
    {formData.file4 ? (
      <Image source={greenIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    ) : (
      <Image source={redIcon} style={{ width: 30, height: 30, marginRight: 10 }} />
    )}
    <Text>4pm</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => openImagePicker('sign_sheet')}>
    {formData.sign_sheet ? (
      <Image source={greenIcon} style={{ width: 30, height: 30 }} />
    ) : (
      <Image source={redIcon} style={{ width: 30, height: 30 }} />
    )}
    <Text>sheet</Text>
  </TouchableOpacity>
</View>

    {/* Edit Step button to submit the form */}
  </View>
      <TouchableOpacity onPress={handleEditStep}>
        <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold', color: '#206422' }}>Save</Text>
      </TouchableOpacity>
  
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
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,  // Add marginRight to create space after the pictures
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

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default StepScreen;
