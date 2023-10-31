// ListItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeleteButton from './DeleteButton'; // Import the DeleteButton component

const ListItem = ({ item, onPressItem, onDeleteItem }) => {
  return (
    <View style={styles.listItem}>
      <Text>{item.first_name}</Text>
      <DeleteButton onPress={onDeleteItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  // Additional styles for the ListItem component
});

export default ListItem;
