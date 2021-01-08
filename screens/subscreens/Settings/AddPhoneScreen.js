//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Switch, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import { AuthContext } from '../../../navigation/AuthProvider';
import { Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SaveCancelButton from '../../../components/SaveCancelButton';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const AddPhoneScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);
  const [state,setState] = useState({
    userId:user.uid,
    country:"",
    phoneNumber:"",
    enabled:true,
  });
  
  const toggleSwitch = () => setState({ ... state, enabled : !state.enabled });

  useEffect(()=> {
    if (route.params.phone) {
      setState(route.params.phone)
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight:15}}
            onPress={()=> {
              setIsLoading(true);
              firestore()
              .collection('UserPhoneNumbers')
              .doc(route.params.phone.key)
              .delete()
              .then(() => {
                console.log('Phone deleted!');
                setIsLoading(false);
                navigation.goBack();
              });
            }}
          >
            <View>
              <FontAwesome5 name="trash" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        )
      })
    }
  }, [])

  onSavePress = () => {
    if (state.phoneNumber) {
      setIsLoading(true);

      if (route.params.phone) {
        firestore().collection('UserPhoneNumbers').doc(route.params.phone.key)
        .update(state)
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
      } else {
        firestore().collection('UserPhoneNumbers')
        .add(state).then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <TextInput
        value={state.phoneNumber}
        style={[styles.textArea]}
        numberOfLines={1}
        placeholder="Enter Phone Number"
        placeholderTextColor="#666"
        onChangeText={(x) => setState({ ...state, phoneNumber: x })}
        keyboardType="phone-pad"
      />

      <View style={styles.pickerContainer}>
        <View style={styles.iconStyle}>
          <FontAwesome5 name="flag" size={25} color="#666" />
        </View>
        <Picker
          selectedValue={state.country}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => {
            setState({ ...state, country: itemValue })
          }}
        >
          <Picker.Item label="Country" value="" />
          <Picker.Item label="Turkiye" value="Turkiye" />
          <Picker.Item label="United Kingdom" value="United Kingdom" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={{ color : "#000" }}>Is Active?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#543c52" }}
          thumbColor={state.enabled ? "#f55951" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={state.enabled}
        />
      </View>

      <SaveCancelButton 
        navigation={ navigation }
        onSavePress={ onSavePress }
        page="Settings" />

    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f1e8e6",
    padding:10
  },
  textArea: {
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 10
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
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-end"
  }
});

//make this component available to the app
export default AddPhoneScreen;
