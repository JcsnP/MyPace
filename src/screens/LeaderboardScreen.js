import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

// import style
import styles from '../styles';

// import components
import UserCard from "../components/leaderboard/UserCard";

// import mockup data
import users from "../data/users";

export default function LeaderboardScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={{color: '#D70040', fontSize: 30, textTransform: 'uppercase', fontWeight: '800', textAlign: 'right'}}>Total</Text>
      <ScrollView>
        {
          users.map((user) => (
            <UserCard name={user.name} paces={user.paces} />
          ))
        }
      </ScrollView>
    </View>
  );
}