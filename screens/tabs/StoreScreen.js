//import liraries
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { windowWidth } from "../../utils/Dimensions";

// create a component
const StoreScreen = ({ navigation }) => {
  
  useEffect(()=> {
    navigation.setOptions({ title : "Store" });
  }, [])
  
  const cellWidth = windowWidth / 5;

  console.log(cellWidth)
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextLight}>
          Welcome to 
        </Text>
        <Text style={styles.headerTextBold}>
          {" "}findy
        </Text>
      </View>
      <Text style={styles.textStyle}>
        You will be able to order any of the stickers below, keep following... 
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f4f4f4",
    padding: 10
  },
  textStyle: {
    fontFamily: "SF-Pro-Display",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#889299"
  },
  headerContainer: {
    flexDirection: "row"
  },
  headerTextLight: {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9"
  },
  headerTextBold: {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9"
  }
});

//make this component available to the app
export default StoreScreen;
