// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { MYPACE_API } from "@env";

// import style
import styles from '../styles';

// import components
import { TokenContext } from "../navigations/BottomTab";
import PacesBox from "../components/ReportScreen/PacesBox";
import HiglightBox from "../components/ReportScreen/HiglightBox";

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
        <HiglightBox />
        {
          isLoaded && (
            paces.history.map((item, key) => {
              return(
                <PacesBox item={item} key={key} />
              );
            })
          )
        }
      </View>
    );
  } else {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Report</Text>
        <Text style={{color: '#FFF', fontWeight: '800', fontSize: '17'}}>There is no information about your paces.</Text>
      </View>
    );
  }
}