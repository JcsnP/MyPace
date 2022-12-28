import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { MYPACE_API } from "@env";

export default function HiglightBox({weekpaces}) {
  const DAYS = 7;
  return(
    <>
      <View style={customStyles.card}>
        <Text style={customStyles.textHighlight}>Highlight</Text>
        <Text style={{fontSize:15, color:'#FFFFFF', fontWeight:'bold', marginBottom:5, paddingTop:3}}>Your total number of paces walked this week.</Text>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'baseline'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 24}}>{(weekpaces / DAYS).toLocaleString()}</Text>
          <Text style={{color: '#777', fontWeight: '800', fontSize: 15, marginLeft: 15}}>Paces / Day</Text>
        </View>
        <View style={customStyles.rankBackground}>
          <Text style={customStyles.rank}>THIS WEEK {weekpaces.toLocaleString()}</Text>
        </View>
      </View>
    </>
  );
}

const customStyles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 4,
    height: '30%',
    width: '100%'
  },
  rankBackground: {
    borderRadius: 100,
    backgroundColor: '#B04744',
  },
  textHighlight: {
    fontSize: 20,
    color:'#D70040',
    fontWeight:'800',
    marginBottom:10,
    textTransform: 'uppercase'
  },
  rank: {
    color: '#DDD',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left'
  }
});
