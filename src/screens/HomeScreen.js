import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress, { ProgressRef } from "react-native-circular-progress-indicator";
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';
// import token context
import TokenContext from "../contexts/TokenContext";

// import components
import ChangeGoal from "../components/Homescreen/ChangeGoal";
import ActivityCard from "../components/Homescreen/ActivityCard";
import SatisticsCard from "../components/Homescreen/StatisticsCard";

export default function HomeScreen() {
  const [user, setUser] = useState({});
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [goal, setGoal] = useState(5500);

  const token = useContext(TokenContext);

  let _subscription;
  const windowWidth = Dimensions.get('window').width;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result);
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps);
      },
      error => {
        setPastStepCount('Could not get stepCount: ' + error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  // custom method
  const getStatistics = async() => {
    try {
      const res = await axios.get(`${MYPACE_API}/users/paces`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
      // setUser(await res.data[0]);
    } catch(err) {
      console.log(err);
    }
  }

  const isFocused = useIsFocused();
  useEffect(()=>{
    _subscribe();
    getStatistics();

    if(isFocused) {
      const fetchGoal = async() => {
        try {
          if(await AsyncStorage.getItem('goal')) {
            const new_goal = await AsyncStorage.getItem('goal');
            setGoal(new_goal);
          }
        } catch(error) {
          console.log(error);
        }
      }
      fetchGoal();
    }

    return ()=> _unsubscribe();
  },[isFocused, goal])

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
      >
      <View style={{display: 'flex', alignItems: 'center'}}>
      <CircularProgress
           value={isNaN(pastStepCount) ? 0 : pastStepCount}
           maxValue={goal}
           radius={windowWidth / 2.5}
           textColor={"#ecf0f1"}
           activeStrokeColor={"#FF3654"}
           inActiveStrokeColor={pastStepCount > goal ? "#FF3654" : "#561E2C"}
           inActiveStrokeOpacity={pastStepCount > goal ? 1 : 0.5}
           inActiveStrokeWidth={40}
           activeStrokeWidth={40}
           title={pastStepCount > goal ? 'completed' : `OF ${goal.toLocaleString()}`}
           titleColor={"#A9A9A9"}
           titleStyle={{ fontWeight: "bold", fontSize: 30, textTransform: "uppercase" }}
           progressFormatter={(value) => {
            'worklet';
            return value.toLocaleString();
          }}
         />

         {/* Chang Goal */}
        <ChangeGoal />
        { /* Statistics */}
        <ActivityCard paces={pastStepCount} />
        {/* ActivityCard */}
        <SatisticsCard />



        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
