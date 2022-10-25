import React, { useState } from "react";
import { View, Text } from "react-native";

// import style
import styles from '../styles';

export default function LeaderboardScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
    </View>
  );
}