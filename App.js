import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

// stack
const Stack = createStackNavigator();

// import navigations
import BottomTabs from './src/navigations/BottomTab';
import Routers from './src/routers';

// import screens


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