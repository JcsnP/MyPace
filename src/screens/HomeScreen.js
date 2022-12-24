import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View, Modal, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress, { ProgressRef } from "react-native-circular-progress-indicator";
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import * as Svg from 'react-native-svg';

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';
// import token context
import TokenContext from "../contexts/TokenContext";

// import components
import SatisticsCard from "../components/Homescreen/StatisticsCard";
import ActivityBox from "../components/Homescreen/ActivityBox";

export default function HomeScreen() {
  const [user, setUser] = useState({});
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [goal, setGoal] = useState(5500);
  const [temp_goal, setTempGoal] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

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
    // start.setDate(end.getDate() - 1);  // tomorrow --> today
    start.setHours(0,0,0,0);              // only today
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
        if(await AsyncStorage.getItem('goal') === null) {
          setModalVisible(true);
        }
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

      // console.log(isPedometerAvailable, pastStepCount, currentStepCount);
    }

    return ()=> _unsubscribe();
  },[isFocused, goal])

  const setUserGoal = async() => {
    try {
      if(goal === 0) {
        Alert.alert('Invalid Value');
        return;
      }

      // ถ้าผู้ใช้กรอกเป้าหมายน้อยกว่าจำนวนก้าวที่เดินในปัจจุบัน
      if(pastStepCount >= temp_goal) {
        Alert.alert('You must enter a goal greater than the current step count.');
        return;
      }

      // ดักไว้ เพื่อผู้ใช้กวนตีนใส่ค่าที่น้อยกว่า 0
      if(goal > 0) {
        await AsyncStorage.setItem('goal', temp_goal);
      }

      setGoal(temp_goal);
      // ปิด modal
      setModalVisible(false);
    } catch(error) {
      console.log(error);
    }
  }

  const ChangeGoal = () => (
    <TouchableOpacity
      style={{borderWidth: 1, borderRadius: 7, paddingVertical: 10, backgroundColor: '#212121', borderColor: '#3D3D3D', width: '80%', alignSelf: 'center', marginVertical: 20, shadowColor: '#111', shadowOpacity: 1, shadowOffset: {width: 0, height: 2}}}
      onPress={() => {setModalVisible(true)}}
      >
      <Text style={{color: '#D70040', textTransform: 'uppercase', fontWeight: '800', fontSize: 25, textAlign: 'center'}}>Change my goal</Text>
    </TouchableOpacity>
  );

  /*
  const findPercentage = (goal, current) => {
    return (current * 100) / goal;
  }
  */

  const findBMR = () => {
    const WEIGHT = 55;
    const HEIGHT = 173;
    const AGE = 21;
    const BMR = 66.5 + (13.76 * WEIGHT) + (5.003 * HEIGHT) - (6.755 * AGE);
  }

  return(
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slice"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
          <TouchableOpacity
            style={modalStyle.centeredView}
            activeOpacity={1}
            onPressOut={async() => {
              if(await AsyncStorage.getItem('goal') === null) {
                Alert.alert('You must to set your goal.')
              } else {
                setModalVisible(false);
              }
            }}
          >
            <View style={modalStyle.modalView}>
              <Text style={modalStyle.modalText}>Set my Goal</Text>
              <TextInput
                placeholder="9,999 paces !!!"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={temp_goal}
                onChangeText={setTempGoal}
                style={modalStyle.textInput}
              />
              <TouchableOpacity
                style={[modalStyle.button, modalStyle.buttonClose]}
                onPress={() => setUserGoal()}
              >
                <Text style={modalStyle.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
          activeStrokeColor={"#D70040"}
          inActiveStrokeColor={pastStepCount > goal ? "#FF3654" : "#561E2C"}
          inActiveStrokeOpacity={pastStepCount > goal ? 1 : 0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={pastStepCount > goal ? 'completed' : `OF ${parseInt(goal).toLocaleString()}`}
          titleColor={"#D70040"}
          titleStyle={{ fontWeight: "bold", fontSize: 30, textTransform: "uppercase" }}
          progressFormatter={(value) => {
            'worklet';
            return value.toLocaleString();
          }}
          strokeColorConfig={[
            { color: '#fc95a4', value: goal / 3 },
            { color: '#ff6e83', value: goal / 2 },
            { color: '#D70040', value: goal / 1 },
          ]}
        />

        {/* Change Goal */}
        <ChangeGoal />

        {/* ActivityBox */}
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10}}>
          <ActivityBox icon='map-marker-path' value={3.5} unit='km' message='distance' />
          <ActivityBox icon='fire' value={218} unit='kcal' message='calories' />
          <ActivityBox icon='av-timer' value={0.20} unit='hr' message='time of walk' />
        </View>

        {/* ActivityCard */}
        <SatisticsCard />

        {findBMR()}

        <BarChart
        data={{
          labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43, 99],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={250}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#212121',
          backgroundGradientTo: '#252525',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(215, 0, 64, ${opacity})`,
          style: {
            borderRadius: 7,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '70%',
    height: 'auto',
    marginVertical: 20,
    backgroundColor: "#343436",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 7,
    padding: 12,
    elevation: 2,
    width: '100%'
  },
  buttonClose: {
    backgroundColor: "#FF3654",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase',
    fontSize: 20
  },
  modalText: {
    textAlign: "center",
    color: '#FFF',
    fontWeight: '900',
    fontSize: 25,
    textTransform: 'uppercase'
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 7,
    width: '100%',
    marginVertical: 15,
    paddingVertical: 10,
    padding: 10,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  }
});
