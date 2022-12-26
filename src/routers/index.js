import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from '../navigations/BottomTab';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InformationScreen from '../screens/InformationScreen';
import AvatarScreen from '../screens/AvatarScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

// token context
import TokenContext from '../contexts/TokenContext';
import PacesContext from '../contexts/PacesContext';

export default function() {
  const [token, setToken] = useState('');
  const token_value = {token, setToken};
  const [paces, setPaces] = useState([]);
  const paces_value = {paces, setPaces};
  {/* remove 'gestureEnabled: false' in screenOption for enable user go to previous screen */}
  return(
     <TokenContext.Provider value={token_value}>
      <PacesContext.Provider value={paces_value}>
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Loading' component={LoadingScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Information' component={InformationScreen} />
          <Stack.Screen name='Avatar' component={AvatarScreen} />
          <Stack.Screen name='App' component={BottomTabs} />
        </Stack.Navigator>
      </PacesContext.Provider>
    </TokenContext.Provider>
  );
}