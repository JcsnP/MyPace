import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "../navigations/BottomTab";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

export default function() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Authen" component={LoginScreen} />
      <Stack.Screen name="App" component={BottomTabs} />
    </Stack.Navigator>
  );
}