import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { MYPACE_API } from '@env';

// import style
import styles from '../styles';

// import components
import UserCard from "../components/Leaderboard/UserCard";

// import mockup data
import users from "../data/users";

// import context
import TokenContext from "../contexts/TokenContext";

export default function LeaderboardScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const token = useContext(TokenContext).token;
  useEffect(() => {
    axios.get(`${MYPACE_API}/leaderboard`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data)
      if(response.data.status === 200) {
        setLeaderboard(response.data.leaderboard);
        setIsLoaded(true);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }, [isLoaded]);
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={customStyles.header}>
        <Text style={customStyles.subHeader}>Number of paces this week.</Text>
        <Text style={customStyles.total}>Total</Text>
      </View>
      <ScrollView>
        {
          !isLoaded && (
            <ActivityIndicator />
          )
        }
        {
          isLoaded && (
            leaderboard.map((user, key) => (
              <UserCard name={user.username} paces={user.totalPaces} image={user.image} key={key} />
            ))
          )
        }
      </ScrollView>
    </View>
  );
}

const customStyles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeader: {
    color: '#988',
    fontWeight: 'bold',
    fontSize: 14,
  },
  total: {
    color: '#D70040',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: '800'
  }
});