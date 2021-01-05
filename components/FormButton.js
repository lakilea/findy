//import liraries
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from "../utils/Dimensions";

// create a component
const FormButton = ({buttonTitle, ... rest}) => {
  return (
    <TouchableOpacity 
      style={styles.buttonContainer}
      { ... rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#361d32',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#ffffff",
    fontFamily: "Lato-Regular"
  }
});

//make this component available to the app
export default FormButton;
