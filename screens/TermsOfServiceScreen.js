//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// create a component
const TermsOfServiceScreen = () => {
  return (
    <WebView source={{ uri: 'https://findy.croone.co.uk/findy-privacy-policy' }} />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default TermsOfServiceScreen;
