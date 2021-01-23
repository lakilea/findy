//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, DevSettings } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import FormInput from '../components/FormInput'
import { Picker} from '@react-native-picker/picker';
import { windowHeight } from '../utils/Dimensions';
import AsyncStorage from '@react-native-community/async-storage'
import messaging from "@react-native-firebase/messaging";

// create a component
const SetupProfile = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  
  const [fullname,setFullname] = useState("");
  const [language,setLanguage] = useState("English");
  const [fcmToken,setFcmToken] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(x => {
        if (x.data()) {
          setFullname(x.data().fullname);
          setLanguage(x.data().language);
          setFcmToken(x.data().fcmToken)
        }
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  const onSavePress = () => {
    setIsLoading(true);

    firestore().collection('Users').doc(user.uid)
      .set({
        fullname: fullname,
        language: language,
      }, {merge: true})
      .then(() => {
        setTimeout(() => {
          firestore().collection('UserNotifications').add({
            text:"Welcome to findy, to create a first QR, you need to add a contact item on the 'Settings' screen.",
            isRead:false,
            navigation:"Settings",
            userId: user.uid,
            timestamp: new Date().getTime()
          }).then(x=> {
            setIsLoading(false);
            AsyncStorage.setItem('alreadyLogined','true');
            navigation.navigate("App");
          });
        }, 500);
      });
  }

  useEffect(()=>{
    if (!fcmToken)
      checkPermission();
  }, []);

  const checkPermission = async ()=>{
    const enabled = await messaging().hasPermission();
    if (enabled)
      getToken();
    else
      requestPermissions();
  }

  const getToken = async ()=>{
    const token = await messaging().getToken();
    firestore().collection('Users').doc(user.uid).set({
      fcmToken : token
    }, {merge: true});
  }

  const requestPermissions = async ()=>{
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      await getToken();
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <FormInput
        labelValue={fullname}
        onChangeText={(fullname) => setFullname(fullname)}
        placeholderText="Full Name"
        iconType="user"
      />

      <FormInput
        labelValue={user.email}
        editable={false}
        placeholderText="Email"
        iconType="envelope"
        style={{ color : "#CCCCCC"}}
      />

      <View style={styles.pickerContainer}>
        <View style={styles.iconStyle}>
          <FontAwesome5 name="language" size={25} color="#666" />
        </View>
        <Picker
          selectedValue={language}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => {
            setLanguage(itemValue)
          }}
        >
          <Picker.Item label="Preffered Language" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Turkish" value="Turkish" />
        </Picker>
      </View>

      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#543c52" }]} onPress={onSavePress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding:10
  },
  pickerStyle: {
    width: '100%',
  },
  pickerContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#fff',
    height: windowHeight / 15,
  },
  iconStyle: {
    padding: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#361d32',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#ffffff",
    fontFamily: "Lato-Regular"
  }
});

//make this component available to the app
export default SetupProfile;
