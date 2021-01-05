import React from "react";
import { AuthProvider } from "./AuthProvider";
import Routes from "./Routes";
import { ModalPortal } from 'react-native-modals';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
      <ModalPortal />
    </AuthProvider>
  );
}

export default Providers;