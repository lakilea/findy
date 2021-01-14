import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState({ 
    isFormValid: true, 
    error: "",
    isLoading: false
  });

  const {login, googleLogin} = useContext(AuthContext);

  loginWithUserNamePass = (email,password) => {
    if (email && password) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setState({ isFormValid : false, error : "Email address is not valid." });
      } else {
        if (password.length < 6) {
          setState({ isFormValid : false, error : "Check your password length. (min:6)" });
        } else {
          setState({ isLoading : true, isFormValid : true });
          login(email, password, function (e) {
            setState({ isFormValid : false, isLoading : false, error : "The email or password is wrong. " + e });
          });
        }
      }
    } else {
      setState({ isFormValid : false, error : "Please provide email and password." });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

          <View style={{flexDirection:"row"}}>
            <TextInput
              value={password}
              style={[styles.input, {width:"80%"}]}
              numberOfLines={1}
              placeholder="Password"
              placeholderTextColor="#666"
              onChangeText={(userPassword) => setPassword(userPassword)}
              secureTextEntry={true}
            />

            <Text style={[styles.forgotText]}>Forgot?</Text>

          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={() => loginWithUserNamePass(email, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row", marginTop: 35, alignItems: 'center', justifyContent: 'center'}}>
          <View style={[styles.line, {width:"40%"}]}>

          </View>
          <Text style={{width:"20%", textAlign: 'center', fontFamily: "SFProDisplay",fontSize: 13, color: "#e0dfdf" }}>OR</Text>
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

        <View style={{flexDirection:"row", marginTop: 50, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
          <Text style={styles.navButtonText}>
            Don't have an acount? 
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.navButtonText, { color: "#f69833" }]}>
              {" "}Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <BottomModal
            visible={!state.isFormValid}
            onTouchOutside={() => {
              setState({ isFormValid : true }); 
            }}
          >
          <ModalContent
            style={{
              backgroundColor: 'fff',
            }}
          >
            <View style={styles.errorText}>
              <FontAwesome name="info-circle" size={20} color="#f55951" />
              <Text style={{color:"#f55951"}}>
                {"  "}{state.error}
              </Text>
            </View>
            
          </ModalContent>
        </BottomModal>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f4f4f4",
    flex: 1,
    padding:25
  },
  errorText:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    width: 130,
    height: 55.5,
    marginTop: 30
  },
  rectangle : {
    width: "100%",
    height: 135,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(171, 180, 189, 0.21)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation: 4,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)",
    marginTop: 40,
  },
  input : {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily: "SF-Pro-Display",
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
  forgotText: {
    paddingVertical: 20,
    fontFamily: "SF-Pro-Display",
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#f69833",
    marginTop: 5
  },
  signInButton: {
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 7,
    backgroundColor: "#f69833",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35
  },
  buttonText: {
    fontFamily: "SF-Pro-Display",
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
    fontFamily: "SF-Pro-Display",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    marginLeft: 5
  },
  navButtonText: {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2f2e41"
  }
});