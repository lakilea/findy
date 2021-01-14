import React, { useContext, useEffect, useState } from "react";
import { View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';
import MyQRsNavigator from "../screens/tabNavigators/MyQRsNavigator";
import CreateQRNavigator from "../screens/tabNavigators/CreateQRNavigator";
import StoreNavigator from "../screens/tabNavigators/StoreNavigator";
import NotificationsNavigator from "../screens/tabNavigators/NotificationsNavigator";
import SettingsNavigator from "../screens/tabNavigators/SettingsNavigator";
import MyTabBar from "../components/MyTabBar";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {user} = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(null);

  useEffect(() => {
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
        activeTintColor: '#f69833',
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen 
        name="StoreNavigator" 
        component={StoreNavigator}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="store" color={color} size={25} />
          ),
        }}
        key={1}
        />
      <Tab.Screen 
        name="MyQRList" 
        component={MyQRsNavigator}
        options={{
          tabBarLabel: 'My QRs',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={25} />
          ),
        }}
        key={2} 
        />
      <Tab.Screen 
        name="Create" 
        component={CreateQRNavigator}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('../assets/icons/new.png')}
              style={{width: 50,height: 50}}
            />
          ),
        }} 
        key={3} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsNavigator}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={25} />
          ),
          tabBarBadge: notificationCount
        }}
        key={4} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={25} />
          )
        }}
        key={5} 
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;