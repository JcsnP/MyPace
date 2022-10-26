import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  title: {
    fontSize: '35',
    marginTop: 30,
    marginBottom: 25,
    fontWeight: '800',
    color: '#fff'
  },
  warningTitle: {
    fontSize: '50',
    fontWeight: '800',
    color: '#fff',
  },
  flex: {
    display: 'flex',
  }
});

module.exports = styles;