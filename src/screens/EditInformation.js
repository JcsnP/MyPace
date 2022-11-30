import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, ActionSheetIOS, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import { MYPACE_API } from "@env";

// import style
import styles from '../styles';
import axios from "axios";

// import token context
import TokenContext from "../contexts/TokenContext";

export default function EditInformation() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setUser(res.data.user);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingTitle}>Edit Information</Text>
      {
        isLoading && (
          <ActivityIndicator />
        )
      }

      {
        !isLoading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
              <TextInput 
                style={styles.textInput}
                onChangeText={setUsername}
                value={user.username}
                autoCapitalize = 'none'
                placeholderTextColor="#A9A9A9"
                placeholder="Username" />
              <TextInput 
                style={styles.textInput}
                onChangeText={setEmail}
                value={user.email}
                autoCapitalize = 'none'
                placeholderTextColor="#A9A9A9"
                placeholder="Email" />
              <TextInput 
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                autoCapitalize = 'none'
                placeholderTextColor="#A9A9A9"
                secureTextEntry={true}
                placeholder="New Password" />
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

              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Weight - KG</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setWeight}
                  value={String(user.information.weight)}
                />
              </View>

              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Height - CM</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setHeight}
                  value={String(user.information.height)}
                />
              </View>

              { /* gender */}
              <View style={customStyle.formGroup}>
                <Text style={customStyle.label}>Gender</Text>
                <TouchableOpacity onPress={openGender} style={customStyle.dobInput}>
                  <Text style={customStyle.dobInputText}>{user.information.gender.charAt(0).toUpperCase() + user.information.gender.slice(1)}</Text>
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