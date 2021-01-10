//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { windowWidth } from '../../../utils/Dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import * as Print from 'expo-print';
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

// create a component
const ShowQRScreen = ({ navigation, route }) => {
  const qr = route.params.qr;
  const qrKey = "https://findy.croone.co.uk/qr?code=" + qr.key;
  const [qrGenerator, setQrGenerator] = useState();
  const [isLoading,setIsLoading] = useState(false);

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

      await FileSystem.writeAsStringAsync(filename, dataURL, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(filename);
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
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={ 'Loading...' }
        textStyle={{ color: '#FFF' }}
      />
      <Text style={{ fontSize:30, marginBottom: 5, color: "#000" }}>@findy.ws</Text>
      <QRCode
        value={qrKey}
        size={windowWidth/1.5}
        getRef={(c)=> setQrGenerator(c)}
      />
      <Text style={{ fontSize:20, marginTop: 5, color: "#000", width: "80%", textAlign: "center" }}>
        {qr.qrDescription}
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={saveAsPDF}>
        <Text style={styles.textStyle}>View QR as a PDF file</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={saveAsImage}>
        <Text style={styles.textStyle}>View QR as an image file</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding:10
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    width: '70%',
    margin: 10,
    backgroundColor: "#543c52"
  },
  textStyle : {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: "#FFFFFF"
  },
});

//make this component available to the app
export default ShowQRScreen;
