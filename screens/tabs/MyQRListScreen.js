//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView , TouchableOpacity, FlatList,Image } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import i18n from 'i18n-js';

// create a component
const MyQRListScreen = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [qrs,setQrs] = useState([]);
  
  useEffect(()=>{
    firestore().collection("UserQRCodes").where("userId", "==", user.uid).onSnapshot(userQRCodeResult => {
      const qrList = [];
      if (userQRCodeResult) {
        userQRCodeResult.forEach(userQRCode => {
          let qrItem = {
            ... userQRCode.data(),
            key: userQRCode.id,
          };

          qrList.push(qrItem);
        });

        setQrs(qrList);
      }
    });
  },[]);

  const getHeader = () => {
    return <Text></Text>;
  };

  const getFooter = () => {
    return <Text></Text>;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />

      <Text style={[ styles.textStyle, {marginTop: 5} ]}>
        {i18n.t("myQRListHeaderBeforeCount")} {qrs.length} {i18n.t("myQRListHeaderAfterCount")}
      </Text>
      <View style={{ width: "100%", flexDirection: 'row', alignItems: "center", marginBottom: 10}}>
        <Text style={[ styles.textStyle ]}>
          {i18n.t("myQRListHeaderBeforeIcon")}
        </Text>
        <Image
          source={require('../../assets/icons/new.png')}
          style={{width: 20,height: 20}}
        />
        <Text style={[ styles.textStyle ]}>
          {i18n.t("myQRListHeaderAfterIcon")}
        </Text>
      </View>

      <FlatList
        data={qrs}
        style={styles.listStyle}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity 
              style={[styles.itemStyle]} 
              onPress={()=> {
                navigation.navigate("ShowQR", { 
                  title:"QR : " + item.qrName,
                  qr: item
                })
              }}>
              <View style={{width:"100%", flexDirection:"row"}}>
                <FontAwesome5 name="qrcode" size={24} color="#000" />
                <Text style={styles.itemCaptionStyle}>{item.qrName}</Text>
                <Image style={{ position: "absolute", right: 0, height: 25, width: 25 }} source={require('../../assets/icons/right.png')} />
              </View>
              <FlatList 
                data={item.selectedItems}
                style={{marginTop:5}}
                renderItem={ ({item}) => {
                
                  let text = "";

                  if (item.type==="address") {
                    text = item.address + " " + item.country
                  }

                  if (item.type==="email") {
                    text = item.emailAddress;
                  }

                  if (item.type==="phone") {
                    text = item.phoneNumber;
                  }

                  if (item.type==="social") {
                    text = item.platform+"/"+item.socialAccount;
                  }

                  item.text = text;

                return (
                  <Text style={styles.itemDetailsStyle}>{item.text}</Text>
                )}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView >
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f4f4f4",
    padding: 10
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
  },
  itemStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom : 15,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation:4,
    borderWidth: 0.5,
    borderColor: "rgba(171, 180, 189, 0.35)"
  },
  itemCaptionStyle: {
    fontFamily: "SF Pro Display",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    marginLeft: 10
  },
  itemDetailsStyle: {
    fontFamily: "SF Pro Display",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#aeaeae"
  }
});

//make this component available to the app
export default MyQRListScreen;
