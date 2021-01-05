import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
        googleLogin: async () => {
          const { idToken } = await GoogleSignin.signIn();
          
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
          return auth().signInWithCredential(googleCredential);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}