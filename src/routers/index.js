import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from '../navigations/BottomTab';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InformationScreen from '../screens/InformationScreen';

const Stack = createStackNavigator();

export default function() {
  {/* remove 'gestureEnabled: false' in screenOption for enable user go to previous screen */}
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Information' component={InformationScreen} />
      <Stack.Screen name='App' component={BottomTabs} />
    </Stack.Navigator>
  );
}