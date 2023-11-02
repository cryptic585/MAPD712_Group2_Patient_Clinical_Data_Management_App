import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f0f0f0;
`;

const InfoCard = styled.View`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 7px;
  margin: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const LabelContainer = styled.View`
  background-color: #3498db;
  border-radius: 5px;
`;

const LabelText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const Value = styled.Text`
  font-size: 18px;
  color: #444;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

function ViewTestInfoScreen({ route, navigation }) {
  const { selectedTest } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);

  //const [newInfo, setNewInfo] = useState('');


  const [date, setDate] = useState(selectedTest.date);
  const [nurse_name, setNurseName] = useState(selectedTest.nurse_name);
  const [type, setType] = useState(selectedTest.type);
  const [category, setCategory] = useState(selectedTest.category);
  const [diastolic, setDiastolic] = useState(selectedTest.readings.diastolic);
  const [systolic, setSystolic] = useState(selectedTest.readings.systolic);

  const [testData, setTestData] = useState(selectedTest);


  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateTestInfo = () => {
    // Handle the update logic here and then close the modal
    
    toggleModal();
  };

  const update = () => {

    if (!date || !nurse_name || !type || !category || !diastolic || !systolic) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const data = {
      date: date,
      nurse_name: nurse_name,
      type: type,
      category: category,
      diastolic: diastolic,
      systolic: systolic,
    };
    
    const apiUrl = `https://mapd713-group2-patient-clinical-data.onrender.com/patients/${selectedTest.patient_id}/tests/${selectedTest._id}`;
    console.log(apiUrl)

    axios
    .patch(apiUrl, data)
    .then((response) => {
      // Handle the successful response here
      setPatientData(response.data);
      console.log('Update successful:', response.data);
      toggleModal(); // Close the modal after the update
    })
    .catch((error) => {
      // Handle errors here
      console.error('Update failed:', error);
    });


  };

  const handlePressItem = (testData) => {
    navigation.navigate('View Tests', { selectedTest: testData });
  };

  return (
    <Container>
      <Title style={{ textAlign: 'center' }}>Test Information</Title>
      <ScrollView>
        <InfoCard>
          <LabelContainer>
            <LabelText>Test Date</LabelText>
          </LabelContainer>
        
          <Value>{testData.date}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Nurse Name</LabelText>
          </LabelContainer>
       
          <Value>{testData.nurse_name}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Test Type</LabelText>
          </LabelContainer>
       
          <Value>{testData.type}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Test Category</LabelText>
          </LabelContainer>
      
          <Value>{testData.category}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Diastolic</LabelText>
          </LabelContainer>
    
          <Value>{testData.readings.diastolic}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Systolic</LabelText>
          </LabelContainer>
      
          <Value>{testData.readings.systolic}</Value>
        </InfoCard>
      </ScrollView>
      <ButtonContainer>
        <CustomButton onPress={updateTestInfo}>
          <ButtonText>Update Patient Info</ButtonText>
        </CustomButton>
  
       
      </ButtonContainer>
      
    
      <Modal isVisible={isModalVisible}>
    <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Update Test Information</Text>
    <Text style={styles.leftAlign}>Date</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Full Name"
      //value={selectedPatient.first_name}
      placeholder={testData.date.toString()}
      onChangeText={(text) => setDate(text)}
    />
    
    <Text style={styles.leftAlign}>Nurse Name</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Last Name"
      //value={selectedPatient.last_name}
      placeholder={testData.nurse_name.toString()}
      onChangeText={(text) => setNurseName(text)}
    />
    <Text style={styles.leftAlign}>Type</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Address"
      //value={selectedPatient.address}
      placeholder={testData.type.toString()}
      onChangeText={(text) => setType(text)}
    />
    <Text style={styles.leftAlign}>Category</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Date Of Birth"
      //value={selectedPatient.date_of_birth}
      placeholder={testData.category.toString()}
      onChangeText={(text) => setCategory(text)}
    />
    <Text style={styles.leftAlign}>Diastolic</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Department"
      //value={selectedPatient.department}
      placeholder={testData.readings.diastolic.toString()}
      onChangeText={(text) => setDiastolic(text)}
    />
    <Text style={styles.leftAlign}>Systolic</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Doctor"
      //value={selectedPatient.doctor}
      placeholder={testData.readings.systolic.toString()}
      onChangeText={(text) => setSystolic(text)}
    />

  <ButtonContainer>
        <CustomButton onPress={update}>
          <ButtonText>Update</ButtonText>
        </CustomButton>
        <CustomButton onPress={toggleModal}>
          <ButtonText>Close</ButtonText>
        </CustomButton>
      </ButtonContainer>
  </View>
</Modal>


    </Container>
  );
}

export default ViewTestInfoScreen;


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  leftAlign: {
    //textAlign: 'left', // Align text to the left
    alignSelf: 'flex-start',
    fontWeight: 'bold', 
    fontStyle: 'italic',
  },
});











