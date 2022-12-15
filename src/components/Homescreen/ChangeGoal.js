import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Pressable, Alert  } from "react-native";

export default function ChangeGoal({}) {
  const [goal, setGoal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const setUserGoal = async() => {
    try {
      // ถ้าผู้ใช้ยังไม่ได้ตั้งค่าเป้าหมาย สร้างเป้าหมายแล้วกำหนดค่าให้เป็น 0
      if(!(await AsyncStorage.getItem('goal'))) {
        await AsyncStorage.setItem('goal', 0);
      }

      if(goal === 0) {
        Alert.alert('Invalid Value');
        return;
      }

      // ดักไว้ เพื่อผู้ใช้กวนตีนใส่ค่าที่น้อยกว่า 0
      if(goal > 0) {
        await AsyncStorage.setItem('goal', goal);
      }

      // ปิด modal
      setModalVisible(!modalVisible);
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <>
      <Modal
        animationType="slice"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('modal has been closed');
          setModalVisible(!modalVisible);
        }}
        >
          <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1}
            onPressOut={() => {setModalVisible(false)}}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Change my Goal</Text>
              <TextInput
                placeholder="9,999 paces !!!"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={goal}
                onChangeText={setGoal}
                style={styles.textInput}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setUserGoal()}
              >
                <Text style={styles.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      <TouchableOpacity
        style={{borderWidth: 1, borderRadius: 7, paddingVertical: 10, backgroundColor: '#343436', borderColor: '#3D3D3D', width: '80%', alignSelf: 'center', marginVertical: 20, shadowColor: '#111', shadowOpacity: 1, shadowOffset: {width: 0, height: 4}}}
        onPress={() => {setModalVisible(true)}}
        >
        <Text style={{color: '#F81250', textTransform: 'uppercase', fontWeight: '800', fontSize: 25, textAlign: 'center'}}>Change my goal</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '70%',
    height: '35%',
    margin: 20,
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
    elevation: 5
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
  }
});
