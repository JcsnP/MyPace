import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { MYPACE_API } from '@env';

import styles from '../styles'; 

// import components
import AvatarBox from "../components/AvatarScreen/AvatarBox";

export default function AvatarScreen({route, navigation}) {
  const { username, email, password, dob, height, weight, gender } = route.params;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [choosed, setChoosed] = useState('');

  useEffect(() => {
    const fetchAvatars = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/avatars`);
        if(response.data.status === 200) {
          setAvatars(response.data.avatars);
          setIsLoading(false);
        }
      } catch(error) {
        console.log(error);
      }
    }

    fetchAvatars();
  }, [isLoading]);

  
  // create an account
  const register = () => {
    if(!username || !email || !password || !dob || !height || !weight || !gender) {
      alert('hmmm, you missed somethings');
      return;
    }
    axios.post(`${MYPACE_API}/users`, {
      username: username,
      email: email,
      image: choosed,
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
      if(response.data.status === 200) {
        navigation.navigate('Login');
      } else if(response.data.status === 204) {
        return Alert.alert('Username or Email already exists');
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <Text style={styles.title}>Avatar</Text>

        {
          isLoading && (
            <ActivityIndicator size="large" color="#777" />
          )
        }

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {
              !isLoading && (
                avatars.map((item, key) => {
                  let status;
                  choosed === item.image ? status = 'choosed' : status = 'not-choosed';
                  return(
                    <TouchableOpacity onPress={() => {setChoosed(item.image)}} key={key}>
                      <AvatarBox item={item} status={status} />
                    </TouchableOpacity>
                  )
                })
              )
            }
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.loginButton} onPress={register}>
          <Text style={styles.buttonLabel}>Choose & Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}