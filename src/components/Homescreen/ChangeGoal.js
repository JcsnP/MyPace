import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ChangeGoal() {
  return(
    <TouchableOpacity 
      style={{borderWidth: 1, borderRadius: 7, paddingVertical: 10, backgroundColor: '#343436', borderColor: '#3D3D3D', width: '80%', alignSelf: 'center', marginVertical: 20, shadowColor: '#111', shadowOpacity: 1, shadowOffset: {width: 0, height: 4}}}
      onPress={() => {alert('Test')}}
      >
      <Text style={{color: '#F81250', textTransform: 'uppercase', fontWeight: '800', fontSize: 25, textAlign: 'center'}}>Change your goal</Text>
    </TouchableOpacity>
  );
}