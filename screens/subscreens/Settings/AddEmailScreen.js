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
const AddEmailScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);
  const [state,setState] = useState({
    emailAddress:"",
    enabled:true,
    type:"email"
  });
  
  const toggleSwitch = () => setState({ ... state, enabled : !state.enabled });

  useEffect(()=> {
    if (route.params.email) {
      setState(route.params.email)
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight:15}}
            onPress={()=> {
              setIsLoading(true);
              firestore()
              .collection('Users')
              .doc(user.uid)
              .collection('Entities')
              .doc(route.params.email.key)
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
    if (state.emailAddress) {
      setIsLoading(true);

      if (route.params.email) {
        firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Entities')
        .doc(route.params.email.key)
        .update(state)
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
      } else {
        firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Entities')
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
        value={state.emailAddress}
        style={[styles.textArea]}
        numberOfLines={1}
        placeholder="Enter Email Address"
        placeholderTextColor="#666"
        onChangeText={(x) => setState({ ...state, emailAddress: x })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

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
    backgroundColor: "#f4f4f4",
  },
  textArea: {
    width: '100%',
    textAlignVertical: "top",
    paddingLeft: 10,
    marginTop : 15,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)",
    elevation: 4,
    fontSize: 16,
    paddingHorizontal: windowWidth * 5 / 100,
    paddingVertical: windowHeight * 2 / 100,
  },
  pickerStyle: {
    width: '70%',
    height: 44
  },
  pickerItem: {
    height: 44
  },
  pickerContainer: {
    marginTop: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight / 15,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)",
    elevation: 4
  },
  iconStyle: {
    padding: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-end",
    marginTop: 10
  }
});

//make this component available to the app
export default AddEmailScreen;
