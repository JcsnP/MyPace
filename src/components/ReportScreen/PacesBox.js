import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PacesBox({item}) {
  if(!!item) {
    return(
      <View style={styles.card}>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        <View style={styles.flexContainer}>
          <View>
            { /* เดิมทีมีข้อมูลที่ผิดพลาด ทำให้แอปไม่แสดงคอมม่าในตัวเลขบางชุด เลยลองบังคับให้ทำการแปลงข้อมูลเป้นตัวเลข */ }
            <Text style={styles.key}>{ Number(item.details.paces).toLocaleString() }</Text>
            <Text style={styles.value}>Paces</Text>
          </View>
          <View>
            <Text style={styles.key}>{item.details.kcal}</Text>
            <Text style={styles.value}>KCAL</Text>
          </View>
          <View>
            <Text style={styles.key}>{item.details.mins}</Text>
            <Text style={styles.value}>MINS</Text>
          </View>
        </View>
      </View>
    );
  }
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 15
  },
  key: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  value: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  }
});