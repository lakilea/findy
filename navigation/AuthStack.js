import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
import { GoogleSignin } from '@react-native-community/google-signin';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    
    GoogleSignin.configure({
      webClientId: '122058580594-1h3lbpe66cq8035fu5ck0lnefniqni3n.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = "OnBoarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{header: ()=> null}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{header: ()=> null}} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{header: ()=> null}} />
    </Stack.Navigator>
  );
}

export default AuthStack;