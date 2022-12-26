// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import { MYPACE_API } from "@env";

// import style
import styles from '../styles';

// import components
import PacesBox from "../components/ReportScreen/PacesBox";
import HiglightBox from "../components/ReportScreen/HiglightBox";

// import TokenContext
import TokenContext from "../contexts/TokenContext";
import PacesContext from "../contexts/PacesContext";

const Item = ({ item }) => (
  <PacesBox item={item} />
);

export default function ReportScreen() {
  // const [paces, setPaces] = useState([]);
  const {paces} = useContext(PacesContext);
  const [weekpaces, setWeekPaces] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const token = useContext(TokenContext).token;

  useEffect(() => {
    if(paces.length !== 0) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    axios.get(`${MYPACE_API}/users/paces/life`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      if(response.data.status === 200) {
        setWeekPaces(response.data.all);
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  } , [isLoaded]);

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  if(paces.history !== 0) {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Report</Text>
          { /* ค่อยเอาเวลามาใส่ระบบคำนวณการเดินเฉลี่ย */ }
          {
            isLoaded && (
              <HiglightBox weekpaces={weekpaces} />
            )
          }
          {
            isLoaded && (
              <FlatList
                data={paces}
                renderItem={renderItem}
              />
            )
          }
      </View>
    );
  } else {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Report</Text>
        <Text style={{color: '#FFF', fontWeight: '800', fontSize: 17}}>There is no information about your paces.</Text>
      </View>
    );
  }
}