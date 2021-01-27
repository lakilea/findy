//import liraries
import React, { useEffect,useContext,useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default HeaderLogo = ({ navigation }) => {
  const {user,appSettings} = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(null);

  useEffect(() => {
    firestore().collection('UserNotifications')
    .where('userId', '==', user.uid)
    .where('isRead', '==', false)
    .onSnapshot(querySnapshot => { 
      if (querySnapshot._docs.length === 0)
        setNotificationCount(null);
      else
        setNotificationCount(querySnapshot._docs.length);
    });
  }, []);
  
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity style={{ height: 40, width: 40, justifyContent: "center", alignItems: "center" }} onPress={()=> navigation.navigate("Notifications")}>
        <FontAwesome5 name="bell" color="#000" size={20} />
        { notificationCount ? 
        <View style={{width:12,height:12, borderRadius:10, backgroundColor:"#f69833", position: "absolute", top:5, right: 5, alignItems:"center", justifyContent:"center"}}>
          <Text style={{fontSize:9,fontFamily: "SF-Pro-Display",color:"#FFF"}}>{notificationCount}</Text>
        </View>
        :
        null
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "#FFF",
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    shadowColor: "rgba(171, 180, 189, 0.21)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation: 4,
  },
  logo: {
    width: 95,
    height: 40.5
  }
});