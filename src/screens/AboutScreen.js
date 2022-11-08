import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";

// import style
import styles from "../styles";

export default function AboutScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>About</Text>
      <View style={{backgroundColor: '#1B1B1B', width: '100%'}}>
        <Text style={{color: '#FFF', fontWeight: '700', marginBottom: 20}}>
          แอปนี้กำลังอยู่ในขั้นตอนการพัฒนา และในขณะนี้แอปมีปัญหาไม่สามารถใช้งานเซ็นเซอร์ได้การนับจำนวนการนับได้บน Android
          (ไงล่ะ รู้สึกพิเศษมั้ยล่ะ คิคิ) ส่วนหน้านี้ก็กะจะเอาไว้ใส่รายละเอียดต่างๆ ที่เกี่ยวข้องกับแอปตัวนี้ ทั้งเรื่องที่มา รายชื่อผู้พัฒนา จุดประสงค์ของแอป
          แล้วก็อะไรก็ได้ที่ผู้พัฒนาอยากใส่ลงไป
        </Text>
        <Text style={{color: '#FFF', fontWeight: '700', marginBottom: 20, display: 'flex', flexDirection: 'row'}}>
          <View style={{backgroundColor: 'yellow', padding: 3, borderRadius: 7, borderWidth: 2}}>
            <Text style={{color: '#000', fontWeight: '700'}}>@JcsnP</Text>
          </View>
          <View style={{backgroundColor: 'yellow', padding: 3, borderRadius: 7, borderWidth: 2}}>
            <Text style={{color: '#000', fontWeight: '700'}}>@Sarith</Text>
          </View>
          <View style={{backgroundColor: 'yellow', padding: 3, borderRadius: 7, borderWidth: 2}}>
            <Text style={{color: '#000', fontWeight: '700'}}>@Jam</Text>
          </View>
        </Text>
      </View>
    </SafeAreaView>
  );
}