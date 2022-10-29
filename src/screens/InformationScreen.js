import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';

// import css
import styles from '../styles';

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
  var isVisible = false;

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
    setShow(!isVisible);
    setMode(currentMode);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
        <Text style={styles.title}>Information</Text>

        {/* group */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Select Date of Births</Text>
          <TouchableOpacity style={customStyle.dobInput} onPress={() => showMode('date')}>
            <Text style={customStyle.dobInputText}>{(!dob) ? 'Date of Birth' : dob}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display='spinner'
              onChange={onChange}
            />
          )}
        </View>

         {/* group */}
        <View style={customStyle.formGroup}>
          <Text style={customStyle.label}>Select Date of Births</Text>
          <TextInput />
        </View>

      </View>
    </SafeAreaView>
  );  
}

const customStyle = StyleSheet.create({
  dobInput: {
    borderWidth: 1,
    backgroundColor: '#1562ED',
    paddingHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 7
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
  }
});