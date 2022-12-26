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
  const token = useContext(TokenContext).token;
  
  useEffect(() => {
    const fetchAllBadges = async() => {
      const response = await axios.get(`${MYPACE_API}/badges`);
      if(response.data.status === 200) {
        setAllBadges(response.data.badges);
      }
    }

    const fetchMyBadges = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/users/me/badges`, {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        });
        if(response.data.status === 200) {
          setMyBadges(response.data.badges);
        }
      } catch(error) {
        console.log(error);
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
          <Text style={[customStyles.status, customStyles.unlock]}>ปลดล็อกแล้ว</Text>
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
        <Text style={[customStyles.status, customStyles.lock]}>ยังไม่ปลดล็อก</Text>
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
              <View style={customStyles.badgeChild} key={key}>
                {checkBadge(badge, key)}
              </View>
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
  lock: {
    color: '#999'
  },
  unlockBox: {
    backgroundColor: '#FFFF99'
  },
  lockBox: {
    backgroundColor: '#666'
  }
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
