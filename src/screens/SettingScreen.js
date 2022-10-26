import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import style
import styles from '../styles';

// import components
import SettingCard from "../components/setting/SettingCard";

export default function SettingScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <SettingCard label='Edit Profile' icon='account-edit' onPress={() => {alert('edit profile')}} />
      <SettingCard label='Badges' icon='trophy-award' onPress={() => {alert('badges')}} />
      <SettingCard label='About' icon='progress-question' onPress={() => {alert('about')}} />
    </View>
  );
}