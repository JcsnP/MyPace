import React from "react";
import { View, Text, Image } from "react-native";

// import style
import styles from '../styles';


export default function SensorReportScreen() {
  return(
    <View style={[styles.container, {display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
      <Text style={styles.warningTitle}>Sorry</Text>
      <Text style={[styles.title, {textAlign: 'center'}]}>Your device does not support the use of this application.</Text>
      <Image style={{width: 300, height: 300}} source={require('../../assets/thinking.png')} />
    </View>
  );
}