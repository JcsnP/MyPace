import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, ActionSheetIOS, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import { MYPACE_API } from "@env";

// import style
import styles from '../styles';
import axios from "axios";

// import token context
import TokenContext from "../contexts/TokenContext";

export default function EditInformation({navigation}) {
  const [ dob, setDOB ] = useState('');
  const [ height, setHeight ] = useState(0);
  const [ weight, setWeight ] = useState(0);
  const [ gender, setGender ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);

  // date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate= new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setDOB(fDate);

    console.log(fDate);
  }

  const showMode = (currentMode) => {
    setShow(isVisible);
    setIsVisible(!isVisible);
    setMode(currentMode);
  }

  const openGender = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Male', 'Female', 'Cancel'],
        cancelButtonIndex: 2,
        userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        if(buttonIndex === 0) {
          setGender('male');
        } else if (buttonIndex === 1) {
          setGender('female');
        } else if (buttonIndex === 2) {
          // cancel
        }
      }
    )
  }

  const token = useContext(TokenContext);

  useEffect(() => {
    axios.get(`${MYPACE_API}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      setDOB(res.data.user.information.dob);
      setHeight(res.data.user.information.height);
      setWeight(res.data.user.information.weight);
      setGender(res.data.user.information.gender);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  // create an account
  const updateUser = () => {
    axios.put(`${MYPACE_API}/users/me`,
      {
        information: {
          dob: dob,
          height: height,
          weight: weight,
          gender: gender
        }
      },
      {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      if(response.data.status === 'ok') {
        navigation.navigate('MainSettingScreen');
      }
      if(response.data.status === 'error') {
        alert(response.data.message.toUpperCase());
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return(
    <SafeAreaView style={styles.container}>
      {
        isLoading && (
          <ActivityIndicator />
        )
      }

      {
        !isLoading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Date of Births</Text>
                <TouchableOpacity style={customStyle.dobInput} onPress={() => showMode('date')}>
                  <Text style={customStyle.dobInputText}>{(dob) ? dob : null}</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='spinner'
                    onChange={onChange}
                    textColor="#FFF"
                  />
                )}
              </View>

              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Weight - KG</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setWeight}
                  value={String(weight)}
                />
              </View>

              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Height - CM</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setHeight}
                  value={String(height)}
                />
              </View>

              { /* gender */}
              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Gender</Text>
                <TouchableOpacity onPress={openGender} style={customStyle.dobInput}>
                  <Text style={customStyle.dobInputText}>{ (!gender) ? 'Select Gender' : gender.charAt(0).toUpperCase() + gender.slice(1) }</Text>
                </TouchableOpacity>
              </View>

              { /* update button */}
              <View style={customStyle.formGroup}>
                <TouchableOpacity
                  onPress={updateUser}
                  style={styles.loginButton}
                >
                  <Text style={styles.buttonLabel}>UPDATE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
}

const customStyle = StyleSheet.create({
  dobInput: {
    borderWidth: 1,
    backgroundColor: '',
    paddingHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 7,
    borderColor: '#3D3D3D',
    backgroundColor: '#212121',
  },
  dobInputText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center'
  },
  label: {
    color: '#D1D1D1',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 5,
  },
  formGroup: {
    marginBottom: 15
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
});