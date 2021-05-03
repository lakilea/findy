//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const ManageEmailsScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);
  const [emails,setEmails] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("AddEmail", { title: "Add Email Address" }) }
            style={{marginRight:15}}
        >
          <View>
            <FontAwesome5 name="plus-circle" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      )
    })

    const subscriber = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Entities')
    .where('type', '==', "email")
    .onSnapshot(querySnapshot => {
      const emails = [];

      querySnapshot.forEach(documentSnapshot => {
        emails.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setEmails(emails);
      setIsLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <Text style={[ styles.textStyle, { marginBottom: 10, marginTop: 10, fontWeight: 'bold' } ]}>
        Currently you've {emails.length} email record(s), you can add more email address by using the 'plus' icon.
      </Text>

      <FlatList
        data={emails}
        style={styles.listStyle}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity 
              style={[styles.itemStyle, item.enabled ? styles.activeItem : styles.deactiveItem]} 
              onPress={()=> {
                navigation.navigate("AddEmail", { 
                  email : item, 
                  title:"Edit Email"})
              }}>
              {item.enabled ? <Image style={{ height: 20, width: 20 }} source={require(',,/../../assets/icons/confirm.png')} /> : null}
              <View style={{width:"80%"}}>
                <Text style={styles.itemTextStyle}>{item.emailAddress}</Text>
              </View>
              <Image style={{ height: 25, width: 25 }} source={require(',,/../../assets/icons/right.png')} />
            </TouchableOpacity>
          </View>
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
  textStyle : {
    fontFamily: "SF Pro Display",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9",
    marginBottom: 10,
    paddingHorizontal : 10
  },
  itemStyle: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom : 10,
    flexDirection: "row",
    justifyContent: 'space-between',
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
  itemTextStyle: {
    fontFamily: "SF Pro Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41"
  },
});

//make this component available to the app
export default ManageEmailsScreen;
