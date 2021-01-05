import React from "react";
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from "../screens/HomeScreen";
import ProfileSettingsScreen from "../screens/subscreens/Settings/ProfileSettingsScreen";
import ManageAddressesScreen from "../screens/subscreens/Settings/ManageAddressesScreen";
import AddAddressScreen from "../screens/subscreens/Settings/AddAddressScreen";
import ManagePhonesScreen from "../screens/subscreens/Settings/ManagePhonesScreen";
import AddPhoneScreen from "../screens/subscreens/Settings/AddPhoneScreen";
import ManageEmailsScreen from "../screens/subscreens/Settings/ManageEmailsScreen";
import AddEmailScreen from "../screens/subscreens/Settings/AddEmailScreen";
import ManageSocialScreen from "../screens/subscreens/Settings/ManageSocialScreen";
import AddSocialScreen from "../screens/subscreens/Settings/AddSocialScreen";
import ShowQRScreen from "../screens/subscreens/CreateQR/ShowQRScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

const Stack = createStackNavigator();

const AppStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="findy!" component={HomeScreen}/>
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ title:"Profile Settings" }}/>
      <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} options={{ title:"Manage Addresses" }}/>
      <Stack.Screen name="AddAddress" component={AddAddressScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="ManagePhones" component={ManagePhonesScreen} options={{ title:"Manage Phone Numbers" }}/>
      <Stack.Screen name="AddPhone" component={AddPhoneScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="ManageEmails" component={ManageEmailsScreen} options={{ title:"Manage Email Addresses" }}/>
      <Stack.Screen name="AddEmail" component={AddEmailScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="ManageSocial" component={ManageSocialScreen} options={{ title:"Manage Social Accounts" }}/>
      <Stack.Screen name="AddSocial" component={AddSocialScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="ShowQR" component={ShowQRScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ title:"Terms Of Services" }}/>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title:"Privacy Policy" }}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 15
  }
});

export default AppStack;