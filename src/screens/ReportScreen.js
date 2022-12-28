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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(paces.length !== 0) {
      setIsLoaded(true);
    }
  }, []);

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
              <HiglightBox weekpaces={paces.slice(0, 7).map(item => (item.details.paces))} />
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