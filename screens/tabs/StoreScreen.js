//import liraries
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import i18n from 'i18n-js';
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
const StoreScreen = ({ navigation }) => {
  const {appSettings} = useContext(AuthContext);

  console.log(appSettings)
  
  useEffect(()=> {
    navigation.setOptions({ title : "Store" });
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <ImageBackground source={require("../../assets/products/1/luggage-tag-5.jpg")} style={styles.productImage}>
          <View style={styles.legend}>
            <Text style={[styles.textStyle, { color:"#000",fontSize:30 }]}>Luggage Tag</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>with</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>findy QR</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>9.90 £</Text>
          </View>
          <TouchableOpacity style={styles.orderNowButton} onPress={()=> navigation.navigate("MyQRList") }>
            <Text style={[styles.textStyle, { color:"#FFF" }]}>Choose QR and Order</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.productContainer}>
        <ImageBackground source={require("../../assets/products/2/keyring.jpg")} style={styles.productImage}>
          <View style={styles.legend}>
            <Text style={[styles.textStyle, { color:"#000",fontSize:30 }]}>Key Tag</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>with</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>findy QR</Text>
            <Text style={[styles.textStyle, { color:"#000" }]}>9.90 £</Text>
          </View>
          <TouchableOpacity style={styles.orderNowButton} onPress={()=> navigation.navigate("MyQRList") }>
            <Text style={[styles.textStyle, { color:"#FFF" }]}>Choose QR and Order</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* <View style={styles.productContainer}>
        <Image source={require("../../assets/products/business-card.jpg")} style={styles.productImage}></Image>
        <Text style={styles.textStyle}>{i18n.t("storeProductBusinessCardDescription")}</Text>
      </View> */}
    </ScrollView>
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
    marginTop: 15,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#b5c1c9",
  },
  orderNowButton: {
    width: "90%",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#f69833",
    height: 50,
    marginLeft: "5%",
    marginTop: 40,
  },
  legend: {
    width: 220,
    backgroundColor: "#CCC",
    opacity: 0.7,
    marginLeft: "5%",
    marginTop: 50,
    borderRadius: 10,
    padding: 15
  }
});

//make this component available to the app
export default StoreScreen;
