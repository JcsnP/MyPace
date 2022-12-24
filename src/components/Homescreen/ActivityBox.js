import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function ActivityBox({icon, value, unit, message}) {
  const color = '#A9A9A9';
  const size = 25;
  return(
    <View style={style.card}>
      <MaterialCommunityIcons name={icon} color={color} size={size} />
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={style.value}>{parseFloat(value).toFixed(2)}</Text>
        <Text style={style.unit}>{unit}</Text>
      </View>
      <Text style={style.message}>{message}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    width: '32%',
    height: 110,
    backgroundColor: '#212121',
    borderRadius: 7,
    padding: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#3D3D3D'
  },
  value: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600'
  },
  unit: {
    color: '#777',
    fontSize: 17,
    fontWeight: '600'
  },
  message: {
    color: '#777',
    fontSize: 15,
    fontWeight: '500'
  }
});