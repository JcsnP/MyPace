import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MYPACE_API } from '@env';

import styles from '../styles';

export default function SplashScreen({navigation}) {
  const [advice, setAdvice] = useState({});
  const [isAdvicesLading, setAdvicesLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/advice`);
        setAdvice(response.data.advice)
        setAdvicesLoading(false);
      } catch(error) {
        console.log(error);
      }
    }

    // fetch advices from database
    fetchAdvice();

    setTimeout(() => {
      handleGetToken();
    }, 3000);
  }, [])

  const handleGetToken = async() => {
    let token = await AsyncStorage.getItem('@Token');
    if(!token) {
      navigation.replace('Login');
      // navigation.replace('Avatar')
    } else {
      navigation.replace('App');
    }
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
        <Text style={customStyle.title}>MYPACE</Text>
        {
          !isAdvicesLading && (
            <Text style={customStyle.advice}>"{advice.message}"</Text>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const customStyle = StyleSheet.create({
  title: {
    color: '#FFF',
    fontSize: 80,
    fontWeight: '800',
    textAlign: 'center'
  },
  advice: {
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 17,
    paddingHorizontal: 10,
  }
});