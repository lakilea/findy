import React, { useContext, useEffect, useState } from "react";
import { Image, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AuthContext} from './AuthProvider';
import MyQRsNavigator from "../screens/tabNavigators/MyQRsNavigator";
import CreateQRNavigator from "../screens/tabNavigators/CreateQRNavigator";
import StoreNavigator from "../screens/tabNavigators/StoreNavigator";
import SettingsNavigator from "../screens/tabNavigators/SettingsNavigator";
import MyTabBar from "../components/MyTabBar";
import i18n from 'i18n-js';
import ChatNavigator from "../screens/tabNavigators/ChatNavigator";
import StatusBarBackground from "../components/StatusBarBackground";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {appSettings} = useContext(AuthContext);

  i18n.locale = appSettings.language;
  i18n.translations = { 
    en: require("../localizations/en.json"), 
    tr: require("../localizations/tr.json"),  
  };

  return (
    <View style={{flex:1}}>
      <StatusBarBackground style={{backgroundColor:'#f69833'}}/>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f69833',
        }}
        tabBar={props => <MyTabBar {...props} />}
        backBehavior = "none"
      >
        <Tab.Screen 
          name="StoreNavigator" 
          component={StoreNavigator}
          options={{
            tabBarLabel: i18n.t("tabStore"),
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
            tabBarLabel: i18n.t("tabMyQrList"),
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
            tabBarLabel: i18n.t("tabCreate"),
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
          name="Chats" 
          component={ChatNavigator}
          options={{
            tabBarLabel: i18n.t("tabChats"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="comments" color={color} size={25} />
            ),
            //tabBarBadge: notificationCount
          }}
          key={4} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsNavigator}
          options={{
            tabBarLabel: i18n.t("tabSettings"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" color={color} size={25} />
            )
          }}
          key={5} 
        />
      </Tab.Navigator>
    </View>
  );
}

export default AppNavigator;