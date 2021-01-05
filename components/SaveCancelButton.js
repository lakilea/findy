//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const SaveCancelButton = ({ navigation, onSavePress, ... rest }) => {
  return (
    <View style={[styles.container, rest.style]}>
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By saving, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("TermsOfService")}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#543c52" }]} onPress={ onSavePress }>
          <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#f55951" }]} onPress={()=> navigation.goBack() }>
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    padding: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    width: '48%',
    margin: 6
  },
  textStyle : {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: "#FFFFFF"
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'center',
  },
});

//make this component available to the app
export default SaveCancelButton;
