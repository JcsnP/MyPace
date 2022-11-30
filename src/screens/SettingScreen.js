import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';

// import components
import SettingCard from '../components/setting/SettingCard';
import LogoutButton from '../components/setting/LogoutButton';
import UserInfoCard from '../components/setting/UserInfoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchUserDetails() {
    setUser(JSON.parse(await AsyncStorage.getItem('UserDetails')));
    setIsLoaded(true);
  }

  // const isFocused = useIsFocused();
  useEffect(() => { 
    fetchUserDetails();
  }, [isLoaded])

  const useCard = () => {
    if(isLoaded) {
      return <UserInfoCard user={user} />;
    } else {
      return(
        <View style={customStyles.card}>
          <Text>Information loading...</Text>
        </View>
      );
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      {
        useCard()
      }
      <SettingCard label='Edit Profile' icon='account-edit' onPress={() => {navigation.navigate('EditInformationScreen')}} />
      <SettingCard label='Badges' icon='trophy-award' onPress={() => {navigation.navigate('BadgesScreen')}} />
      <SettingCard label='About' icon='progress-question' onPress={() => {navigation.navigate('AboutScreen')}} />
      <LogoutButton />
    </View>
  );
}

const customStyles = StyleSheet.create({
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
    marginVertical: 4
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  key: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 18
  },
  value: {
    color: '#D1D1D1',
    fontWeight: '800',
    fontSize: 18
  }
});