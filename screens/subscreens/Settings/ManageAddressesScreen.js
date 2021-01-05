//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const ManageAddressesScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);

  const [isLoading,setIsLoading] = useState(false);
  const [addresses,setAddresses] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("AddAddress", { title: "Add Address" }) }
            style={{marginRight:15}}
        >
          <View>
            <FontAwesome5 name="plus-circle" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      )
    })

    const subscriber = firestore()
    .collection('UserAddresses')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const addresses = [];

      querySnapshot.forEach(documentSnapshot => {
        addresses.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setAddresses(addresses);
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
        Currently you've {addresses.length} address record(s), you can add more addresses by using the 'plus' icon.
      </Text>

      <FlatList
        data={addresses}
        style={styles.listStyle}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity 
              style={[styles.itemStyle, item.enabled ? styles.activeItem : styles.deactiveItem]} 
              onPress={()=> {
                navigation.navigate("AddAddress", { 
                  address : item, 
                  title:"Edit Address"})
              }}>
              <View style={{width:"80%"}}>
                <Text style={styles.itemTextStyle}>{item.address}</Text>
                {item.country ? <Text style={styles.itemTextStyle}>{item.country}</Text> : null}
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="angle-right" size={20} />
              </View>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#ffcdc9",
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
export default ManageAddressesScreen;
