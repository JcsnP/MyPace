import React from "react";
import { View, Text } from "react-native";

export default function SatisticsCard({information}) {
  const paces_average = information.map(item => (item.details.paces)).reduce((a, b) => a + b, 0) / information.length;
  const kcal_average = information.map(item => (item.details.kcal)).reduce((a, b) => a + b, 0) / information.length;
  const distance_average = information.map(item => (item.details.distance)).reduce((a, b) => a + b, 0) / information.length;
  return(
    <>
      <Text style={{color: "#fff", fontWeight: '800', fontSize: 25, alignSelf: 'flex-start'}}>Statistics</Text>
      <View style={{display: 'flex', flexDirection: 'column', width: '100%', padding: 20, backgroundColor: '#212121', borderRadius: 7, marginVertical: 7, shadowColor: '#000000', shadowRadius: 1, shadowOffset: {width: 4, height: 4}, marginBottom: 10, borderWidth: 1, borderColor: '#3D3D3D'}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>Paces Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>{paces_average.toFixed(0).toLocaleString()} Paces</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>KCAL Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>{kcal_average.toFixed(2)} Kcal</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>Distance Average</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>{(distance_average / 1000).toFixed(2)} KM</Text>
        </View>
      </View>
    </>
  );
}