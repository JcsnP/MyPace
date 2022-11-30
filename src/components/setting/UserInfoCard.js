import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function UserInfoCard({ user }) {
  return(
    <>
    <Text style={{color: '#FFF', fontWeight: '800', fontSize: 30, textAlign: 'right', marginBottom: 10}}>👋 Helllo, {user.username}</Text>
    <View style={styles.card}>
      <View style={styles.flexContainer}>
        <View style={styles.data}>
          <Text style={styles.key}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Age</Text>
          <Text style={styles.value}>{new Date().getFullYear() - new Date(user.information.dob).getFullYear()}</Text>
        </View>
         <View style={styles.data}>
          <Text style={styles.key}>Weight</Text>
          <Text style={styles.value}>{user.information.weight}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Height</Text>
          <Text style={styles.value}>{user.information.height}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.key}>Gender</Text>
          <Text style={styles.value}>{(user.information.gender.charAt(0).toUpperCase()+user.information.gender.slice(1))}</Text>
        </View>
      </View>
    </View>
    </>
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