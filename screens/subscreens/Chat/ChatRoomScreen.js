//import liraries
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

// create a component
const ChatRoomScreen = ({ navigation, route }) => {
  const chatRoomId = route.params.id;
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribeListener = firestore().collection('ChatRooms').doc(chatRoomId).collection("Messages").orderBy('createdAt', 'desc').onSnapshot(messagesSnapShot=> {
      const messages = messagesSnapShot.docs.map(doc => {
        const firebaseData = doc.data()

        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData
        }

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName
          }
        }

        return data
      })

      setMessages(messages)
    });

    return () => unsubscribeListener()
  }, [])

  const onSend = useCallback(async (messages = []) => {
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const text = messages[0].text;

    firestore().collection('ChatRooms').doc(chatRoomId).collection("Messages").add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        displayName: user.displayName
      }
    }).then(async ()=>{
      await firestore().collection('ChatRooms').doc(chatRoomId).set(
        {
          latestMessage: text,
          latestMessageAt : new Date().getTime()
        },
        { merge: true }
      )
    })

  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble 
        { ... props }
        wrapperStyle={{
          right: {
            backgroundColor: "#f69833"
          }
        }}
        textStyle={{
          right: {
            color: "#FFFFFF"
          }
        }}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send { ... props }>
        <View>
          <FontAwesome name="send-o" color="#f69833" size={25} style={{marginBottom:10, marginRight:10}} />
        </View>
      </Send>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend={true}
      renderSend={renderSend}
      scrollToBottom={true}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ChatRoomScreen;
