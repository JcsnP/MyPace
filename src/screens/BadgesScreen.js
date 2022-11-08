import React, { useState } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView } from "react-native";

// import style
import styles from "../styles";

// import data
import badges from "../data/badges";

export default function BadgesScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>Badges</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {
            badges.map((badge, key) => {
              return(
                <View style={customStyles.badgeBox} key={key}>
                  <Image
                    style={customStyles.badge}
                    source={{
                      uri: badge.img
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
    height: 100
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