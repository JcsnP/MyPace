import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// import style
import styles from '../styles';

export default function ReportScreen() {
  const [user, setUser] = useState({});


  useEffect(() => {
    AsyncStorage.getItem('UserDetails')
    .then((response) => {
      setUser(JSON.parse(response));
    })
  }, [])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <Text style={styles.title}>Username {user.username}</Text>
    </View>
  );
}