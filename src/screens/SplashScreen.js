import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import styles from '../styles';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
       handleGetToken();
    }, 2000);
  })

  const handleGetToken = async() => {
    let token = await AsyncStorage.getItem('@Token');
    if(!token) {
      navigation.replace('Authen');
    } else {
      navigation.replace('App');
    }
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
        <Image
          style={customStyle.img}
          source={require('../../assets/man-walking.png')}
        />
        <Text style={customStyle.title}>MYPACE</Text>
      </View>
    </SafeAreaView>
  );
}

const customStyle = StyleSheet.create({
  img: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: '60',
    fontWeight: '800',
    textAlign: 'center'
  }
});