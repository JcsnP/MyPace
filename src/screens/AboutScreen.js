import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";

// import style
import styles from "../styles";

export default function AboutScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>About</Text>
      <View style={{backgroundColor: '#1B1B1B', width: '100%'}}>
        <Text style={{color: '#FFF', fontWeight: '700'}}>
          แอปนี้กำลังอยู่ในขั้นตอนการพัฒนา บลาๆๆๆ
        </Text>
      </View>
    </SafeAreaView>
  );
}