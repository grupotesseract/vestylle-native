import React from 'react';
import { StyleSheet, Button, Text, View, AsyncStorage, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { MenuIcon } from "./Menu"
import Menu from "./Menu"
import HomeScreen from "./screens/Home"
import LoginScreen from "./screens/LoginScreen"
import AreaCliente from "./screens/AreaCliente"
import CadastroScreen from './screens/CadastroScreen';


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

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //this.props.navigation.navigate('Cadastro');
    
    //const userToken = await AsyncStorage.getItem('userToken');

    const userToken = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(false), 1000)
    });

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //const userToken = false;
    this.props.navigation.navigate(userToken ? 'Home' : 'Cadastro');
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const AuthStack = createStackNavigator(
  { 
    Cadastro: CadastroScreen, 
    Login: LoginScreen, 
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: "Cadastro",
  }
);

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
    Menu: Menu,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
));

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
});
