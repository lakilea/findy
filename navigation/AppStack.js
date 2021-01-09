import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';
import SetupProfile from "../screens/SetupProfile";
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

// create a component
const AppStack = () => {

  const {user} = useContext(AuthContext);
  
  const [alreadyLogined, setAlreadyLogined] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLogined').then(value => {
      if(value == null) {
        firestore().collection('UserNotifications').where('userId', '==', user.uid).onSnapshot(querySnapshot => { 
          if (querySnapshot._docs.length === 0) {
            firestore().collection('UserNotifications').add({
              text:"Welcome to findy, to create a first QR, you need to add a contact item on the 'Settings' screen.",
              isRead:false,
              navigation:"Settings",
              userId: user.uid
            });
          }
        });
        setAlreadyLogined(false);
      } else {
        setAlreadyLogined(true);
      }
    });
  }, []);

  if (alreadyLogined === null) {
    return null;
  } else if (alreadyLogined === true) {
    routeName = "App";
  } else {
    routeName = "SetupProfile";
  }

  console.log(routeName)
  
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen name="SetupProfile" component={SetupProfile} options={{header: ()=> null}} />
      <Stack.Screen name="App" component={AppNavigator} options={{header: ()=> null}} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default AppStack;
