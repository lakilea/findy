//import liraries
import React, { useContext,useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import SaveCancelButton from '../../components/SaveCancelButton';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import firestore from '@react-native-firebase/firestore';

// create a component
const CreateQRScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [state,setState] = useState({
    qrName : "",
    qrDescription: "If this product has been lost, please scan above QR code and reach me!",
    userId: user.uid,
    selectedItems: []
  });
  const [selectedItems,setSelectedItems] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [items,setItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const items = [];

    firestore()
    .collection('UserAddresses')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {

      const item = {
        name:"My Addresses",
        id:0,
        icon:"address-book",
        children: []
      };

      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.data().enabled) {

          let address = documentSnapshot.data().address;
          
          console.log(address.length)

          if (address.length > 25)
            address = address.substring(0, 22) + "..." + documentSnapshot.data().country

          item.children.push({
            name: address,
            id: documentSnapshot.id,
            type: "address"
          });
        }
      });

      items.push(item)

      setItems(items);
      setIsLoading(false);
    });

    firestore()
    .collection('UserPhoneNumbers')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {

      const item = {
        name:"My Phone Numbers",
        id:1,
        icon:"phone",
        children: []
      };

      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.data().enabled) {

          let phoneNumber = documentSnapshot.data().phoneNumber;
          
          console.log(phoneNumber.length)

          if (phoneNumber.length > 25)
            phoneNumber = phoneNumber.substring(0, 22) + "..." + documentSnapshot.data().country;
          else
          phoneNumber = phoneNumber + "..." + documentSnapshot.data().country;

          item.children.push({
            name: phoneNumber,
            id: documentSnapshot.id,
            type: "phone"
          });
        }
      });

      items.push(item)

      setItems(items);
      setIsLoading(false);
    });

    firestore()
    .collection('UserEmailAddresses')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {

      const item = {
        name:"My Email Addresses",
        id:2,
        icon:"envelope",
        children: []
      };

      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.data().enabled) {

          let emailAddress = documentSnapshot.data().emailAddress;

          item.children.push({
            name: emailAddress,
            id: documentSnapshot.id,
            type: "email"
          });
        }
      });

      items.push(item)

      setItems(items);
      setIsLoading(false);
    });

    firestore()
    .collection('UserSocialAccounts')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {

      const item = {
        name:"My Social Accounts",
        id:3,
        icon:"user",
        children: []
      };

      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.data().enabled) {

          let socialAccount = documentSnapshot.data().socialAccount;
          let platform = documentSnapshot.data().platform;

          item.children.push({
            name: platform + "/"+ socialAccount,
            id: documentSnapshot.id,
            type: "social"
          });
        }
      });

      items.push(item)

      setItems(items);
      setIsLoading(false);
    });

  }, []);

  createQrCode = ()=> {
    
    if (state.qrName.length === 0) {
      console.log("empty");
      return
    }

    state.selectedItems = [];

    setIsLoading(true);

    items.forEach(item => {
      item.children.forEach(children => {
        if (selectedItems.find(x=>x === children.id)) {
          state.selectedItems.push(children);
        }
      });
    });

    console.log(state.selectedItems);

    //setState({ ... state, selectedItems : state.selectedItems})

    firestore().collection('UserQRCodes')
      .add(state).then((docRef) => {
        console.log(docRef.id);
        var url = "https://findy.ws/qr/" + docRef.id;

        setIsLoading(false);

        navigation.navigate("ShowQR", { qr : docRef, title: "QR : " + state.qrName });
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.createqr}>
        <View style={{width:"14%"}}>
          <FontAwesome5 name="qrcode" size={50} color="#000" />
        </View>
        <View style={{width:"86%"}}>
          <TextInput 
            value={state.qrName}
            numberOfLines={1}
            placeholder="Enter QR name (ex: My Laptop)"
            placeholderTextColor="#666"
            style={[styles.input, { marginTop: 4, height: 46, textAlignVertical: "center"}]}
            onChangeText={(x) => setState({ ...state, qrName: x })}
          />
        </View>
      </View>
      <View style={{width:"100%", marginTop: 10}}>
        <TextInput 
          value={state.qrDescription}
          numberOfLines={5}
          placeholder="Enter Description"
          placeholderTextColor="#666"
          style={[styles.input]}
          multiline={true}
          onChangeText={(x) => setState({ ...state, qrDescription: x })}
        />
      </View>

      <Text style={[styles.infoLabel, {marginTop: 15}]}>Which informations you're allowing for this QR?</Text>

      <View>
        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          searchPlaceholderText="Search informations that you've"
          selectText="Choose Items"
          IconRenderer={FontAwesome5}
          showDropDowns={false}
          expandDropDowns={true}
          showCancelButton={true}
          readOnlyHeadings={true}
          selectChildren={true}
          onSelectedItemsChange={ (selectedItems) => {
            setSelectedItems(selectedItems);
          }}
          selectedItems={selectedItems}
          styles={[{ 
            selectToggle: {
              flexDirection:"row",
              width:"100%",
              alignItems:"center",
              backgroundColor:"#CCC",
              justifyContent: "center",
              marginTop:10,
              marginBottom:10
            },
            selectToggleText:{
              flex:0,
              width:"100%",
              padding:10,
            },
            selectToggleIconStyle:{
              backgroundColor:"#CCC",
              justifyContent:"flex-end",
              flex:1,
              textAlign: "right"
            }
          }]}
          icons={{
            search: {
              name: 'search',
              size: 24
            },
            arrowUp: {
              name: 'arrow-up',
              size: 22
            },
            arrowDown: {
              name: 'arrow-down',
              size: 22
            },
            selectArrowDown: {
              name: 'plus',
              size: 25
            },
            close: {
              name: 'times',
              size: 16
            },
            check: {
              name: 'check',
              size: 16
            },
            cancel: {
              name: 'undo',
              size: 18
            }
          }}
        />
      </View>

      <SaveCancelButton style={{bottom:20}} navigation={navigation} onSavePress={createQrCode} page="CreateQR" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 15
  },
  createqr: {
    //borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    borderColor: "#CCC"
  },
  input: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    borderWidth: 1,
    width: "100%",
    borderColor: "#CCC",
    textAlignVertical: "top"
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    fontWeight: "bold"
  },
});

//make this component available to the app
export default CreateQRScreen;
