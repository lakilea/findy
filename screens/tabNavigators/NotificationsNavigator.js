//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../tabs/NotificationsScreen';

const Stack = createStackNavigator();

// create a component
const NotificationsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title:"Notifications" }}/>
    </Stack.Navigator>
  );
};

//make this component available to the app
export default NotificationsNavigator;