import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';
import SetupProfile from "../screens/SetupProfile";
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

// create a component
const AppStack = () => {
  const {user,appSettings,setAppSettings} = useContext(AuthContext);
  
  const [alreadyLogined, setAlreadyLogined] = useState(null);
  let routeName;

  useEffect(() => {
    firestore().collection('Users').doc(user.uid).onSnapshot(querySnapshot => { 
      console.log(querySnapshot.data())
      if (querySnapshot.data() && querySnapshot.data().fcmToken) {
        setAlreadyLogined(true);
        setAppSettings({language:querySnapshot.data().language==="Turkish"?"tr":"en"});
      } else {
        setAlreadyLogined(false);
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
