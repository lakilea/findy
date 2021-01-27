//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';

// create a component
const ChatListScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>To start a conversation you need to scan QR code.</Text>

      <TouchableHighlight onPress={()=> navigation.navigate("Chat/ScanQR")}>
        <Text style={{color:"#f69833"}}>Scan QR Code</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f4f4',
    padding: 20
  },
});

//make this component available to the app
export default ChatListScreen;
