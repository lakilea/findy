import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? '#f69833' : '#e9e9e9';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 40,
        height: 6,
        marginHorizontal: 1,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Next = ({ ... props }) => {
  return (
    <TouchableOpacity 
      { ... props }
      style={{marginHorizontal:8}}>
      <Image source={require('../assets/icons/right.png')} />
    </TouchableOpacity>
  )
}

const Done = ({ ... props }) => {
  return (
    <TouchableOpacity 
      { ... props }
      style={{marginHorizontal:8}}>
      <Image source={require('../assets/icons/right.png')} />
    </TouchableOpacity>
  )
}

const OnBoarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={()=>navigation.replace("Login")}
        onDone={()=>navigation.navigate("Login")}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Square}
        containerStyles={{paddingBottom:100, alignItems: 'flex-start'}}
        imageContainerStyles={{paddingBottom:100}}
        titleStyles={styles.titleStyle}
        subTitleStyles={styles.subTitleStyle}
        showSkip={false}
        bottomBarHeight={100}
        bottomBarColor="#FFF"
        pages={[
          {
            backgroundColor: '#FFF',
            image: 
            <View>
              <Image source={require('../assets/logo.png')} style={{marginBottom:30, marginLeft:-50, marginTop: -100}}></Image>
              <Image source={require('../assets/onboarding/step1.png')} />
            </View>,
            title: 'Sign Up',
            subtitle: 'First step, create a user',
           
          },
          {
            backgroundColor: '#FFF',
            image: 
            <View>
              <Image source={require('../assets/logo.png')} style={{marginBottom:30, marginLeft:-20, marginTop: -100}}></Image>
              <Image source={require('../assets/onboarding/step2.png')} />
            </View>,
            title: 'Contact Info',
            subtitle: 'Enter contact info from the "Settings"\nscreen',
          },
          {
            backgroundColor: '#fff',
            image: 
            <View>
              <Image source={require('../assets/logo.png')} style={{marginBottom:30, marginLeft:-20, marginTop: -100}}></Image>
              <Image source={require('../assets/onboarding/step3.png')} />
            </View>,
            title: 'Create a QR',
            subtitle: "You can create a QR for your stuff",
          },
        ]}
      />
      </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  titleStyle : {
    marginTop: -50,
    paddingLeft: 20,
    fontFamily: "SF Pro Display",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41"
  },
  subTitleStyle: {
    paddingLeft: 20,
    fontFamily: "SF Pro Display",
    fontSize: 17,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41"
  }
});