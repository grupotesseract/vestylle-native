import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { MenuIcon } from "./components/Menu"
import Menu from "./components/Menu"
import HomeScreen from "./screens/Home"
import LoginScreen from "./screens/LoginScreen"
import AreaCliente from "./screens/AreaCliente"
import MeuPerfil from "./screens/MeuPerfil"
import MeusPontos from "./screens/MeusPontos"
import CadastroScreen from './screens/CadastroScreen';
import CadastroSimples from './screens/CadastroSimples';
import { Font, AppLoading } from 'expo';
import ListaDesejos from './screens/ListaDesejos';
import { UserProvider } from './UserContext';
import { LojaProvider } from './LojaContext';
import Loja from './screens/Loja';

class LogoTitle extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
          <Image
            source={require('./assets/logofull.png')}
            resizeMode="contain"
            style={{ height: 45, marginBottom: 5, marginTop: 2 }}
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
    
    const userToken = await AsyncStorage.getItem('userToken');

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
    CadastroSimples: CadastroSimples, 
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
    MeuPerfil: MeuPerfil,
    MeusPontos: MeusPontos,
    ListaDesejos: ListaDesejos,
    Loja: Loja
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
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'LaughingSmiling': require('./assets/fonts/ls.ttf'),
      'Rubik': require('./assets/fonts/Rubik-Regular.ttf'),
      'RubikBold': require('./assets/fonts/Rubik-Bold.ttf')
    });
    this.setState({
      fontLoaded: true
    })
  }
  render() {
    if ( !this.state.fontLoaded ) {
      return <AppLoading />;
    }
    return <LojaProvider>
      <UserProvider>
        <AppContainer />
      </UserProvider>
    </LojaProvider>;
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
