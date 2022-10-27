import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Modal, Pressable, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import style
import styles from '../styles';

// import components
import SettingCard from "../components/setting/SettingCard";
import LogoutButton from "../components/setting/LogoutButton";

export default function SettingScreen({ navigation }) {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <SettingCard label='Edit Profile' icon='account-edit' onPress={() => {alert('edit profile')}} />
      <SettingCard label='Badges' icon='trophy-award' onPress={() => {navigation.navigate('BadgesScreen')}} />
      <SettingCard label='About' icon='progress-question' onPress={() => {navigation.navigate('AboutScreen')}} />


      <LogoutButton />
    </View>
  );
}