import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
  const [user, setUser] = useState(null);
  const [appSettings,setAppSettings] = useState({
    language:null
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        appSettings,
        setAppSettings,
        login: async (email, password, errorCallback) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            if (errorCallback)
              errorCallback(e.code);
          }
        },
        register: async (email, password, errorCallback) => {
          try {
            authState = { hasError: false };
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            if (errorCallback)
              errorCallback(e.code);
          }
        },
        logout: async () => {
          try {
            authState = { hasError: false };
            await auth().signOut();
          } catch (e) {
            authState = { hasError: true, error: e.code };
          }
        },
        googleLogin: async (errorCallback) => {
          try {
            const { idToken } = await GoogleSignin.signIn();
            
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            if (errorCallback)
              errorCallback(e.code);
            authState = { hasError: true, error: e.code };
          }
        },
        fbLogin: async (errorCallback) => {
          try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
          } catch (e) {
            if (errorCallback)
              errorCallback(e.code);
            authState = { hasError: true, error: e.code };
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}