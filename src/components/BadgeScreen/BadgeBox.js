import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function BadgeBox({badge}) {
  const status = (badge.badge) ? 'unlocked' : 'locked';
  return(
    <View style={style.box}>
      <Image source={{uri: badge.picture}} style={style.image} />
      <View style={style.textBox}>
        <Text style={style.title}>{badge.title}</Text>
        <Text style={[style.title, style[status]]}>{status}</Text>
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  box: {
    borderColor: '#333',
    width: 120,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 25,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    
  },
  image: {
    width: 100,
    height: 100
  },
  textBox: {
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  unlocked: {
    color: '#FF3654'
  },
  locked: {
    color: '#777'
  }
});