//import liraries
import React, { useState, useCallback, useContext } from 'react';
import { Image, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// create a component
const ChatListScreen = ({navigation}) => {
  const {user,appSettings} = useContext(AuthContext);

  const [chats,setChats] = useState([]);

  useFocusEffect(
    useCallback(()=>{
      let items = [];
      firestore().collection('ChatRooms').where("users","array-contains-any",[user.uid]).onSnapshot(chatRooms=>{
        chatRooms.forEach(chatRoom => {
          if (!items.find(x=>x.key === chatRoom.id)) {
            items.push({
              key: chatRoom.id,
              ... chatRoom.data()
            });
          }
        });
        setChats(items);
        console.log(items);
      });
    },[])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>To start a conversation you need to scan QR code.</Text>

      <TouchableHighlight onPress={()=> navigation.navigate("Chat/ScanQR")} style={{marginBottom:15}}>
        <Text style={{color:"#f69833"}}>Scan QR Code</Text>
      </TouchableHighlight>

      <FlatList
        data={chats}
        style={styles.listStyle}
        renderItem={({item}) => {
          let date = new Date(item.latestMessageAt);
          let lastMessageDate = date.toLocaleDateString(appSettings.language) + " " + date.toLocaleTimeString(appSettings.language);
          return (
            <TouchableOpacity style={styles.itemStyle} onPress={()=>navigation.navigate("Chat/Room", { id : item.key })}>
              <Text>QR Chat{"\n"}
                <Text>{item.latestMessage}</Text> <Text>{lastMessageDate}</Text>
              </Text>
              <Image style={{ height: 25, width: 25 }} source={require('../../assets/icons/right.png')} />
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingTop: 20
  },
  listStyle: {
    width: "100%"
  },
  itemStyle: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom : 10,
    flexDirection: "row",
    justifyContent: 'space-between',
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
    borderColor: "rgba(171, 180, 189, 0.35)"
  },
});

//make this component available to the app
export default ChatListScreen;
