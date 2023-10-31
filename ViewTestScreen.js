import React, { useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { KeyboardAvoidingView } from 'react-native';


const Container = styled.View`
flex: 1;
padding: 16px;
background-color: #f0f0f0;
`;

const InfoCard = styled.View`
background-color: #FFFF99;
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

const ListItem = ({ item, onPressItem, onDeletePress }) => {
  return (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <View style={styles.listItem}>
        <Text>Test Type: {item.type}{'\n'}Tested On: {item.date}</Text>
        
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onDeletePress(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

function ViewTestScreen({ route, navigation }) {
  const { selectedPatient } = route.params;
  const [patientData, setPatientData] = useState(selectedPatient);
  const [responseArray, setResponseArray] = useState([selectedPatient]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState('');
  const [nurse_name, setNurseName] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [systolic, setSystolic] = useState('');


  const isFocused = useIsFocused();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createTest = () => {
    // Handle the update logic here and then close the modal
    
    toggleModal();
  };

  useEffect(() => {
    // Listen for navigation focus and reload data when the component is focused
    if (isFocused) {
      fetchTests();
    }
  }, [isFocused]);

  const fetchTests = () => {
    
    const apiUrl = `https://mapd713-group2-patient-clinical-data.onrender.com/patients/${selectedPatient._id}/tests`;


    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setResponseArray(res.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const create = () => {
    // Handle the update logic here and then close the modal
    /*if (selectedPatient instanceof Array) {
        console.log("Array")
      } else if (selectedPatient instanceof Object) {
        console.log("Object")
        console.log(selectedPatient)
      } else if (selectedPatient instanceof String) {
        console.log("String")
      } else if (selectedPatient instanceof Number) {
        console.log("Number")
      }*/
      
      const data = {
        patient_id: patientData._id,
        date: date,
        nurse_name: nurse_name,
        type: type,
        category: category,
        readings: {
          diastolic: diastolic,
          systolic: systolic,
        },
       
      };
      //console.log(data);
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
      // Define the API endpoint you want to send the request to
      const apiUrl = `https://mapd713-group2-patient-clinical-data.onrender.com/patients/${selectedPatient._id}/tests`;
      // Send the POST request using Axios
      axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
      })
        .then((res) => {
          // Handle the response data
          console.log('Response Data:', res.data);
          fetchTests();
          //const arrayToString1 = JSON.stringify(res.data);
          //setResponse(arrayToString1);
          //setResponse(res.data);
          Alert.alert("Test Record Created");
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
          //alert(error);
        });
  
  };


  const handlePressItem = (item) => {
    navigation.navigate('View Patient Info', { selectedPatient: item });
  };

  const handleDeletePress = (item) => {
  }
  


 

  return (
    <Container>
    <Title style={{ textAlign: 'center' }}>Test Result History</Title>
  
    <FlatList
      data={responseArray}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onPressItem={() => handlePressItem(item)}
          onDeletePress={() => handleDeletePress(item)}
        />
      )}
    />
    <ButtonContainer>
        <CustomButton onPress={createTest}>
          <ButtonText>Create New Test Record</ButtonText>
        </CustomButton>
      </ButtonContainer>

 {/* Modal */}
 <Modal isVisible={isModalVisible}>
 <KeyboardAvoidingView behavior="position">
    <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Create Test Report</Text>
    <Text style={styles.leftAlign}>Date</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter date"
      onChangeText={(text) => setDate(text)}
    />
    
    <Text style={styles.leftAlign}>Nurse Name</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter nurse name"
      onChangeText={(text) => setNurseName(text)}
    />
    <Text style={styles.leftAlign}>Type</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter type"
      onChangeText={(text) => setType(text)}
    />
    <Text style={styles.leftAlign}>Category</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter category"
      onChangeText={(text) => setCategory(text)}
    />
    <Text style={styles.leftAlign}>Diastolic</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter Diastolic"
      onChangeText={(text) => setDiastolic(text)}
    />
    <Text style={styles.leftAlign}>Systolic</Text>
    <TextInput
      style={styles.textInput}
      placeholder= "Please enter Systolic"
      onChangeText={(text) => setSystolic(text)}
    />
  <ButtonContainer>
        <CustomButton onPress={create}>
          <ButtonText>Create</ButtonText>
        </CustomButton>
        <CustomButton onPress={toggleModal}>
          <ButtonText>Close</ButtonText>
        </CustomButton>

      </ButtonContainer>
  </View>
  </KeyboardAvoidingView>
</Modal>

    </Container>
    
    
    
   
  );
}

export default ViewTestScreen;




const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      buttonContainer: {
        backgroundColor: '#8B0000',
        padding: 5,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 12, // Adjust the font size to make the button smaller
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


