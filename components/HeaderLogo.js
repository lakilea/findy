//import liraries
import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default HeaderLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: "rgba(171, 180, 189, 0.21)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation: 4,
  },
  logo: {
    width: 95,
    height: 40.5
  }
});