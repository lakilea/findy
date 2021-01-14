//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreScreen from '../tabs/StoreScreen';
import HeaderLogo from '../../components/HeaderLogo';

const Stack = createStackNavigator();

// create a component
const StoreNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Store" component={StoreScreen} options={{ title:"Store", headerLeft: ()=> null, header: HeaderLogo }} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default StoreNavigator;