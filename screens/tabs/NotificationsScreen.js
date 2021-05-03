//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList,Image } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
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
          if (item.navigation)
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

      <Text style={[ styles.textStyle, {marginTop: 5} ]}>
        There is {notifications.length} notification(s).
      </Text>

      <FlatList
        data = {notifications}
        style={styles.listStyle}
        renderItem = { ({ item })=> (
          <TouchableOpacity style={[styles.itemStyle]} onPress={ ()=> onNotificationPress(item)}>
            {item.isRead ? null : <View style={styles.oval}></View>}
            <View>
              <Text style={[styles.itemTextStyle, { color : item.isRead ? "#b5c1c9" : "#2f2e41" }]}>{item.text}</Text>
            </View>
            {item.navigation ? <Image style={{ height: 25, width: 25, position: "absolute", right: 10 }} source={require('../../assets/icons/right.png')} /> : null }
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
  textStyle: {
    fontFamily: "SF Pro Display",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9",
    marginLeft: 10,
  },
  itemStyle: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop : 15,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    borderRadius: 5,
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
    paddingRight: 20
  },
  itemTextStyle: {
    fontFamily: "SF Pro Display",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    lineHeight: 18,
    marginLeft: 5
  },
  oval : {
    width: 12,
    height: 12,
    backgroundColor: "#f69833",
    borderRadius: 12,
    marginVertical: 5
  }
});

//make this component available to the app
export default NotificationsScreen;
