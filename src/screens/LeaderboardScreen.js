import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { MYPACE_API } from '@env';

// import style
import styles from '../styles';

// import components
import UserCard from "../components/Leaderboard/UserCard";

// import mockup data
import users from "../data/users";

export default function LeaderboardScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    axios.get(`${MYPACE_API}/leaderboard`)
    .then((response) => {
      if(response.data.status === 200) {
        setLeaderboard(response.data.userPaces);
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
      <Text style={{color: '#D70040', fontSize: 30, textTransform: 'uppercase', fontWeight: '800', textAlign: 'right'}}>Total</Text>
      <ScrollView>
        {
          !isLoaded && (
            <ActivityIndicator />
          )
        }
        {
          isLoaded && (
            leaderboard.map((user, key) => (
              <UserCard name={user.user[0].username} paces={user.details.paces} image={user.user[0].image} key={key} />
            ))
          )
        }
      </ScrollView>
    </View>
  );
}

/*
{
          isLoaded && (
            leaderboard.map((user, key) => (
              <UserCard name={user.user} paces={user.details.paces} key={key} />
            ))
          )
        }
*/
