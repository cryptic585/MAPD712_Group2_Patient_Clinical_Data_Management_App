import React, { useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';
//import Modal from 'react-native-modal';

const Container = styled.View`
flex: 1;
padding: 16px;
background-color: #f0f0f0;
`;

const Title = styled.Text`
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
color: #333;
`;

const ListItem = ({ item, onPressItem, onDeletePress }) => {
  return (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <View style={styles.listItem}>
        <Text>{item.first_name}</Text>
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

function ViewPatientsScreen({ navigation }) {
  const [responseArray, setResponseArray] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Listen for navigation focus and reload data when the component is focused
    if (isFocused) {
      fetchPatients();
    }
  }, [isFocused]);

 

  const fetchPatients = () => {
    const apiUrl = 'https://mapd713-group2-patient-clinical-data.onrender.com/patients';

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

  const handlePressItem = (item) => {
    navigation.navigate('View Patient Info', { selectedPatient: item });
  };

  const handleDeletePress = (item) => {
      // Add your delete logic here
      //console.log(`Delete pressed for item: ${item._id}`);

    
      const apiUrl = `https://mapd713-group2-patient-clinical-data.onrender.com/patients/${item._id}`;
      //console.log(`Delete pressed for item: ${apiUrl}`);

      // Send a DELETE request using Axios
       axios
        .delete(apiUrl)
        .then((res) => {
          // Handle the successful response here
          fetchPatients();
          console.log('Delete request was successful');
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error deleting item:', error);
        });
  };

  return (
    <Container>
    <Title style={{ textAlign: 'center' }}>List of Patients</Title>
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
    </Container>
  );
}

const styles = StyleSheet.create({
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
});

export default ViewPatientsScreen;

   {/*<View>
        <Text>This is the View Patients Screen</Text>
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
           //const arrayToString = JSON.stringify(res.data);
        //setResponse(arrayToString);
        />
    </View>*/}