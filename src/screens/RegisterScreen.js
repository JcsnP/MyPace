import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import validator from 'validator'

// import styles
import styles from '../styles';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if(validator.isEmpty(username) || validator.isEmpty(email) || validator.isEmpty(password)) {
      return Alert.alert('Please enter all fields')
    }
    
    if(!validator.isEmail(email)) {
      return Alert.alert('Please enter valid email')
    }

    if(password.length < 6) {
      return Alert.alert('Password must be at 6 char long')
    }

    // passed
    navigation.navigate('Information', {
      username: username,
      email: email,
      password: password
    });
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
        <TextInput 
          style={styles.textInput}
          onChangeText={setUsername}
          value={username}
          autoCapitalize = 'none'
          placeholderTextColor="#A9A9A9"
          placeholder="Username"
          clearButtonMode="always" />
        <TextInput 
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          autoCapitalize = 'none'
          placeholderTextColor="#A9A9A9"
          placeholder="Email"
          clearButtonMode="always" />
        <TextInput 
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          autoCapitalize = 'none'
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          placeholder="Password"
          clearButtonMode="always" />
        
        { /* link to information page */ }
        <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              validate()
            }}
          >
            <Text style={styles.buttonLabel}>NEXT</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/*
navigation.navigate('Information', {
                username: username,
                email: email,
                password: password
              })
*/