import React from 'react';
import { Text, AsyncStorage, Button, ImageBackground } from 'react-native';

export default class CadastroScreen extends React.Component {

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundocadastro.png')}
        style={{width: '100%', height: '100%'}}>
        <Text>Faça seu cadastro e receba benefícios exclusivos</Text>
        <Button title="Cadastro" onPress={this._signInAsync} />
        <Button title="Fazer Login" onPress={() => this.props.navigation.navigate('Login') } />
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}