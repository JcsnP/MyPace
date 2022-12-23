import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1B1B",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  title: {
    fontSize: 35,
    marginTop: 30,
    marginBottom: 25,
    fontWeight: "800",
    color: "#fff"
  },
  settingTitle: {
    fontSize: 35,
    marginBottom: 25,
    fontWeight: "800",
    color: "#fff"
  },
  warningTitle: {
    fontSize: 50,
    fontWeight: "800",
    color: "#fff",
  },
  flex: {
    display: "flex",
  },
  textInput: {
    height: 60,
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
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#2563EB",
    marginVertical: 4
  },
  registerButton: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#212121",
    borderColor: '#3D3D3D',
    marginVertical: 4
  },
  buttonLabel: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 25,
    textAlign: "center",
    textTransform: 'uppercase'
  }
});

module.exports = styles;