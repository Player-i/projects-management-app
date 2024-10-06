import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import backIcon from '../assets/return-apple-icon.png';

const ProjectScreen = ({ route }) => {
  const { projectId, email } = route.params;
  const [projectDetails, setProjectDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://10.55.6.135:8000/api/project-details/${projectId}/${email}/`);
        setProjectDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const { project, steps } = projectDetails;

  const handleStepClick = (stepId, projectName) => {
    // Navigate to the StepScreen with the selected step ID
    navigation.navigate('Step', { stepId: stepId, projectName: projectName, email: email, projectId: projectId });
  };
    const backToHome = () => {
    console.log("Navigate")
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
         <TouchableOpacity style={styles.logoutButton} onPress={backToHome}>
      <Image source={backIcon} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
    <SafeAreaView style={styles.projectContainer}>

      <Text style={styles.projectTitle}>{project && project.name}</Text>
      <Text style={styles.projectDescription}>{project && project.description}</Text>
      <Text style={styles.projectDescription}> Equipment & Supplies: {project && project.equipment}</Text>
      <Text style={styles.projectDescription}>Vehicle: {project && project.vehicle}</Text>
      {/* Display other project details as needed */}
    </SafeAreaView>

    {/* Steps */}
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}></Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
        {steps &&
          steps.map((step) => (
            <TouchableOpacity key={step.id} onPress={() => handleStepClick(step.id, project.name)}>
              <View style={styles.stepContainer}>
                <Text style={styles.containerText}>Assignment: {step.description}</Text>
                <Text style={styles.containerText}>Assigned to: {step.assigned_to}</Text>
                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>Assignment Finished</Text>
                <Switch style={{marginBottom: 10}} value={step.is_done} disabled />
                {/* Display other step details as needed */}

                  {/* Display images if available */}
                  <View style={styles.imageContainer}>
                    {step.file && <Image source={{ uri: `http://10.55.6.135:8000${step.file}` }} style={styles.image} />}
                    {step.file2 && <Image source={{ uri: `http://10.55.6.135:8000${step.file2}` }} style={styles.image} />}
                    {step.file3 && <Image source={{ uri: `http://10.55.6.135:8000${step.file3}` }} style={styles.image} />}
                    {step.file4 && <Image source={{ uri: `http://10.55.6.135:8000${step.file4}` }} style={styles.image} />}
                  </View>
              </View>
            </TouchableOpacity>

          ))}
        </ScrollView>
    </SafeAreaView>
  </SafeAreaView>
);
};

const styles = {
  containerText: {
    fontSize: 18, // Increased font size
    fontStyle: 'italic',
    color: '#888', // Example color
  },

projectContainer: {
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 40,
  paddingTop: 80,
},
projectTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
  
},

projectDescription: {
  fontSize: 18,
  marginBottom: 5,
},
sectionContainer: {
  marginBottom: 20,
  
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},
scrollContainer: {
  alignItems: 'center',
  paddingBottom: 350, // Add padding to the bottom of the ScrollVi

  flexGrow: 1, 
},
scrollView: {
  },
stepContainer: {
  width: 300, // Set a fixed width for the square container
  height: 300, // Set a fixed height for the square container
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
imageContainer: {
  flexDirection: 'row', // Arrange images horizontally
  flexWrap: 'wrap', // Allow images to wrap to the next line
  justifyContent: 'center', // Center images horizontally
  marginTop: 10,
},
image: {
  width: 60,
  height: 50,
  margin: 5, // Add margin to separate images
},
logoutButton: {
  position: 'absolute',
  top: 50,
  right: 10,
},



};
export default ProjectScreen;