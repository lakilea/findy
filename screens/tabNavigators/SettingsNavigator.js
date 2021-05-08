//import liraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../tabs/SettingsScreen';

import ProfileSettingsScreen from "../subscreens/Settings/ProfileSettingsScreen";
import ManageAddressesScreen from "../subscreens/Settings/ManageAddressesScreen";
import AddAddressScreen from "../subscreens/Settings/AddAddressScreen";
import ManagePhonesScreen from "../subscreens/Settings/ManagePhonesScreen";
import AddPhoneScreen from "../subscreens/Settings/AddPhoneScreen";
import ManageEmailsScreen from "../subscreens/Settings/ManageEmailsScreen";
import AddEmailScreen from "../subscreens/Settings/AddEmailScreen";
import ManageSocialScreen from "../subscreens/Settings/ManageSocialScreen";
import AddSocialScreen from "../subscreens/Settings/AddSocialScreen";
import TermsOfServiceScreen from "../TermsOfServiceScreen";
import PrivacyPolicyScreen from "../PrivacyPolicyScreen";
import HeaderLogo from '../../components/HeaderLogo';
import NotificationSettingsScreen from '../subscreens/Settings/NotificationSettingsScreen';

const Stack = createStackNavigator();

// create a component
const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title:"Settings", headerLeft: ()=> null, header: HeaderLogo }} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ title:"Profile Settings", headerStyle: { height: 62 }  }} />
      <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} options={{ title:"Manage Addresses", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="AddAddress" component={AddAddressScreen} options={({ route }) => ({ title: route.params.title , headerStyle: { height: 62 }})} />
      <Stack.Screen name="ManagePhones" component={ManagePhonesScreen} options={{ title:"Manage Phone Numbers", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="AddPhone" component={AddPhoneScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="ManageEmails" component={ManageEmailsScreen} options={{ title:"Manage Email Addresses", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="AddEmail" component={AddEmailScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="ManageSocial" component={ManageSocialScreen} options={{ title:"Manage Social Accounts", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="AddSocial" component={AddSocialScreen} options={({ route }) => ({ title: route.params.title, headerStyle: { height: 62 } })} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title:"Notification Settings", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="Settings/TermsOfService" component={TermsOfServiceScreen} options={{ title:"Terms Of Services", headerStyle: { height: 62 } }}/>
      <Stack.Screen name="Settings/PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title:"Privacy Policy", headerStyle: { height: 62 } }}/>
    </Stack.Navigator>
  );
};

//make this component available to the app
export default SettingsNavigator;