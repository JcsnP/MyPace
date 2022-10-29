import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {StyleSheet, Text, View} from 'react-native';

import styles from '../styles';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  })

  const handleGetToken = async() => {
    const token = await AsyncStorage.getItem('@Token');
    if(token) {
      navigation.replace('Authen');
    } else {
      navigation.replace('App');
    }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Splash</Text>
    </View>
  );
}