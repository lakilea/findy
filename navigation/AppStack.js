import React, { useContext, useEffect, useState } from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import MyQRsNavigator from "../screens/tabNavigators/MyQRsNavigator";
import CreateQRNavigator from "../screens/tabNavigators/CreateQRNavigator";
import StoreNavigator from "../screens/tabNavigators/StoreNavigator";
import NotificationsNavigator from "../screens/tabNavigators/NotificationsNavigator";
import SettingsNavigator from "../screens/tabNavigators/SettingsNavigator";

const Tab = createBottomTabNavigator();

const AppStack = () => {

  const {user} = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLogined').then(value => {
      if(value == null) {
        firestore().collection('UserNotifications').where('userId', '==', user.uid).onSnapshot(querySnapshot => { 
          console.log(querySnapshot)
          if (querySnapshot._docs.length === 0) {
            firestore().collection('UserNotifications').add({
              text:"Welcome to findy, to create a first QR, you need to add a contact item on the 'Settings' screen.",
              isRead:false,
              navigation:"Settings",
              userId: user.uid
            });
          }
        });
      }
    });

    firestore().collection('UserNotifications')
    .where('userId', '==', user.uid)
    .where('isRead', '==', false)
    .onSnapshot(querySnapshot => { 
      if (querySnapshot._docs.length === 0)
        setNotificationCount(null);
      else
        setNotificationCount(querySnapshot._docs.length);
    });
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen 
        name="StoreNavigator" 
        component={StoreNavigator}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="store" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen 
        name="MyQRList" 
        component={MyQRsNavigator}
        options={{
          tabBarLabel: 'My QRs',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }} />
      <Tab.Screen 
        name="Create" 
        component={CreateQRNavigator}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 6,
                height: 58,
                width: 58,
                borderRadius: 58,
                backgroundColor: '#f55951',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="plus" color="#FFF" size={size} />
            </View>
          ),
        }} />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsNavigator}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
          tabBarBadge: notificationCount
        }} />
      <Tab.Screen 
        name="Settings" 
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  );
}

export default AppStack;