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
import AdicionarCupom from "./screens/AdicionarCupom"
import CadastroScreen from './screens/CadastroScreen';
import CadastroSimples from './screens/CadastroSimples';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ListaDesejos from './screens/ListaDesejos';
import { UserProvider } from './UserContext';
import { LojaProvider } from './LojaContext';
import Loja from './screens/Loja';
import Link from './ui/Link';
import Produtos from './screens/Produtos';
import Oferta from './screens/Oferta';
import CupomDetalhe from './screens/CupomDetalhe';
import MeusCupons from './screens/MeusCupons';
import FaleConosco from './screens/FaleConosco';
import EsqueceuSenha from './screens/EsqueceuSenha';

class LogoTitle extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
          <Link to="Home">
          <Image
            source={require('./assets/logofull.png')}
            resizeMode="contain"
            style={{ height: 45, marginBottom: 5, marginTop: 2 }}
          />
          </Link>
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
    CadastroSimples: CadastroSimples, 
    EsqueceuSenha: EsqueceuSenha,
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
    AdicionarCupom: AdicionarCupom,
    AreaCliente: AreaCliente,
    Cupom: CupomDetalhe,
    FaleConosco: FaleConosco,
    Home: HomeScreen,
    ListaDesejos: ListaDesejos,
    Loja: Loja,
    MeuPerfil: MeuPerfil,
    MeusCupons: MeusCupons,
    MeusPontos: MeusPontos,
    Oferta: Oferta,
    Produtos: Produtos,
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
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
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

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});