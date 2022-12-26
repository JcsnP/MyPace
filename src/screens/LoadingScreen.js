import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';

// import context
import TokenContext from "../contexts/TokenContext";

export default function LoadingScreen({navigation}) {
  const [paces, setPaces] = useState([]);

  const token = useContext(TokenContext).token;
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
          if(paces.length !== 0) {
            setIsPaceLoaded(true);
          }
        }
      } catch(error) {
        console.log(error);
      }
    }

    // call method
    fetchPacesHistory();
    console.log(paces);
  }, []);

  return(
    <View style={[styles.container, {display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}]}>
      <ActivityIndicator size="large" />
      <Text style={{color: '#777', fontWeight: 'bold', fontSize: 35, marginVertical: 10}}>Loading...</Text>
      <Text style={{color: '#777', fontWeight: 'bold', fontSize: 15, marginVertical: 10}}>รอแปปน้าาา กำลังโหลดข้อมูล</Text>
    </View>
  );
}