import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, DatePickerAndroid, Alert } from 'react-native';
import axios from 'axios';
import DatePicker from '@react-native-community/datetimepicker';

function formatToDDMMYYYY(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('en', options).format(date);
  return formattedDate;
}

function AddPatientScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthText, setDateOfBirthText] = useState('Date of birth not selected');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      // Format the selected date to a text string
      formattedDate = formatToDDMMYYYY(selectedDate);
      setDateOfBirthText(formattedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmission = () => {
    // You can access the text data in text1 and text2 and perform actions here.
    //alert(`Text 1: ${text1}\nText 2: ${text2}`);
    if (!firstName || !lastName || !address || dateOfBirthText== 'Date of birth not selected' || !department || !doctor) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      date_of_birth: formattedDate,
      department: department,
      doctor: doctor,
      tests:[],
    };
    //console.log(data);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    // Define the API endpoint you want to send the request to
    const apiUrl = 'https://mapd713-group2-patient-clinical-data.onrender.com/patients';
    // Send the POST request using Axios
    axios.post(apiUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
    })
      .then((res) => {
        // Handle the response data
        console.log('Response Data:', res.data);
        //const arrayToString1 = JSON.stringify(res.data);
        //setResponse(arrayToString1);
        //setResponse(res.data);
        alert(res.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        alert(error);
      });
  };


   


  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your first name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your last name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your address"
          onChangeText={(text) => setAddress(text)}
          value={address}
        />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={showDatePickerModal}>
      <TextInput
        style={styles.input}
        value={dateOfBirthText}
        placeholder="Select a date of birth"
        editable={false}
      />    
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          value={dateOfBirth}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter department"
          onChangeText={(text) => setDepartment(text)}
          value={department}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Doctor</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter doctor"
          onChangeText={(text) => setDoctor(text)}
          value={doctor}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmission}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPatientScreen;
