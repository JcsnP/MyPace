import React from "react";
import { View, Text } from "react-native";

export default function SatisticsCard() {
  return(
    <>
      <Text style={{color: "#fff", fontWeight: '800', fontSize: 25, alignSelf: 'flex-start'}}>Statistics</Text>
      <View style={{display: 'flex', flexDirection: 'column', width: '100%', padding: 20, backgroundColor: '#212121', borderRadius: 7, marginVertical: 7, shadowColor: '#000000', shadowRadius: 1, shadowOffset: {width: 4, height: 4}, marginBottom: 10, borderWidth: 1, borderColor: '#3D3D3D'}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>Paces Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>4,519</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>KCAL Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>230</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>Distance Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>{3200 / 1000}</Text>
        </View>
      </View>
    </>
  );
}