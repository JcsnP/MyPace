import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ChangeGoal() {
  return(
    <TouchableOpacity 
      style={{borderWidth: 1, borderRadius: 7, paddingVertical: 10, backgroundColor: '#212121', borderColor: '#3D3D3D', width: '80%', alignSelf: 'center', marginVertical: 20}}
      onPress={() => {alert('Test')}}
      >
      <Text style={{color: '#FF3654', textTransform: 'uppercase', fontWeight: '800', fontSize: 25, textAlign: 'center'}}>Change your goal</Text>
    </TouchableOpacity>
  );
}