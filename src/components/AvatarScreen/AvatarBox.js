import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function AvatarBox({item, status}) {
  return(
    <View style={customStyle.card}>
      <Image source={{uri: item.image}} style={[customStyle.image, customStyle[status]]} />
    </View>
  );
}

const customStyle = StyleSheet.create({
  card: {
    marginBottom: 12
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: '100%',
    borderWidth: 3,
    borderColor: '#333',
  },
  choosed: {
    backgroundColor: '#bf6c60'
  }
});