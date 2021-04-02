//import liraries
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
      <View>
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

      <View style={styles.productContainer}>
        <Image source={require("../../assets/products/keychain-oval.jpg")} style={styles.productImage}></Image>
        <Text style={styles.textStyle}>{i18n.t("storeProductKeychainDescription")}</Text>
      </View>

      <View style={styles.productContainer}>
        <Image source={require("../../assets/products/business-card.jpg")} style={styles.productImage}></Image>
        <Text style={styles.textStyle}>{i18n.t("storeProductBusinessCardDescription")}</Text>
      </View>
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
  },
  productContainer:{
    width: "100%",
    marginTop: 15
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#b5c1c9"
  }
});

//make this component available to the app
export default StoreScreen;
