import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function SettingCard({ label, icon, onPress }) {
  const color = '#A9A9A9';
  const size = 20;
  return(
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <Text style={{color: color, fontSize: 18}}>{label}</Text>
      <MaterialCommunityIcons name={icon} color={color} size={size} />
    </TouchableOpacity>
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
  }
});