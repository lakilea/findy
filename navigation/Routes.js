import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { BackHandler, StatusBar, ToastAndroid } from 'react-native';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  let backPressed = 0;

  const onAuthStateChanged = (user) => {
    setUser(user);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (backPressed > 0) {
        BackHandler.exitApp();
        backPressed = 0;
      } else {
        backPressed++;
        ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
        setTimeout( () => { backPressed = 0}, 2000);
        return true;
      }
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#f69833"></StatusBar>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;