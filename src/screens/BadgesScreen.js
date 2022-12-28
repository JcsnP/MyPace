import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import token context
import TokenContext from "../contexts/TokenContext";

// import components
import BadgeBox from "../components/BadgeScreen/BadgeBox";

export default function BadgesScreen() {
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [lockedBadges, setLockedBadges] = useState([]);
  const token = useContext(TokenContext).token;
  const isFocused = useIsFocused();
  
  useEffect(() => {
    const fecthUnlockedBadges = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/users/me/badges/unlocked`, {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        });
        if(response.data.status === 200) {
          setUnlockedBadges(response.data.unlockedBadges);
        }  
      } catch(error) {
        console.log(error);
      }
    }

    const fecthLockedBadges = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/users/me/badges/locked`, {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        });
        if(response.data.status === 200) {
          setLockedBadges(response.data.lockedBadges);
        }  
      } catch(error) {
        console.log(error);
      }
    }

    if(isFocused) {
      fecthUnlockedBadges();
      fecthLockedBadges();
    }
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>Badges</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {
            unlockedBadges.map((item, key) => (
              <BadgeBox badge={item} status="unlocked" />
            ))
          }
          {
            lockedBadges.map((item, key) => (
              <BadgeBox badge={item} status="locked" />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  badge: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 2
  },
  title: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 4,
    height: 45,
    alignSelf: 'center'
  },
  status: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 2,
  },
  badgeBox: {
    alignSelf: 'center',
  },
  badgeChild: {
    display: 'inline-block',
    flexGrow: 1,
    margin: 20,
    backgroundColor: '#212121',
    width: 100,
    borderRadius: 7,
    padding: 10
  },
  unlock: {
    color: '#CC0000'
  },
});
