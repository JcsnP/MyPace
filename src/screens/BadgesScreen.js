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
  const [myBadges, setMyBadges] = useState([]);
  const token = useContext(TokenContext).token;
  const isFocused = useIsFocused();
  
  useEffect(() => {
    const fecthBadges = async() => {
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

    if(isFocused) {
      fecthBadges();
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
            myBadges.map((item, key) => (
              <BadgeBox badge={item} key={key} />
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
