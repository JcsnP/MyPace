import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';

// import context
import TokenContext from "../contexts/TokenContext";
import PacesContext from "../contexts/PacesContext";
import UserContext from "../contexts/UserContext";

export default function LoadingScreen({navigation}) {
  const {paces, setPaces} = useContext(PacesContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isPacesLoaded, setIsPacesLoaded] = useState(false);

  // context
  const token = useContext(TokenContext).token;
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    // get paces history
    const fetchPacesHistory = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/users/paces`, {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        if(response.data.status === 200) {
          setPaces(response.data.history);
          setIsPacesLoaded(true);
        }
      } catch(error) {
        console.log(error);
      }
    }
    
    // fetch user information
    const fetchUser = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/users/me`, {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        });
        if(response.data.status === 200) {
          setUser(response.data.user);
          setIsUserLoaded(true);
        }
      } catch(error) {
        console.log(error);
        console.warn(error.message);
      }
    }

    // call method
    fetchUser();
    // call method
    fetchPacesHistory();

    if(isUserLoaded && isPacesLoaded) {
      setTimeout(() => {
        navigation.replace('App');
      }, 1000);
    } else {
      return Alert.alert('Unable to load data.')
    }
  }, [isPacesLoaded, isUserLoaded]);

  return(
    <View style={[styles.container, {display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}]}>
      <ActivityIndicator size="large" />
      <Text style={{color: '#777', fontWeight: 'bold', fontSize: 35, marginVertical: 10}}>Loading...</Text>
      <Text style={{color: '#777', fontWeight: 'bold', fontSize: 15, marginVertical: 10}}>รอแปปน้าาา กำลังโหลดข้อมูล</Text>
    </View>
  );
}