import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";

export default function UserInfoCard() {
  const [user, setUser] = useState({});

  const readUser = async() => {
    try {
      const temp = await AsyncStorage.getItem('UserData');
      setUser(await JSON.parse(temp));
      console.log('dob ' + user.information.dob)
    } catch(error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    readUser();
  }, []);

  return(
    <View style={styles.card}>
      <View style={styles.flexContainer}>
        <View style={styles.data}>
          <Text style={styles.key}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Age</Text>
          <Text style={styles.value}>dob</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Height</Text>
          <Text style={styles.value}>d</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Weight</Text>
          <Text style={styles.value}>d</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Gender</Text>
          <Text style={styles.value}>s</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  key: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 18
  },
  value: {
    color: '#D1D1D1',
    fontWeight: '800',
    fontSize: 18
  }
});