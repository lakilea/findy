//import liraries
import React, { Component } from 'react';

// create a component
class AlertOzkan extends Component {
  static show = ({message}) =>{
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  render() {
    return null;
  }
}

//make this component available to the app
export default AlertOzkan;
