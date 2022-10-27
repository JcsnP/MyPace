import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from "react-native-circular-progress-indicator";
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// import style
import styles from '../styles';

// import components
import ChangeGoal from "../components/Homescreen/ChangeGoal";
import ActivityCard from "../components/Homescreen/ActivityCard";
import SatisticsCard from "../components/Homescreen/StatisticsCard";

export default function HomeScreen(props) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [goal, setGoal] = useState(5500);

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


  useEffect(()=>{
    _subscribe();
    return ()=> _unsubscribe();
  },[])

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <CircularProgress
           value={currentStepCount}
           maxValue={goal}
           radius={windowWidth / 2.5}
           textColor={"#ecf0f1"}
           activeStrokeColor={"#FF3654"}
           inActiveStrokeColor={"#561E2C"}
           inActiveStrokeOpacity={0.5}
           inActiveStrokeWidth={40}
           activeStrokeWidth={40}
           title={`OF ${goal.toLocaleString()}`}
           titleColor={"#A9A9A9"}
           titleStyle={{ fontWeight: "bold", fontSize: 30, textTransform: "uppercase" }}
         />
        <ChangeGoal />
        
        { /* Statistics */}
        <ActivityCard />
        {/* ActivityCard */}
        <SatisticsCard />
        

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}