import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function LogoutButton() {
  return(
    <TouchableOpacity style={styles.card} onPress={() => {alert('bye')}}>
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