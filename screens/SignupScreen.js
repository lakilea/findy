import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, ImageBackground } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [state, setState] = useState({ 
    isFormValid: true, 
    error: "",
    isLoading: false
  });

  const {register} = useContext(AuthContext);

  signUpWithEmailAndPassword = (email, password, confirmPassword) => {
    if (email && password && confirmPassword) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setState({ isFormValid : false, error : "Email address is not valid." });
      } else {
        if (password.length < 6) {
          setState({ isFormValid : false, error : "Check your password length. (min:6)" });
        } else if (password !== confirmPassword) {
          setState({ isFormValid : false, error : "The given passwords does not match." });
        } else {
          setState({ isLoading : true, isFormValid : true });
          register(email, password, function (e) {
            setState({ isFormValid : false, isLoading : false, error : "Something went wrong. " + e });
          });
        }
      }
    } else {
      setState({ isFormValid : false, error : "Please provide email and password" });
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/header.jpg')} style={styles.pageBackground} blurRadius={3}>
        <Spinner
          visible={state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <Text style={styles.text}>Create an account</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormInput
          labelValue={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign Up"
          onPress={() => signUpWithEmailAndPassword(email, password, confirmPassword)}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy Policy
          </Text>
        </View>

        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />
      
            <SocialButton
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>

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
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#361d32',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  errorText:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  pageBackground: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    padding:20
  }
});
