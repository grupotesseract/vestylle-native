import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

class NavBar extends React.Component {
  render() {
    return <View style={styles.menubar}>
      <View style={styles.flexBlock}><Text>Voltar</Text></View>
      <View style={styles.flexGrow}><Text>Logo</Text></View>
      <View style={styles.flexBlock}><Text>Menu</Text></View>
    </View>
  }
}


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <NavBar/>
         <ScrollView style={styles.content}>
          <View style={styles.bloco500}>
            <Text>Bloco</Text>
          </View>
          <View style={styles.bloco500}>
            <Text>Mais um bloco</Text>
          </View>
         </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0ff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content :{
    alignSelf: 'stretch',
  },
  bloco500: {
    flex: 0,
    flexGrow: 0,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
    margin: 4
  },
  menubar: {
    flexDirection: 'row',
    flex: 0,
    height: 60,
    flexGrow: 0,
    backgroundColor: 'yellow',
  },
  flexBlock : {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
  },
  flexGrow : {
    flex: 1,
    flexGrow: 3,
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
  }
});
