import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { MYPACE_API } from "@env";

export default function HiglightBox() {
  return(
    <>
      <View style={customStyles.card}>
        <Text style={customStyles.textHighlight}>Highlight</Text>
        <Text style={{fontSize:15,color:'#FFFFFF',fontWeight:'bold',marginBottom:5,paddingTop:3}}>Your total number of steps walked this week.</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20,}}>15,000</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 17}}> Paces</Text>
        </View>
        <View style={customStyles.rankBackground}>
          <View style={customStyles.currentRank}>
            <Text style={customStyles.rank}>THIS WEEK</Text>
          </View>
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
    height:'25%'
  },
  rankBackground: {
    borderRadius: 100,
    backgroundColor: '#918d8e',
  },
  textHighlight: {
    fontSize: 20,
    color:'#F81250',
    fontWeight:'bold',
    marginBottom:10,
    textTransform: 'uppercase'
  },
  rank: {
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  currentRank: {
    borderRadius: 100,
    backgroundColor: '#F81250',
    width: '50%'
  }
});