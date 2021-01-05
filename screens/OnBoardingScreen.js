import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({ ... props }) => {
  return (
    <TouchableOpacity 
      { ... props }
      style={{marginHorizontal:8}}>
      <Text>Skip</Text>
    </TouchableOpacity>
  )
}

const Next = ({ ... props }) => {
  return (
    <TouchableOpacity 
      { ... props }
      style={{marginHorizontal:8}}>
      <Text>Next</Text>
    </TouchableOpacity>
  )
}

const Done = ({ ... props }) => {
  return (
    <TouchableOpacity 
      { ... props }
      style={{marginHorizontal:8}}>
      <Text>Done</Text>
    </TouchableOpacity>
  )
}

const OnBoarding = ({navigation}) => {
  return (
    <Onboarding
      onSkip={()=>navigation.replace("Login")}
      onDone={()=>navigation.navigate("Login")}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/onboarding-1.png')} />,
          title: 'Sign Up',
          subtitle: 'First step, create a user',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/onboarding-2.png')} />,
          title: 'Contact Info',
          subtitle: "Enter contact info from the 'Settings' screen.",
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/onboarding-1.png')} />,
          title: 'Create a QR',
          subtitle: "You can create a QR for your staff",
        },
      ]}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});