//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyQRListScreen from '../tabs/MyQRListScreen';
import ShowQRScreen from "../subscreens/CreateQR/ShowQRScreen";
import HeaderLogo from '../../components/HeaderLogo';

const Stack = createStackNavigator();

// create a component
const MyQRsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyQRs" component={MyQRListScreen} options={{ title:"My QRs", headerLeft: ()=> null, header: HeaderLogo }}  />
      <Stack.Screen name="ShowQR" component={ShowQRScreen} options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default MyQRsNavigator;