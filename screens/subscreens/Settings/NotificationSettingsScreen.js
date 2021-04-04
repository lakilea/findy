//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { Switch, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import SaveCancelButton from '../../../components/SaveCancelButton';

// create a component
const NotificationSettingsScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);
  const [state,setState] = useState({    enabled:true,  });
  const toggleSwitch = () => setState({ ... state, enabled : !state.enabled });

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(x => {
        if (x && x.data()) {
          setState({ enabled : x.data().notificationSendWhenScanned });
        }
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  onSavePress = () => {
    setIsLoading(true);

    firestore().collection('Users').doc(user.uid)
    .set({
      notificationSendWhenScanned : state.enabled
    }, {merge: true})
    .then(() => {
      setIsLoading(false);
      navigation.goBack();
    });
  }

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <View style={styles.switchContainer}>
        <Text style={{ color : "#000" }}>When someone scanned a QR</Text>
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
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f4f4f4",
    padding:10
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-start",
    marginTop: 10
  }
});

//make this component available to the app
export default NotificationSettingsScreen;
