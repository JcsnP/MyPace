import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

// stack
const Stack = createStackNavigator();

// import navigations
import BottomTabs from './src/navigations/BottomTab';

export default function App() {
  return (
    <>
      {/*<SensorReportScreen />*/}
      <StatusBar style='light' />
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
}

/*
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
*/