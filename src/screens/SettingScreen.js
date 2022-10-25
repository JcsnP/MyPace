import React, { useState } from "react";
import { View, Text } from "react-native";

// import style
import styles from '../styles';

export default function SettingScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
    </View>
  );
}