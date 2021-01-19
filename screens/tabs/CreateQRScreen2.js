//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, SafeAreaView, Keyboard, TouchableOpacity, BackHandler } from 'react-native';
import { windowWidth } from '../../utils/Dimensions';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { BottomModal, ModalContent, ModalButton, ModalTitle } from 'react-native-modals';
import SaveCancelButton from '../../components/SaveCancelButton';

// create a component
const CreateQRScreen = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [items,setItems] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [state,setState] = useState({
    userId:user.uid,
    country:"",
    address:"",
    enabled:true,
  });

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    setIsLoading(true);

    const items = [];

    firestore()
    .collection('UserAddresses')
    .where('userId', '==', user.uid)
    .onSnapshot(querySnapshot => {

      const item = {
        name:"My Addresses",
        id:"0",
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
            type: "address",
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
        id:"1",
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
        id:"2",
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
        id:"3",
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

  getSelectedItemCount = () => {
    let selectedItems = [];
    let selectedCount = 0;
    items.forEach(item => {
      item.children.forEach(children => {
        if (children.checked) {
          selectedItems.push(children);
          selectedCount++;
        }
      });
    });

    if (selectedCount === 0)
      return "Choose Items";
    else if (selectedCount === 1)
      return "You've selected "+selectedItems[0].name+"."
    else
      return "You've selected "+selectedCount+" items."
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={require("../../assets/icons/qrCode.png")} style={styles.qrCodeIcon} />
        <TextInput 
          value={""}
          style={styles.inputText}
          numberOfLines={1}
          placeholder="Enter QR name (ex: My Blue Bag)"
          placeholderTextColor="#b5c1c9"
          maxLength={30}
        />
      </View>

      <TextInput
        value={state.address}
        style={[styles.textArea]}
        numberOfLines={4}
        placeholder="Description (when someone scan this QR code, this message will appear)"
        placeholderTextColor="#b5c1c9"
        onChangeText={(x) => setState({ ...state, address: x })}
        multiline={true}
      />

      <View style={styles.contactContainer}>
        <Text style={styles.textStyle}>
          Which informations you’re allowing for this QR?
        </Text>
        <TouchableOpacity style={styles.chooseItemsContainer} onPress={()=> { setShowModal(true); Keyboard.dismiss(); }}>
          <Text style={[styles.textStyle, {color:"#b5c1c9"}]}>{getSelectedItemCount()}</Text>
          <Image source={require("../../assets/icons/triangle.png")} style={{width:15, height:8}}></Image>
        </TouchableOpacity>
      </View>

      <SaveCancelButton 
        navigation={ navigation }
        onCancelPress = { ()=> navigation.navigate("Store") }
        page="CreateQR"
      />

      <BottomModal
          visible={showModal}
          onTouchOutside={() => setShowModal(false)}
          height={0.5}
          width={1}
          onSwipeOut={() => setShowModal(false)}
          modalTitle={<ModalTitle title="Which informations you’re allowing for this QR?" />}
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: 'fff',
            }}
          >
            <SafeAreaView style={{paddingTop:10}}>
              <FlatList data={items} style={{ width: "100%"}} renderItem={({ item, index }) => {
                let parentItemIndex = index;
                return (
                  <View>
                    <Text style={styles.listCaptionStyle}>{item.name}</Text>
                    <FlatList data={item.children} style={{ width: "100%"}} renderItem={({ item, index }) => (
                      <TouchableOpacity style={styles.listItemContainer}>
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <ModalButton
                          text=""
                          onPress={() => { items[parentItemIndex].children[index].checked=!items[parentItemIndex].children[index].checked; setItems(items => [ ... items ]); }}
                          style={{position: 'absolute', width: "100%"}}
                        />
                        { item.checked ? <Image source={require("../../assets/icons/confirm.png")} style={{width:20, height: 20}} /> : null}
                      </TouchableOpacity>
                    )} />
                  </View>
              )}} />
            </SafeAreaView>
          </ModalContent>
        </BottomModal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f4f4f4",
    paddingTop: 20
  },
  inputContainer: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    elevation: 4,
    paddingVertical: 5,
    marginBottom: 20
  },
  inputText: {
    fontFamily: "SF-Pro-Display",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    width: windowWidth - 50
  },
  qrCodeIcon : {
    height: 20,
    width: 20,
    marginLeft : 20
  },
  textArea: {
    width: '100%',
    textAlignVertical: "top",
    paddingLeft: 17,
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
    elevation: 4,
    fontFamily: "SF-Pro-Display",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    marginBottom: 20,
    paddingVertical: 15,
  },
  contactContainer: {
    width: windowWidth,
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
    elevation: 4,
    paddingVertical: 15,
    paddingLeft: 17
  },
  textStyle: {
    fontFamily: "SF-Pro-Display",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
  },
  chooseItemsContainer: {
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    paddingVertical: 15
  },
  listCaptionStyle: {
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2f2e41",
    marginBottom: 10
  },
  listItemContainer: {
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
    elevation: 4,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  }
});

//make this component available to the app
export default CreateQRScreen;