import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function ActivityCard(activity) {
  const [kcal, setKcal] = useState(0);

  const caloriesCalculator = () => {
    // TEST
    setKcal(activity.paces * 0.04);
  }

  useEffect(() => {
    caloriesCalculator();
  }, [activity.paces]);

  return(
    <>
      <Text style={{color: "#fff", fontWeight: '800', fontSize: 25, alignSelf: 'flex-start' }}>Activity</Text>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 20, backgroundColor: '#212121', borderRadius: 7, marginVertical: 7, shadowColor: '#000000', shadowRadius: 1, shadowOffset: {width: 4, height: 4}, marginBottom: 10, borderWidth: 1, borderColor: '#3D3D3D'}}>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>{typeof(activity.paces) === 'string' ? 0 : activity.paces.toLocaleString()}</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 15}}>Paces</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>50</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 15}}>Mins</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>{3500 / 1000}</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 15}}>KM</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 20}}>{isNaN(kcal) ? 0 : kcal.toFixed(2)}</Text>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 15}}>KCAL</Text>
        </View>
      </View>
    </>
  );
}
