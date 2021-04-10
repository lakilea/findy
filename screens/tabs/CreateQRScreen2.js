//import liraries
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, SafeAreaView, Keyboard, TouchableOpacity, BackHandler, Switch } from 'react-native';
import { windowWidth } from '../../utils/Dimensions';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { BottomModal, ModalContent, ModalButton, ModalTitle } from 'react-native-modals';
import SaveCancelButton from '../../components/SaveCancelButton';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import analytics from '@react-native-firebase/analytics';
import i18n from 'i18n-js';

// create a component
const CreateQRScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [items,setItems] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [state,setState] = useState({
    qrName : "",
    qrDescription: "",
    userId: user.uid,
    selectedItems: [],
    isChatEnabled: true
  });

  useFocusEffect(
    React.useCallback(() => {
  
      setIsLoading(true);
  
      setItems([]);
  
      const items = [
        {
          name:i18n.t("createQrMyAddressesText"),
          id:"0",
          icon:"address-book",
          children: []
        },
        {
          name:i18n.t("createQrMyPhoneNumbersText"),
          id:"1",
          icon:"phone",
          children: []
        },
        {
          name:i18n.t("createQrMyEmailAddressesText"),
          id:"2",
          icon:"envelope",
          children: []
        },
        {
          name:i18n.t("createQrMySocialAccountsText"),
          id:"3",
          icon:"user",
          children: []
        }
      ];
  
      const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Entities')
      .onSnapshot(querySnapshot => {
  
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().enabled) {
  
            if (documentSnapshot.data().type === "address")
            {
              items[0].children.push({
                id: documentSnapshot.id,
                ... documentSnapshot.data()
              });
            }
  
            if (documentSnapshot.data().type === "phone")
            {
              items[1].children.push({
                id: documentSnapshot.id,
                ... documentSnapshot.data()
              });
            }
  
            if (documentSnapshot.data().type === "email")
            {
              items[2].children.push({
                id: documentSnapshot.id,
                ... documentSnapshot.data()
              });
            }
  
            if (documentSnapshot.data().type === "social")
            {
              items[3].children.push({
                id: documentSnapshot.id,
                ... documentSnapshot.data()
              });
            }
          }
        });
  
        setItems(items);
        setIsLoading(false);
      });
  
      return ()=> unsubscribe();
    }, [])
  );

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
      return i18n.t("createQrSelectorPlaceHolder");
    else if (selectedCount === 1)
      return i18n.t("createQrSelector1ItemLeftText")+selectedItems[0].text+i18n.t("createQrSelector1ItemRightText")
    else
      return i18n.t("createQrSelectorMultipleItemLeftText")+selectedCount+i18n.t("createQrSelectorMultipleItemRightText")
  }

  createQrCode = async ()=> {
    
    if (state.qrName.length === 0) {
      Toast.show("Please enter a QR name.");
      return
    }

    state.selectedItems = [];

    setIsLoading(true);

    items.forEach(item => {
      item.children.forEach(children => {
        if (children.checked) {
          state.selectedItems.push(children);
        }
      });
    });

    if (state.selectedItems.length === 0) {
      Toast.show("Please select at least 1 contact item.");
      return
    }

    await analytics().logEvent('createQr', state);

    firestore().collection('UserQRCodes').add(state).then(async (docRef) => {
      await analytics().logEvent('createQr', { docRefid : docRef.id});
      firestore().collection('UserQRCodes').doc(docRef.id).get().then(async documentSnapshot => {
        await analytics().logEvent('createQr', { isExist : documentSnapshot.exists});
        if (documentSnapshot.exists) {
          setIsLoading(false);
          console.log('User data: ', documentSnapshot.data());
          navigation.navigate("CreateQR/ShowQR", { qr : { key: documentSnapshot.id, ...documentSnapshot.data() }, title: "QR : " + state.qrName });
        }
      })
    });
  }

  isAnyInformationDefined = ()=> {
    let informationCount = 0;
    items.forEach(item => {
      item.children.forEach(children => {
        informationCount++;
      });
    });

    console.log(informationCount)
    return informationCount > 0;
  }

  return (
    isAnyInformationDefined() ?
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <View style={styles.inputContainer}>
        <Image source={require("../../assets/icons/qrCode.png")} style={styles.qrCodeIcon} />
        <TextInput 
          value={state.qrName}
          style={styles.inputText}
          numberOfLines={1}
          placeholder={i18n.t("createQrQrNamePlaceHolder")}
          placeholderTextColor="#b5c1c9"
          maxLength={30}
          onChangeText={(x) => setState({ ...state, qrName: x })}
          onFocus={(x) => setShowModal(false)}
        />
      </View>

      <TextInput
        value={state.qrDescription}
        style={[styles.textArea]}
        numberOfLines={4}
        placeholder={i18n.t("createQrQrDescriptionPlaceHolder")}
        placeholderTextColor="#b5c1c9"
        onChangeText={(x) => setState({ ...state, qrDescription: x })}
        multiline={true}
        onFocus={(x) => setShowModal(false)}
      />

      <View style={styles.contactContainer}>
        <Text style={styles.textStyle}>
          {i18n.t("createQrSelectorText")}
        </Text>
        <TouchableOpacity style={styles.chooseItemsContainer} onPress={()=> { setShowModal(true); Keyboard.dismiss(); }}>
          <Text style={[styles.textStyle, {color:"#b5c1c9"}]}>{getSelectedItemCount()}</Text>
          <Image source={require("../../assets/icons/triangle.png")} style={{width:15, height:8}}></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text style={{ color : "#000" }}>{i18n.t("createQrAllowUsersChat")}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={state.isChatEnabled ? "#f69833" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setState({ ... state, isChatEnabled : !state.isChatEnabled })}
          value={state.isChatEnabled}
        />
      </View>

      <SaveCancelButton 
        navigation={ navigation }
        onCancelPress = { ()=> navigation.navigate("Store") }
        onSavePress={createQrCode}
        page="CreateQR"
      />

      <BottomModal
          visible={showModal}
          onTouchOutside={() => setShowModal(false)}
          height={0.5}
          width={1}
          onSwipeOut={() => setShowModal(false)}
          modalTitle={<ModalTitle title={i18n.t("createQrSelectorText")} />}
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
                    <Text style={styles.listCaptionStyle}>{item.name} ({item.children.length})</Text>
                    <FlatList data={item.children} style={{ width: "100%"}} renderItem={({ item, index }) => {
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
                        <TouchableOpacity style={styles.listItemContainer}>
                          <Text style={styles.textStyle}>{text}</Text>
                          <ModalButton
                            text=""
                            onPress={() => { items[parentItemIndex].children[index].checked=!items[parentItemIndex].children[index].checked; setItems(items => [ ... items ]); }}
                            style={{position: 'absolute', width: "100%"}}
                          />
                          { item.checked ? <Image source={require("../../assets/icons/confirm.png")} style={{width:20, height: 20}} /> : null}
                        </TouchableOpacity>
                      )
                    }} />
                  </View>
              )}} />
            </SafeAreaView>
          </ModalContent>
        </BottomModal>
    </View>
    :
    <SafeAreaView style={styles.noInfoContainer}>
      <Image source={require('../../assets/onboarding/step2.png')} />
      <Text style={[styles.noInfoText, {fontSize:18}]}>{i18n.t("createQrBeforeCreateWarningText")}</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.noInfoText}>{i18n.t("createQrProvideFromText")}</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Settings")}>
          <Text style={[styles.noInfoText,{color:"#f69833"}]}>{i18n.t("createQrSettingsLinkText")}</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.noInfoText,{color:"#e0dfdf"}]}>{i18n.t("createQrORText")}</Text>
      <TouchableOpacity onPress={()=> navigation.navigate("CreateQR/AddAddress", { title: "Add Address" })}>
        <Text style={[styles.noInfoText,{color:"#f69833"}]}>{i18n.t("createQrAddAddressLinkText")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("CreateQR/AddPhone", { title: "Add Phone Number" })}>
        <Text style={[styles.noInfoText,{color:"#f69833"}]}>{i18n.t("createQrAddPhoneNumberLinkText")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("CreateQR/AddSocial", { title: "Add Social Media Account" })}>
        <Text style={[styles.noInfoText,{color:"#f69833"}]}>{i18n.t("createQrAddSocialMediaAccountLinkText")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("CreateQR/AddEmail", { title: "Add Email Address" })}>
        <Text style={[styles.noInfoText,{color:"#f69833"}]}>{i18n.t("createQrAddEmailAddressLinkText")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
    paddingVertical: 10,
    paddingHorizontal: 17,
    justifyContent: "space-between"
  },
  noInfoContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f4f4f4",
    padding: 30
  },
  noInfoText:{
    fontFamily: "SF-Pro-Display",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#889299",
    textAlign: 'center',
    marginBottom: 10
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
    paddingLeft: 17,
    marginBottom: 20
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