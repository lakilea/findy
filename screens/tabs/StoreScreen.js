//import liraries
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import i18n from 'i18n-js';

// create a component
const StoreScreen = ({ navigation }) => {
  const {appSettings} = useContext(AuthContext);

  console.log(appSettings)
  
  useEffect(()=> {
    navigation.setOptions({ title : "Store" });
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextLight}>
          {i18n.t("beforeWelcome")} 
        </Text>
        <Text style={styles.headerTextBold}>
          findy
        </Text>
        <Text style={styles.headerTextLight}>
          {i18n.t("afterWelcome")} 
        </Text>
      </View>
      <Text style={styles.textStyle}>
        {i18n.t("storeTopInfo")} 
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
