import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProjectScreen = ({ route }) => {
  const { projectId, email } = route.params;
  const [projectDetails, setProjectDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://10.55.5.124:8000/api/project-details/${projectId}/${email}/`);
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

  return (
    <View>
      <Text>Project Details:</Text>
      <Text>Project Name: {project && project.name}</Text>
      <Text>Description: {project && project.description}</Text>
      {/* Display other project details as needed */}
      
      <Text>Steps:</Text>
      {steps && steps.map((step) => (
        <TouchableOpacity key={step.id} onPress={() => handleStepClick(step.id, project.name)}>
          <View>
            <Text>Step Description: {step.description}</Text>
            <Text>Assigned To: {step.assigned_to}</Text>
            {/* Display other step details as needed */}
            
            {/* Display images if available */}
            {step.file && <Image source={{ uri: `http://10.55.5.124:8000${step.file}` }} style={{ width: 200, height: 200 }} />}
            {step.file2 && <Image source={{ uri: `http://10.55.5.124:8000${step.file2}` }} style={{ width: 200, height: 200 }} />}
            {step.sign_sheet && <Image source={{ uri: `http://10.55.5.124:8000${step.sign_sheet}` }} style={{ width: 200, height: 200 }} />}

            <Text>--------------------------</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProjectScreen;