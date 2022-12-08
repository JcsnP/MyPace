import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import data [mockup data]
// import badges from "../data/badges";

export default function BadgesScreen() {
  const [allBadges, setAllBadges] = useState([]);
  useEffect(() => {
    const fetchAllBadges = async() => {
      const response = await axios.get(`${MYPACE_API}/badges`);
      if(response.data.status === 200) {
        setAllBadges(response.data.badges);
      }
    }

    fetchAllBadges();
  }, []);
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>Badges</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  badge: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  title: {
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  badgeBox: {
    marginBottom: 20,
  }
});