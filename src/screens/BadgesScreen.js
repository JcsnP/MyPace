import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import token context
import TokenContext from "../contexts/TokenContext";

export default function BadgesScreen() {
  const [allBadges, setAllBadges] = useState([]);
  const [myBadges, setMyBadges] = useState([]);
  const token = useContext(TokenContext);
  useEffect(() => {
    const fetchAllBadges = async() => {
      const response = await axios.get(`${MYPACE_API}/badges`);
      if(response.data.status === 200) {
        setAllBadges(response.data.badges);
      }
    }

    const fetchMyBadges = async() => {
      const response = await axios.get(`${MYPACE_API}/users/me/badges`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
      if(response.data.status === 200) {
        setMyBadges(response.data.badges);
      }
    }

    fetchAllBadges();
    fetchMyBadges();
  }, []);

  const checkBadge = (badge, key) => {
    if(myBadges.includes(badge._id)) {
      return (
        <View style={customStyles.badgeBox} key={key}>
          <Image
            style={customStyles.badge}
            source={{
              uri: badge.picture
            }}
          />
          <Text style={customStyles.title}>{badge.title}</Text>
          <Text style={customStyles.title}>ปลดล็อกแล้ว</Text>
        </View>
      )
    }
    return (
      <View style={customStyles.badgeBox} key={key}>
        <Image
          style={customStyles.badge}
          source={{
            uri: badge.picture
          }}
        />
        <Text style={customStyles.title}>{badge.title}</Text>
        <Text style={customStyles.title}>ยังไม่ปลดล็อก</Text>
      </View>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>Badges</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {
            allBadges.map((badge, key) => (
              checkBadge(badge, key)
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  badge: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  badgeBox: {
    marginBottom: 20,
  },
});

/*
{
  allBadges.map((badge, key) => {
    return(
      <View style={customStyles.badgeBox} key={key}>
        <Image
          style={customStyles.badge}
          source={{
            uri: badge.picture
          }}
        />
        <Text style={customStyles.title}>{badge.title}</Text>
      </View>
    );
  })
}
*/