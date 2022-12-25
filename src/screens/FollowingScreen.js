import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import token context
import TokenContext from "../contexts/TokenContext";

export default function FollowingScreen() {
  const [followingName, setfollowingName] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const token = useContext(TokenContext);

  useEffect(() => {
    const fetchFollowings = async() => {
      try {
        const response = await axios.get(`${MYPACE_API}/followings`,
          {
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          }
        );

        if(response.data.status === 200) {
          setFollowingList(response.data.followings);
        }
      } catch(error) {
        console.log(error);
      }
    }

    fetchFollowings();
  }, []);

  const following = async() => {
    if(followingName.length === 0) {
      return Alert.alert('Following name is empty');
    }
    try {
      const response = await axios.post(`${MYPACE_API}/followings`,
        {
          following_name: followingName
        },
        {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        }
      );
      console.log(response.data.status);
    } catch(error) {
      console.log(error);
    }
  }

  const displayFollowing = followingList.map((item, key) => (
    <View style={customStyle.followingsCard}>
      <Image source={{uri: item.details[0].image}} style={customStyle.followingsImage} />
      <Text style={customStyle.followingsName}>{item.details[0].username}</Text>
    </View>
  ))

  return(
    <SafeAreaView style={styles.container}>
      <Text style={customStyle.label}>Username</Text>
      <View style={customStyle.section}>
        <View style={customStyle.formContainer}>
          <View style={[customStyle.formGroup, {width: '75%'}]}>
            <TextInput
              style={styles.searchInput}
              onChangeText={setfollowingName}
              value={followingName}
              clearButtonMode="always"
            />
          </View>
          <View style={[customStyle.formGroup, {width: '25%'}]}>
            <TouchableOpacity
              onPress={following}
              style={styles.searchButton}
            >
              <Text style={styles.searchLabel}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* friends list */}
      {
        followingList.length !== 0 && (
          <View style={customStyle.section}>
            <Text style={customStyle.label}>Following Lists</Text>
            <ScrollView vertical>
              {displayFollowing}
            </ScrollView>
          </View>
        )
      }
    </SafeAreaView>
  );
}

const customStyle = StyleSheet.create({
  label: {
    color: '#D1D1D1',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 5,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  section: {
    marginBottom: 20
  },
  followingsCard: {
    height: 75,
    width: "100%",
    borderWidth: 1,
    borderColor: "#3D3D3D",
    borderRadius: 7,
    backgroundColor: "#212121",
    padding: 10,
    color: "#A9A9A9",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  followingsName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '25'
  },
  followingsImage: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    backgroundColor: '#333'
  }
});

