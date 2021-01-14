//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

// create a component
const MyQRListScreen = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [qrs,setQrs] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
    .collection('UserQRCodes')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const qrs = [];

      querySnapshot.forEach(documentSnapshot => {
        qrs.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setQrs(qrs);
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
        Currently you've {qrs.length} QR code(s), you can create QR by using the 'plus' icon.
      </Text>

      <FlatList
        data={qrs}
        style={styles.listStyle}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity 
              style={[styles.itemStyle, item.enabled ? styles.activeItem : styles.deactiveItem]} 
              onPress={()=> {
                navigation.navigate("ShowQR", { 
                  title:"QR : " + item.qrName,
                  qr: item
                })
              }}>
              <View style={{width:"100%", flexDirection:"row"}}>
                <FontAwesome5 name="qrcode" size={24} color="#000" />
                <Text style={styles.itemTextStyle}>{item.qrName}</Text>
                <FontAwesome5 name="angle-right" size={20} style={{ position: "absolute", right: 0 }} />
              </View>
              <FlatList 
                data={item.selectedItems}
                style={{marginTop:5}}
                renderItem={ ({item}) => (
                  <Text>{item.name}</Text>
                )}
              />
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
  itemStyle: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    width: "100%",
  },
  itemTextStyle: {
    fontSize: 15,
    marginTop: 2,
    marginLeft: 5
  },
  iconContainer: {
    alignItems:"flex-end",
    width:"20%"
  }
});

//make this component available to the app
export default MyQRListScreen;
