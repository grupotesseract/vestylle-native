import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Menu, MenuIcon } from "./Menu"

class AreaCliente extends React.Component {
 static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <Text>Area do Cliente</Text>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('./assets/logofull.png')}
            resizeMode="center"
            style={{ height: 45, }}
          />
        </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Button
            title="Area do cliente"
            onPress={() => this.props.navigation.navigate('AreaCliente')}
          />
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    AreaCliente: AreaCliente,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: <LogoTitle/>,
      headerRight: <MenuIcon navigation={navigation}/>
    })
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppNavigator,
    },
    Menu: {
      screen: Menu,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
    margin: 4,
  },
  menubar: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    flexGrow: 1,
  },
  flexBlock : {
    flex: 1,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexGrow : {
  }
});
