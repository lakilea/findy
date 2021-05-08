'use strict'
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

class StatusBarBackground extends Component{
  render(){
    return(
      <View style={[styles.statusBarBackground, this.props.style || {}]}> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? getStatusBarHeight() : 0,
    backgroundColor: "white",
  }

})

module.exports= StatusBarBackground