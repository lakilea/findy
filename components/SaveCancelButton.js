//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const SaveCancelButton = ({ navigation, onSavePress, onCancelPress, page, ... rest }) => {
  return (
    <View style={[styles.container, rest.style]}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.cancelButtonContainer, {  }]} onPress={()=> { onCancelPress ? onCancelPress() : navigation.goBack() } }>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.saveButtonContainer, {  }]} onPress={ onSavePress }>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'center',
    alignItems: "center"
  },
  cancelButtonContainer: {
    borderRadius: 7,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#f69833",
    width: "45%",
    margin: 10,
    padding: 15,
    height: 50
  },
  cancelButtonText : {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#f69833"
  },
  saveButtonContainer: {
    borderRadius: 7,
    backgroundColor: "#f69833",
    width: "45%",
    margin: 10,
    padding: 15,
    height: 50
  },
  saveButtonText : {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
});

//make this component available to the app
export default SaveCancelButton;
