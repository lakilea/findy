import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground
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
      <ImageBackground source={require('../assets/header.jpg')} style={styles.pageBackground} blurRadius={3}>
        <Spinner
          visible={state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <Image
          source={require('../assets/onboarding-1.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Find Me!</Text>

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

        <FormButton
          buttonTitle="Sign In"
          onPress={() => loginWithUserNamePass(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              //onPress={() => fbLogin()}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => googleLogin()}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
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
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    flex: 1
  },
  errorText:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
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
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#361d32',
    fontFamily: 'Lato-Regular',
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