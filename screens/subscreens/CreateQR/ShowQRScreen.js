//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image, Linking, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { windowWidth } from '../../../utils/Dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { Picker} from '@react-native-picker/picker';
import * as Print from 'expo-print';
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Permissions from 'expo-permissions';

import i18n from 'i18n-js';

// create a component
const ShowQRScreen = ({ navigation, route }) => {
  const qr = route.params.qr;
  
  const [qrGenerator, setQrGenerator] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const [product,setProduct] = useState(1);

  const qrKey = "https://findy.croone.co.uk/qr?code=" + qr.key;
  const orderUrl = "https://findy.croone.co.uk/order?code=" + qr.key+"&product="+product;

  saveAsPDF = async () => {
    await qrGenerator.toDataURL(async (dataURL) => {
      try {
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Pdf Content</title>
              <style>
                  body {
                      font-size: 16px;
                      color: #000;
                  }
        
                  h1 {
                      text-align: center;
                  }
              </style>
          </head>
          <body>
              <h1>@findy</h1>
              <img src="data:image/jpeg;base64,`+ dataURL +`"></img>
              <h1>`+qr.qrDescription+`</h1>
          </body>
          </html>`;

        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        
        if (Platform.OS === "ios") {
          await Sharing.shareAsync(uri);
        } else {
          await Sharing.shareAsync(uri);
        }
      } catch (err) {
          console.log(err);
      }
    });
  }

  saveAsImage = async () => {
    await qrGenerator.toDataURL(async (dataURL) => {
      
      const filename = FileSystem.documentDirectory + qr.qrName + ".png";
      
      if (Platform.OS === "ios") {
        
          await FileSystem.writeAsStringAsync(filename, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
          });
  
          await Sharing.shareAsync(filename);
      } else {
        await FileSystem.writeAsStringAsync(filename, dataURL, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(filename);
      }

      
    });
  }

  useEffect(()=> {
    if (route.params.qr) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight:15}}
            onPress={()=> {
              setIsLoading(true);
              firestore()
              .collection('UserQRCodes')
              .doc(route.params.qr.key)
              .delete()
              .then(() => {
                console.log('QR deleted!');
                setIsLoading(false);
                navigation.goBack();
              });
            }}
          >
            <View>
              <FontAwesome5 name="trash" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        )
      })
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />
      
      { qr.qrDescription ? 
      <Text style={styles.textStyle}>
        {qr.qrDescription}
      </Text>
      :
      null}

      <View style={styles.rectangle}>
        <QRCode
          value={qrKey}
          size={windowWidth/2}
          getRef={(c)=> setQrGenerator(c)}
        />
      </View>
      
      <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity style={styles.buttonContainer} onPress={saveAsPDF}>
          <Image source={require("../../../assets/icons/pdf.png")} style={{ width: 45, height: 45 }}></Image>
          <Text style={[styles.textStyle, { color: "#f69833", marginBottom:0 }]}>{i18n.t("showQRSaveOrShareAs")}</Text>
          <Text style={[styles.textStyle, { color: "#f69833", marginBottom:0 }]}>{i18n.t("showQRaPDFFile")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={saveAsImage}>
          <Image source={require("../../../assets/icons/image.png")} style={{ width: 45, height: 45 }}></Image>
          <Text style={[styles.textStyle, { color: "#f69833", marginBottom:0 }]}>{i18n.t("showQRSaveOrShareAs")}</Text>
          <Text style={[styles.textStyle, { color: "#f69833", marginBottom:0 }]}>{i18n.t("showQRanImageFile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 25}} onPress={()=> { Linking.openURL(qrKey+"&m=1") }}>
          <Text style={[styles.textStyle, { color: "#b5c1c9", marginBottom:0 }]}>{i18n.t("showQRLookWhatTheyWillSee")}{" "}</Text>
          <FontAwesome5 name="external-link-alt" size={15} color="#b5c1c9" />
        </TouchableOpacity> 
      </View>

      <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between", alignItems:"center", marginTop: 15}}>
        <Text style={[styles.textStyle, { color: "#000", marginBottom:0 }]}>Get this QR as : </Text>
        <Picker selectedValue={product}
          style={styles.pickerStyle}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) => {
            setProduct(itemValue)
          }}> 
          <Picker.Item label="Luggage Tag (9.90£)" value="1" />
          <Picker.Item label="Key Tag (9.90£)" value="2" />
        </Picker>
      </View>

      <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginTop:15 }}>
        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: "#f69833", borderRadius: 7, padding: 15}} 
          onPress={()=> { Linking.openURL(orderUrl) }}
        >
          <Text style={[styles.textStyle, { color: "#FFF", marginBottom:0 }]}>Order Now! {" "}</Text>
          <FontAwesome5 name="external-link-alt" size={15} color="#FFF" />
        </TouchableOpacity> 
      </View>
      
    </ScrollView>
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
  rectangle : {
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
    width: "100%",
    alignItems:'center',
    padding: 30,
    marginBottom: 20
  },
  buttonContainer: {
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
    padding: 10,
    alignItems: "center",
    width: (windowWidth - 60) / 2
  },
  textStyle : {
    fontFamily: "SF Pro Display",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b5c1c9",
    marginBottom: 10
  },
  pickerStyle: {
    width: '70%',
    height: 44
  },
  pickerItem: {
    height: 44
  }
});

//make this component available to the app
export default ShowQRScreen;
