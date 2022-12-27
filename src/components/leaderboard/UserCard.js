import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function UserCard({name, paces, image}) {
  console.log(name)
  return(
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{paces.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    alignItems: 'center'
  },
  text: {
    color: '#A9A9A9',
    fontSize: 19,
    fontWeight: '700'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: '100%',
    backgroundColor: '#333'
  }
});