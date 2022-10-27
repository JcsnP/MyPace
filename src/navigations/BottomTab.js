import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// import pages
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SettingScreen from '../screens/SettingScreen';
import ReportScreen from '../screens/ReportScreen';
import SensorReportScreen from '../screens/SensorReportScreen';
import AboutScreen from '../screens/AboutScreen';

// import stack
import SettingStack from './SettingStack';

// bottom tab navigation
const Tab = createBottomTabNavigator();

const BottomTabsMain = () => {
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