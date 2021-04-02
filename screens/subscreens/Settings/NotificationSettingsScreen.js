//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const NotificationSettingsScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />
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
});

//make this component available to the app
export default NotificationSettingsScreen;
