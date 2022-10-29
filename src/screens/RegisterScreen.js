import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import styles
import styles from '../styles';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}>
        <TextInput 
          style={styles.textInput}
          onChangeText={setUsername}
          value={username}
          placeholderTextColor="#A9A9A9"
          placeholder="Username" />
        <TextInput 
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#A9A9A9"
          placeholder="Email" />
        <TextInput 
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          placeholder="Password" />
        
        { /* link to information page */ }
        <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate('Information', {
                username: username,
                email: email,
                password: password
              })
            }}
          >
            <Text style={styles.buttonLabel}>NEXT</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}