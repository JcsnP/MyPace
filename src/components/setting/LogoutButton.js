import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton() {
  const navigation = useNavigation();
  const Logout = async() => {
    try {
      await AsyncStorage.removeItem('@Token');
      await AsyncStorage.removeItem('UserDetails');
      console.log('logout');
      navigation.navigate('Splash');
    } catch(error) {
      console.log(error.message);
    }
  }
  return(
    <TouchableOpacity style={styles.card} onPress={Logout}>
      <Text style={styles.label}>LOGOUT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#2563EB',
    marginVertical: 4
  },
  label: {
    color: '#FFF',
    fontWeight: '800',
    alignSelf: 'center'
  }
});