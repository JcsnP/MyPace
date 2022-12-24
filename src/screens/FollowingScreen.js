import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";

import { MYPACE_API } from '@env';

// import style
import styles from "../styles";

// import token context
import TokenContext from "../contexts/TokenContext";

export default function FollowingScreen() {
  const [fiendsId, setFriensId] = useState('');
  const token = useContext(TokenContext);
  useEffect(() => {

  }, []);

  const addFriend = () => {

  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={customStyle.label}>Username</Text>
      <View style={customStyle.section}>
        <View style={customStyle.formContainer}>
          <View style={[customStyle.formGroup, {width: '75%'}]}>
            <TextInput
              style={styles.searchInput}
              onChangeText={setFriensId}
              value={fiendsId}
            />
          </View>
          <View style={[customStyle.formGroup, {width: '25%'}]}>
            <TouchableOpacity
              onPress={addFriend}
              style={styles.searchButton}
            >
              <Text style={styles.searchLabel}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* friends list */}
      <View style={customStyle.section}>
        <Text style={customStyle.label}>Following Lists</Text>
        <ScrollView vertical>
          
        </ScrollView>
      </View>
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
  }
});

