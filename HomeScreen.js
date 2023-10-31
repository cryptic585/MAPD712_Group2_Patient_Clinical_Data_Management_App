import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

       <TouchableOpacity onPress={() => navigation.navigate('View Patient')}>
        <Image
          source={require('./view_patients.png')} // Replace with your image file path
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add Patient')}>
        <Image
          source={require('./add_patient.png')} // Replace with your image file path
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
});