// DeleteButton.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Delete</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default DeleteButton;
