//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import { windowHeight, windowWidth } from "../../utils/Dimensions";

// create a component
const SettingsScreen = ({ navigation }) => {
  const {logout} = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[ styles.textStyle, { marginBottom: 10, marginTop: 10, fontWeight: 'bold' } ]}>
        Before you create a QR, you need to fill some info.
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ProfileSettings')}>
        <Text style={ styles.buttonText }>Profile Settings</Text>
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        Contact preferences
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageAddresses')}>
        <Text style={ styles.buttonText }>Manage Addresses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManagePhones')}>
        <Text style={ styles.buttonText }>Manage Phone Numbers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageEmails')}>
        <Text style={ styles.buttonText }>Manage Email Addresses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageSocial')}>
        <Text style={ styles.buttonText }>Manage Social Media Accounts</Text>
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        You can see which information you've shared
      </Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={ styles.buttonText }>Show QR</Text>
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        You can setup your notification settings here
      </Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={ styles.buttonText }>Notification Settings</Text>
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        Account
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => logout()}>
        <Text style={ styles.buttonText }>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: "#f4f4f4"
  },
  buttonContainer : {
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#edd2cb',
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom : 10
  },
  textStyle : {
    fontFamily: "Lato-Bold",
  },
  buttonText : {
    fontFamily: "Lato-Bold",
  }
});

//make this component available to the app
export default SettingsScreen;
