//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import { AuthContext } from '../../../navigation/AuthProvider';
import FormInput from '../../../components/FormInput'
import { Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SaveCancelButton from '../../../components/SaveCancelButton';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const ProfileSettingsScreen = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  
  const [fullname,setFullname] = useState("");
  const [language,setLanguage] = useState("English");
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
        }
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  onSavePress = () => {
    setIsLoading(true);

    firestore().collection('Users').doc(user.uid)
      .set({
        fullname: fullname,
        language: language,
      })
      .then(() => {
        console.log('User saved!');
      });
    
    setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 500);
  }

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <Text style={[ styles.textStyle, { marginBottom: 10, marginTop: 10, fontWeight: 'bold' } ]}>
        Bellow fields are not required, When you fill any of your information that will be visible on QR screen.
      </Text>
      <FormInput
        labelValue={fullname}
        onChangeText={(fullname) => setFullname(fullname)}
        placeholderText="Full Name"
        iconType="user"
      />

      <FormInput
        labelValue={user.email}
        editable={false}
        placeholderText="Full Name"
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

      <SaveCancelButton 
        navigation={ navigation }
        onSavePress={ onSavePress }
        page="Settings" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
});

//make this component available to the app
export default ProfileSettingsScreen;
