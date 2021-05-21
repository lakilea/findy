import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, Image, TextInput } from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { windowHeight } from '../utils/Dimensions';
import Toast from 'react-native-simple-toast';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [state, setState] = useState({ isLoading: false });

  const {register,googleLogin} = useContext(AuthContext);

  signUpWithEmailAndPassword = (email, password, confirmPassword) => {
    if (email && password && confirmPassword) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        Toast.show("Email address is not valid.");
      } else {
        if (password.length < 6) {
          Toast.show("Check your password length. (min:6)");
        } else if (password !== confirmPassword) {
          Toast.show("The given passwords does not match.");
        } else {
          setState({ isLoading : true });
          register(email, password, function (e) {
            Toast.show("Something went wrong. " + e);
            setState({ isLoading : false });
          });
        }
      }
    } else {
      Toast.show("Please provide email and password");
    }
  }

  return (
    <View style={styles.container}>
        <Spinner
          visible={state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        <View style={styles.rectangle}>
          <TextInput
            value={email}
            style={styles.input}
            numberOfLines={1}
            placeholder="E-mail"
            placeholderTextColor="#666"
            onChangeText={(userEmail) => setEmail(userEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.line}></View>

          <TextInput
            value={password}
            style={[styles.input, {width:"80%"}]}
            numberOfLines={1}
            placeholder="Password"
            placeholderTextColor="#666"
            onChangeText={(userPassword) => setPassword(userPassword)}
            secureTextEntry={true}
          />

          <View style={styles.line}></View>

          <TextInput
            value={confirmPassword}
            style={[styles.input, {width:"80%"}]}
            numberOfLines={1}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            secureTextEntry={true}
          />
        </View>

        <View style={{flexDirection:"row", marginTop: 25, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
          <Text style={[styles.navButtonText, {fontSize: 13}]}>
            By registering, you accept the{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Auth/TermsOfService") }>
            <Text style={[styles.navButtonText, {color: '#e88832',fontSize: 13}]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.navButtonText}> and </Text>
        </View>

        <Text style={[styles.navButtonText, {color: '#e88832', width: "100%", fontSize: 13}]}>
          Privacy Policy
        </Text>

        <TouchableOpacity style={styles.signInButton} onPress={() => signUpWithEmailAndPassword(email, password, confirmPassword)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row", marginTop: 35, alignItems: 'center', justifyContent: 'center'}}>
          <View style={[styles.line, {width:"40%"}]}>

          </View>
          <Text style={{width:"20%", textAlign: 'center', fontFamily: "SF Pro Display",fontSize: 13, color: "#e0dfdf" }}>OR</Text>
          <View style={[styles.line, {width:"40%"}]}>

          </View>
        </View>

        {Platform.OS === 'android' ? (
          <View style={{flexDirection:"row", marginTop: 35, justifyContent: 'space-between', width: "100%"}}>
            <TouchableOpacity style={styles.socialButton} 
              onPress={() => googleLogin()}
              >
              <Image
                source={require('../assets/icons/google.png')}
                style={{width: 16,height: 16}}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} 
              //onPress={() => fbLogin()}
              >
              <Image
                source={require('../assets/icons/facebook.png')}
                style={{width: 16,height: 16}}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{flexDirection:"row", marginTop: 30, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
          <Text style={styles.navButtonText}>
            Have an account? 
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.navButtonText, { color: "#f69833" }]}>
              {" "}Sign In
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f4f4f4",
    flex: 1,
    padding:25
  },
  logo: {
    width: 130,
    height: 55.5,
    marginTop: 30
  },
  rectangle : {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(171, 180, 189, 0.21)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)",
    marginTop: 40,
    elevation: 4,
  },
  input : {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily: "SF Pro Display",
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41"
  },
  line : {
    width: "100%",
    height: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#f0f0f0"
  },
  signInButton: {
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 7,
    backgroundColor: "#f69833",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  },
  buttonText: {
    fontFamily: "SF Pro Display",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  socialButton: {
    width: "45%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(171, 180, 189, 0.21)",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)",
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  socialButtonText: {
    fontFamily: "SF Pro Display",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    marginLeft: 5
  },
  navButtonText: {
    fontFamily: "SF Pro Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2f2e41"
  }
});
