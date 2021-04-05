import React, { useContext } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';
import { windowHeight } from '../../../utils/Dimensions'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const ScanQRScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  onSuccess = e => {
    const url = e.data;

    if (url.indexOf("https://findy.croone.co.uk/qr?code=") !== -1){
      const qrCode = url.replace("https://findy.croone.co.uk/qr?code=","");

      Toast.show("You're redirecting to chat screen.");

      firestore().collection('UserQRCodes').doc(qrCode).onSnapshot(userQRCode => {
        const qrData = userQRCode.data();

        if (qrData && qrData.isChatEnabled) {
          if (qrData.userId !== user.uid) {
            firestore().collection('ChatRooms').where("users","array-contains-any",[qrData.userId,user.uid]).onSnapshot(chatRooms=>{
              console.log(chatRooms.docs);
              const chatRoomData = chatRooms.docs.length > 0 ? chatRooms.docs[0] : chatRooms;
              if (chatRoomData.data && chatRoomData.data()) {
                navigation.navigate("Chat/Room", { id : chatRoomData.id });
              } else {
                firestore().collection('ChatRooms').add({
                  users : [qrData.userId,user.uid],
                  createdAt : new Date().getTime(),
                  latestMessage: "Chat room has been created",
                  latestMessageAt : new Date().getTime(),
                  qrCode: qrCode
                }).then((docRef)=>{
                  docRef.collection("Messages").add({
                    message: "Chat room has been created",
                    createdAt: new Date().getTime(),
                    system: true
                  });
                  navigation.navigate("Chat/Room", { id : docRef.id });
                });
              }
            });
          } else {
            Toast.show("You cannot chat with yourself.");
          }
        } else {
          Toast.show("The QR owner has been disabled to chat with him.");
        }
      });

    } else {
      Toast.show("This is not a findy QR.");
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      containerStyle={styles.container}
      cameraStyle={styles.cameraStyle}
      showMarker={true}
      topViewStyle={{backgroundColor:'#f4f4f4', zIndex: 1000}}
      bottomViewStyle={{backgroundColor:'#f4f4f4'}}
      topContent={
        <Text style={styles.centerText}>
          If the user has allowed to chat with them, you will see the chat window
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f4f4',
  },
  cameraStyle:{
    height: windowHeight / 2
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanQRScreen;