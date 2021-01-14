//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const NotificationsScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [notifications,setNotifications] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
    .collection('UserNotifications')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const notifications = [];

      querySnapshot.forEach(documentSnapshot => {
        notifications.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setNotifications(notifications);
      setIsLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();

  }, []);

  onNotificationPress = (item)=> {
    firestore().collection('UserNotifications').doc(item.key)
        .update({
          isRead : true
        })
        .then(() => {
          navigation.navigate(item.navigation);
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <Text style={{marginBottom:5}}>
        There is {notifications.length} notification(s).
      </Text>

      <FlatList
        data = {notifications}
        style={styles.listStyle}
        renderItem = { ({ item })=> (
          <TouchableOpacity 
            style={[styles.itemStyle, item.isRead ? styles.activeItem : styles.deactiveItem]} 
            onPress={ ()=> onNotificationPress(item)}>
            <View style={{width:"80%"}}>
              <Text style={styles.itemTextStyle}>{item.text}</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="angle-right" size={20} />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
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
  listStyle: {
    width: "100%"
  },
  itemStyle: {
    
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    width: "100%",
    flexDirection:"row"
  },
  activeItem :{
    backgroundColor: "#FFF",
  },
  deactiveItem :{
    backgroundColor: "#CCC",
  },
  itemTextStyle: {
    fontSize: 15
  },
  iconContainer: {
    alignItems:"flex-end",
    width:"20%"
  }
});

//make this component available to the app
export default NotificationsScreen;
