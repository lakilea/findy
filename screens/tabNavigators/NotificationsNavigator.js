//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../tabs/NotificationsScreen';
import HeaderLogo from '../../components/HeaderLogo';

const Stack = createStackNavigator();

// create a component
const NotificationsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title:"Notifications", headerLeft: ()=> null, header: HeaderLogo }} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default NotificationsNavigator;