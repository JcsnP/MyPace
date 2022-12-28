import React, { useEffect, useState, useContext } from "react";
import { View, Modal, SafeAreaView, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import token context
import TokenContext from "../contexts/TokenContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FollowingScreen() {
  const [followingName, setfollowingName] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchedFollowing, setSearchedFollowing] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const token = useContext(TokenContext).token;

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

  const findUser = async() => {
    if(followingName.length === 0) {
      return Alert.alert('Following name is empty');
    }
    try {
      const response = await axios.get(`${MYPACE_API}/user/${followingName}`);
      if(response.data.status === 200) {
        setSearchedFollowing(response.data.userDetails);
        followingList.map(item => {
          if(item.details[0].username === followingName) {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
        });
        setModalVisible(true);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const following = async() => {
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
      if(response.data.status === 200) {
        Alert.alert('Success');
        setModalVisible(false);
        Keyboard.dismiss();
      }
    } catch(error) {
      console.log(error);
    }
  }

  const displayFollowing = followingList.map((item, key) => (
    <View style={customStyle.followingsCard} key={key}>
      <Image source={{uri: item.details[0].image}} style={customStyle.followingsImage} />
      <Text style={customStyle.followingsName}>{item.details[0].username}</Text>
    </View>
  ))

  return(
    <SafeAreaView style={styles.container}>
      {/* modal */}
      <Modal
        animationType="slice"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
          <TouchableOpacity
            style={modalStyle.centeredView}
            activeOpacity={1}
            onPressOut={() => {setModalVisible(false)}}
          >
            <View style={modalStyle.modalView}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Image source={{uri: searchedFollowing.image}} style={{width: 60, height: 60, borderRadius: '100%', backgroundColor: '#222'}} />
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>{searchedFollowing.username}</Text>
              </View>
              <TouchableOpacity style={[customStyle.followingButton, customStyle[isFollowed]]} disabled={isFollowed ? true : false} onPress={following}>
                <Text style={customStyle.followingButtonLabel}>{isFollowed ? 'Followed' : 'Follow'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      {/* /modal */}
      <Text style={customStyle.label}>Username</Text>
      <View style={customStyle.section}>
        <View style={customStyle.formContainer}>
          <View style={[customStyle.formGroup, {width: '75%'}]}>
            <TextInput
              style={styles.searchInput}
              onChangeText={setfollowingName}
              value={followingName}
              autoCapitalize = 'none'
              clearButtonMode="always"
            />
          </View>
          <View style={[customStyle.formGroup, {width: '25%'}]}>
            <TouchableOpacity
              onPress={findUser}
              style={styles.searchButton}
            >
              <Text style={styles.searchLabel}>SEARCH</Text>
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
  },
  followingButton: {
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 7
  },
  followingButtonLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  false: {
     backgroundColor: '#2563EB'
  },
  true: {
    backgroundColor: '#FE0000'
  }
});

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
    elevation: 5,
    display: 'flex',
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
  },
});

