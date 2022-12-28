import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// stack
const Stack = createStackNavigator();

// import navigations
import BottomTabs from './src/navigations/BottomTab';
import Routers from './src/routers';

//import all the components we are going to use
import { View, LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </>
  );
}

/*
  <StatusBar style='light' />
  <NavigationContainer>
    <BottomTabs />
  </NavigationContainer>
*/