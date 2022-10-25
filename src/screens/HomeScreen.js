import React, { useState } from "react";
import { Text, View } from 'react-native';

// import style
import styles from '../styles';

// import components

export default function HomeScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
    </View>
  );
}