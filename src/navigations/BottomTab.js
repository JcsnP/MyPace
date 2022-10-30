import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MYPACE_API } from "@env";

// import pages
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ReportScreen from '../screens/ReportScreen';

// import stack
import SettingStack from './SettingStack';
import axios from 'axios';

// bottom tab navigation
const Tab = createBottomTabNavigator();

const BottomTabsMain = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  // get token function
  const _getToken = async() => {
    setToken(await AsyncStorage.getItem('@Token'));
  }

  // store user details function
  const _storeDetails = async(user) => {
    await AsyncStorage.setItem('UserDetails', JSON.stringify(user));
  }

  useEffect(() => {
    // get token
    _getToken();

    // authen to store user's data
    axios.get(`${MYPACE_API}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      if(response.data.status === 'ok') {
        _storeDetails(response.data.user);
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  })

  return(
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {
          backgroundColor: '#1B1B1B',
          borderTopColor: '#000000',
          borderTopWidth: 1
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingStack}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomTabs() {
  return(
    <BottomTabsMain />
  );
}