import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import style
import styles from '../../styles';

export default function LoginScreen() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  return(
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
      <Text style={styles.title}>Login</Text>
        <View>
          <TextInput 
            style={styles.textInput}
            onChangeText={setUsername}
            value={username}
            placeholderTextColor="#A9A9A9"
            placeholder="Username" />

          <TextInput 
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            placeholder="Password" />

          <TouchableOpacity
            style={styles.loginButton}
          >
            <Text style={styles.buttonLabel}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}