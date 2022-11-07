// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { MYPACE_API } from "@env";

// import style
import styles from '../styles';

// import components
import PacesBox from "../components/ReportScreen/PacesBox";
import HiglightBox from "../components/ReportScreen/HiglightBox";

// import TokenContext
// import { TokenContext } from "../navigations/BottomTab";
import TokenContext from "../contexts/TokenContext";

export default function ReportScreen() {
  const [paces, setPaces] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  const token = useContext(TokenContext);

  useEffect(() => {
    axios.get(`${MYPACE_API}/users/paces`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      setPaces(response.data[0]);
      setIsLoaded(true);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }, [isLoaded])

  if(paces.history != 0) {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Report</Text>
        <ScrollView style={{width: '100%', height: '100%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
        >
          { /* ค่อยเอาเวลามาใส่ระบบคำนวณการเดินเฉลี่ย */ }
          {
            isLoaded && (
              <HiglightBox />
            )
          }
          {
            isLoaded && (
              paces.history.map((item, key) => {
                return(
                  <PacesBox item={item} key={key} />
                );
              })
            )
          }
        </ScrollView>
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