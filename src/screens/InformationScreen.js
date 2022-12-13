import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, ActionSheetIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';

import { MYPACE_API } from "@env";

// import css
import styles from '../styles';
import axios from "axios";

export default function InformationScreen({ route, navigation }) {
  const { username, email, password } = route.params;
  const [ dob, setDOB ] = useState('');
  const [ height, setHeight ] = useState(0);
  const [ weight, setWeight ] = useState(0);
  const [ gender, setGender ] = useState('');

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
    // MM/DD/YYY
    let fDate = + (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
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

  // create an account
  const register = () => {
    if(!username || !email || !password || !dob || !height || !weight || !gender) {
      alert('hmmm, you missed somethings');
      return;
    }
    axios.post(`${MYPACE_API}/users`, {
      username: username,
      email: email,
      password: password,
      information: {
        dob: dob,
        height: height,
        weight: weight,
        gender: gender
      },
      badges: []
    })
    .then((response) => {
      if(response.data.status === 'ok') {
        navigation.navigate('Login');
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
        <Text style={styles.title}>Information</Text>

        {/* group */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Date of Births</Text>
          <TouchableOpacity style={customStyle.dobInput} onPress={() => showMode('date')}>
            <Text style={customStyle.dobInputText}>{(!dob) ? 'Date of Birth' : 'Confirm'}</Text>
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

        {/* group */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Weight - KG</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setWeight}
            value={weight}
          />
        </View>

        {/* group */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Height - CM</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setHeight}
            value={height}
          />
        </View>

        { /* gender */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Gender</Text>
          <TouchableOpacity onPress={openGender} style={customStyle.dobInput}>
            <Text style={customStyle.dobInputText}>{ (!gender) ? 'Select Gender' : gender.charAt(0).toUpperCase() + gender.slice(1) }</Text>
          </TouchableOpacity>
        </View>

        { /* register button */}
        <View style={customStyle.formGroup}>
          <TouchableOpacity
            onPress={register}
            style={styles.loginButton}
          >
            <Text style={styles.buttonLabel}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
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