//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQRScreen from '../tabs/CreateQRScreen2';
import TermsOfServiceScreen from "../TermsOfServiceScreen";
import PrivacyPolicyScreen from '../PrivacyPolicyScreen';
import HeaderLogo from '../../components/HeaderLogo';
import AddAddressScreen from '../subscreens/Settings/AddAddressScreen';
import AddPhoneScreen from '../subscreens/Settings/AddPhoneScreen';
import AddEmailScreen from '../subscreens/Settings/AddEmailScreen';
import AddSocialScreen from '../subscreens/Settings/AddSocialScreen';
import ShowQRScreen from "../subscreens/CreateQR/ShowQRScreen";

const Stack = createStackNavigator();

// create a component
const CreateQRNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreateQR">
      <Stack.Screen name="CreateQR" component={CreateQRScreen} options={{ title:"Create QR", headerLeft: ()=> null, header: HeaderLogo }} />
      <Stack.Screen name="CreateQR/TermsOfService" component={TermsOfServiceScreen} options={{ title:"Terms Of Service", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="CreateQR/PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title:"Privacy Policy", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="CreateQR/AddAddress" component={AddAddressScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="CreateQR/AddPhone" component={AddPhoneScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="CreateQR/AddEmail" component={AddEmailScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="CreateQR/AddSocial" component={AddSocialScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="CreateQR/ShowQR" component={ShowQRScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default CreateQRNavigator;