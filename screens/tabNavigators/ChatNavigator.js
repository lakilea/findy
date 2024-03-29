//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderLogo from '../../components/HeaderLogo';
import ChatListScreen from '../tabs/ChatListScreen';
import ScanQRScreen from '../subscreens/Chat/ScanQRScreen';


const Stack = createStackNavigator();

// create a component
const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat/ChatList" component={ChatListScreen} options={{ title:"Chat List", headerLeft: ()=> null, header: HeaderLogo, tabBarVisible:false }}  />
      <Stack.Screen name="Chat/ScanQR" component={ScanQRScreen} options={{ title:"Scan a findy QR" }}  />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default ChatNavigator;