import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class NavBar extends React.Component {
  render() {
    return <View style={styles.menubar}>
      <View style={styles.flexBlock}>Voltar</View>
      <View style={styles.flexGrow}>Logo</View>
      <View style={styles.flexBlock}>Menu</View>
    </View>
  }
}
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menubar: {
    flex: 1,
    width: 500,
    height: 100,
    borderBottom: '1px solid black',
    alignItems: 'flex-start',
    padding: 20,
  },
  flexBlock : {
    flex: 1,
    width: 100,
    height: 100,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexGrow : {
    flex: 1,
    width: 100,
    height: 100,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
