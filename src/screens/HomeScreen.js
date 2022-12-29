import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View, Modal, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress, { ProgressRef } from "react-native-circular-progress-indicator";
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TaskManager from 'expo-task-manager';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import * as Svg from 'react-native-svg';
import moment from "moment/moment";

import { MYPACE_API } from '@env';

// import style
import styles from '../styles';
// import token context
import TokenContext from "../contexts/TokenContext";
import PacesContext from "../contexts/PacesContext";
import UserContext from '../contexts/UserContext';

// import components
import SatisticsCard from "../components/Homescreen/StatisticsCard";
import ActivityBox from "../components/Homescreen/ActivityBox";

export default function HomeScreen() {
  const {user} = useContext(UserContext);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [goal, setGoal] = useState(0);
  const [temp_goal, setTempGoal] = useState(0);
  const {paces} = useContext(PacesContext);
  const [badges, setBadges] = useState([]);

  // distance, kcal and time
  const [distance, setDitance] = useState(0)
  const [kcal, setKcal] = useState(0);
  const [time, setTime] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const token = useContext(TokenContext).token;

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
        setCurrentStepCount(1000);
        // setPastStepCount('Could not get stepCount: ' + error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  const isFocused = useIsFocused();
  useEffect(()=>{
    _subscribe();
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

    const checkBadge = () => {
      badges.map(async(item) => {
        if(pastStepCount >= item.goal) {
          const response = await axios.post(`${MYPACE_API}/users/me/badges`,
          {
            badge_id: item._id
          },
          {
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          });

          if(response.data.status === 200) {
            Alert.alert(`Congratulations, you unlocked '${item.title}'.`);
            return;
          }
        }


      });
    }

    // calculate distance, kcal and time
    const calculateDistance = () => {
      // find pace lenth in cm
      const PACE_LENGTH = (user.information.height) * 0.413;
      const walking_distance = (PACE_LENGTH * pastStepCount) / 100;
      setDitance(walking_distance.toFixed(2))
    }

    const calculateKCal = () => {
      const burned = pastStepCount * 0.035745; // ค่าเฉลี่ยในการเผาผลาญต่อ 1 ก้าว
      setKcal(burned);
    }

    const calculateTime = () => {
      const walking_time = pastStepCount / 75
      setTime(walking_time);
    }


    if(isFocused) {
      fetchGoal();
      checkBadge();
      calculateDistance();
      calculateKCal();
      calculateTime();

      // console.log(isPedometerAvailable, pastStepCount, currentStepCount);
      // console.log(distance, kcal, time);
    }
    
    return ()=> _unsubscribe();
  },[isFocused, goal])

  useEffect(() => {
    // ดึงเป้าหมายทั้งหมดมาเช็ค
    const fetchBadges = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/badges`);
        if(response.data.status === 200) {
          setBadges(response.data.badges);
        }
      } catch(error) {
        console.log(error.message);
      }
    }

    fetchBadges();
  }, []);

  const setUserGoal = async() => {
    try {
      if(temp_goal === 0) {
        Alert.alert('Invalid Value');
        return;
      }

      // ถ้าผู้ใช้อยากจะเดินมากเกินไป
      if(temp_goal >= 99999) {
        Alert.alert('We do not allow The Flash to use our app.');
        return;
      }

      // ถ้าผู้ใช้กรอกเป้าหมายน้อยกว่าจำนวนก้าวที่เดินในปัจจุบัน
      if(pastStepCount >= temp_goal) {
        Alert.alert('You must enter a goal greater than the current step count.');
        return;
      }

      // ถ้าค่ามากกว่า 0 ก็เก็บเข้า AsyncStorage
      // เดิมที่ใช้ goal เลยไม่เข้าไปทำงานในรอบแรก
      if(temp_goal > 0) {
        console.log('goal saved')
        await AsyncStorage.setItem('goal', temp_goal);
      }

      setGoal(temp_goal);
      // ปิด modal
      setModalVisible(!modalVisible);
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

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}.${rminutes}`;
  }

  // ส่งค่าไปเก็บไว้ในฐานข้อมูลเมื่อขึ้นวันใหม่
  return(
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slice"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
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
          <ActivityBox icon='map-marker-path' value={distance / 1000} unit='km' message='distance' />
          <ActivityBox icon='fire' value={kcal} unit='kcal' message='calories' />
          <ActivityBox icon='av-timer' value={timeConvert(time)} unit='hr' message='time of walk' />
        </View>

        {/* ActivityCard */}
        <SatisticsCard information={paces} />

        <BarChart
          data={{
            // labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            labels: !paces.length ? [1, 2, 3, 4, 5, 6, 7] : paces.slice(0, 7).map(item => (moment.utc(item.date, "DD/MM/YYYY").format('D'))).reverse(),
            datasets: [
              {
                // data: [20, 45, 28, 80, 99, 43, 99],
                data: !paces.length ? [0, 0, 0, 0, 0, 0, 0] : paces.slice(0, 7).map(item => (item.details.paces)).reverse()
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
