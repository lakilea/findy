//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        Contact preferences
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageAddresses')}>
        <Text style={ styles.buttonText }>Manage Addresses</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManagePhones')}>
        <Text style={ styles.buttonText }>Manage Phone Numbers</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageEmails')}>
        <Text style={ styles.buttonText }>Manage Email Addresses</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ManageSocial')}>
        <Text style={ styles.buttonText }>Manage Social Media Accounts</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        You can setup your notification settings here
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('NotificationSettings')}>
        <Text style={ styles.buttonText }>Notification Settings</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right.png')} />
      </TouchableOpacity>
      <Text style={[ styles.textStyle, { marginBottom: 10, fontWeight: 'bold' } ]}>
        Account
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => logout()}>
        <Text style={[ styles.buttonText, { color : "red"} ]}>Log out</Text>
        <Image style={styles.iconStyle} source={require('../../assets/icons/right-red.png')} />
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
    backgroundColor: "#f4f4f4"
  },
  buttonContainer : {
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    marginBottom : 10,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation:4
  },
  textStyle : {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9",
    marginLeft: 10
  },
  buttonText : {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
  },
  iconStyle: {
    marginRight: 10,
    width: 25,
    height: 25
  }
});

//make this component available to the app
export default SettingsScreen;
