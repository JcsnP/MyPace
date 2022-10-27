import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";

// import style
import styles from "../styles";

export default function AboutScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AboutScreen</Text>
    </SafeAreaView>
  );
}