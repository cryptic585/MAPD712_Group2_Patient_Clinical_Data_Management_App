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

function ViewPatientInfo({ route, navigation }) {
  const { selectedPatient } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);

  //const [newInfo, setNewInfo] = useState('');

  /*const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthText, setDateOfBirthText] = useState('Date of birth not selected');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');*/
  const [firstName, setFirstName] = useState(selectedPatient.first_name);
  const [lastName, setLastName] = useState(selectedPatient.last_name);
  const [address, setAddress] = useState(selectedPatient.address);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthText, setDateOfBirthText] = useState(selectedPatient.date_of_birth);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [department, setDepartment] = useState(selectedPatient.department);
  const [doctor, setDoctor] = useState(selectedPatient.doctor);

  const [patientData, setPatientData] = useState(selectedPatient);


  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updatePatientInfo = () => {
    // Handle the update logic here and then close the modal
    
    toggleModal();
  };

  const update = () => {

    if (!firstName || !lastName || !address || dateOfBirthText== 'Date of birth not selected' || !department || !doctor) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      date_of_birth: dateOfBirthText,
      department: department,
      doctor: doctor,
    };
    
    const apiUrl = `https://mapd713-group2-patient-clinical-data.onrender.com/patients/${selectedPatient._id}`;
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

  const handlePressItem = (patientData) => {
    navigation.navigate('View Tests', { selectedPatient: patientData });
  };

  return (
    <Container>
      <Title style={{ textAlign: 'center' }}>Patient Information</Title>
      <ScrollView>
        <InfoCard>
          <LabelContainer>
            <LabelText>First Name</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.first_name}</Value>*/}
          <Value>{patientData.first_name}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Last Name</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.last_name}</Value>*/}
          <Value>{patientData.last_name}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Address</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.address}</Value>*/}
          <Value>{patientData.address}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Date Of Birth</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.date_of_birth}</Value>*/}
          <Value>{patientData.date_of_birth}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Department</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.department}</Value>*/}
          <Value>{patientData.department}</Value>
        </InfoCard>
        <InfoCard>
          <LabelContainer>
            <LabelText>Doctor</LabelText>
          </LabelContainer>
          {/*<Value>{selectedPatient.doctor}</Value>*/}
          <Value>{patientData.doctor}</Value>
        </InfoCard>
      </ScrollView>
      <ButtonContainer>
        <CustomButton onPress={updatePatientInfo}>
          <ButtonText>Update Patient Info</ButtonText>
        </CustomButton>
        {/*<CustomButton onPress={() => toggleModal()}>*/} 
        <CustomButton onPress={() => handlePressItem(patientData)}>
          <ButtonText>View Tests</ButtonText>
        </CustomButton>
      </ButtonContainer>
      
      {/* Modal */}
      <Modal isVisible={isModalVisible}>
    <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Update Patient Information</Text>
    <Text style={styles.leftAlign}>First Name</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Full Name"
      //value={selectedPatient.first_name}
      placeholder={patientData.first_name}
      onChangeText={(text) => setFirstName(text)}
    />
    
    <Text style={styles.leftAlign}>Last Name</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Last Name"
      //value={selectedPatient.last_name}
      placeholder={selectedPatient.last_name}
      onChangeText={(text) => setLastName(text)}
    />
    <Text style={styles.leftAlign}>Address</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Address"
      //value={selectedPatient.address}
      placeholder={selectedPatient.address}
      onChangeText={(text) => setAddress(text)}
    />
    <Text style={styles.leftAlign}>Date Of Birth</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Date Of Birth"
      //value={selectedPatient.date_of_birth}
      placeholder={selectedPatient.date_of_birth}
      onChangeText={(text) => setDateOfBirthText(text)}
    />
    <Text style={styles.leftAlign}>Department</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Department"
      //value={selectedPatient.department}
      placeholder={selectedPatient.department}
      onChangeText={(text) => setDepartment(text)}
    />
    <Text style={styles.leftAlign}>Doctor</Text>
    <TextInput
      style={styles.textInput}
      //placeholder="Update Doctor"
      //value={selectedPatient.doctor}
      placeholder={selectedPatient.doctor}
      onChangeText={(text) => setDoctor(text)}
    />
    {/*<TouchableOpacity style={styles.updateButton} onPress={update}>
      <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
      <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>*/}
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

export default ViewPatientInfo;


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


{/*import React from 'react';
import { View, Text } from 'react-native';

function ViewPatientInfoScreen({ route }) {
  const { selectedPatient } = route.params;

  return (
    <View>
      <Text>First Name: {selectedPatient.first_name}</Text>
      <Text>Last Name: {selectedPatient.last_name}</Text>
      <Text>Address: {selectedPatient.address}</Text>
      <Text>Address: {selectedPatient.date_of_birth}</Text>
      <Text>Address: {selectedPatient.department}</Text>
      <Text>Address: {selectedPatient.doctor}</Text>
   
    </View>
  );
}

export default ViewPatientInfoScreen;
const InfoCard = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

*/}






