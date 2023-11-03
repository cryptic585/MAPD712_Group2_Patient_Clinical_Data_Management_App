import 'react-native-gesture-handler'; // Import this at the top of your entry file
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AddPatientScreen from './AddPatientScreen';
import ViewPatientsScreen from './ViewPatientsScreen'
import ViewPatientInfoScreen from './ViewPatientInfoScreen'
import ViewTestInfoScreen from './ViewTestInfoScreen'
import ViewTestScreen from './ViewTestScreen'

// Jawwad Abbasi
// kkokoko
import { enableScreens } from 'react-native-screens'; // Import and enable here

enableScreens(); // Call enableScreens here

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Define your navigation stack and screens here */}
      <Stack.Navigator>
        {/* Define your screens and their components here */}
        <Stack.Screen name="Home" component={HomeScreen} options={{
    title: 'Home Screen',
    headerStyle: {
      backgroundColor: '#007bff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }} />
        {/*<Stack.Screen name="Details" component={AnotherScreen} />*/}

        <Stack.Screen
  name="Add Patient"
  component={AddPatientScreen}
  options={({ navigation }) => ({
    title: 'Add Patient',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'blue' }}>Button</Text>
      </TouchableOpacity>
    ),
  })}
/>

<Stack.Screen
  name="View Patient"
  component={ViewPatientsScreen}
  options={({ navigation }) => ({
    title: 'View Patients',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'blue' }}>Button</Text>
      </TouchableOpacity>
    ),
  })}
/>



<Stack.Screen
  name="View Patient Info"
  component={ViewPatientInfoScreen}
  options={({ navigation }) => ({
    title: 'View Patient Information',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'blue' }}>Button</Text>
      </TouchableOpacity>
    ),
  })}
/>

<Stack.Screen
  name="View Tests"
  component={ViewTestScreen}
  options={({ navigation }) => ({
    title: 'View Tests',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'blue' }}>Button</Text>
      </TouchableOpacity>
    ),
  })}
/>

<Stack.Screen
  name="View Test Info"
  component={ViewTestInfoScreen}
  options={({ navigation }) => ({
    title: 'View Test Info',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'blue' }}>Button</Text>
      </TouchableOpacity>
    ),
  })}
/>



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
