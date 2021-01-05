//import liraries
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StoreScreen from "./tabs/StoreScreen";
import CreateQRScreen from "./tabs/CreateQRScreen";
import SettingsScreen from "./tabs/SettingsScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MyQRListScreen from './tabs/MyQRListScreen';
import NotificationsScreen from './tabs/NotificationsScreen';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const Tab = createBottomTabNavigator();

// create a component
const HomeScreen = ({ navigation }) => {
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
        name="Store" 
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="store" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen 
        name="MyQRList" 
        component={MyQRListScreen}
        options={{
          tabBarLabel: 'My QRs',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }} />
      <Tab.Screen 
        name="Create" 
        component={CreateQRScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            //<FontAwesome name="plus" color={color} size={size} />
            <View
              style={{
                position: 'absolute',
                bottom: 6, // space from bottombar
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
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
          tabBarBadge: notificationCount
        }} />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default HomeScreen;
