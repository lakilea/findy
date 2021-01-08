//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQRScreen from '../tabs/CreateQRScreen';
import TermsOfServiceScreen from "../TermsOfServiceScreen";
import PrivacyPolicyScreen from '../PrivacyPolicyScreen';

const Stack = createStackNavigator();

// create a component
const CreateQRNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateQR" component={CreateQRScreen} options={{ title:"Create QR" }}/>
      <Stack.Screen name="CreateQR/TermsOfService" component={TermsOfServiceScreen} options={{ title:"Terms Of Service" }}/>
      <Stack.Screen name="CreateQR/PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title:"Privacy Policy" }}/>
    </Stack.Navigator>
  );
};

//make this component available to the app
export default CreateQRNavigator;