import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {primaryColor} from '../../styles/styles';

const EditButton: FunctionComponent = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.editText}> EDIT </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: primaryColor,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default EditButton;
