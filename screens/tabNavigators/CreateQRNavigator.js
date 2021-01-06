//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQRScreen from '../tabs/CreateQRScreen';

const Stack = createStackNavigator();

// create a component
const CreateQRNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateQR" component={CreateQRScreen} options={{ title:"Create QR" }}/>
    </Stack.Navigator>
  );
};

//make this component available to the app
export default CreateQRNavigator;