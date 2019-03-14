import React from 'react';
import { View, ImageBackground, Text, TextInput, AsyncStorage, Button } from 'react-native';

export default class LoginScreen extends React.Component {
  state = {
    text: ''
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundocadastro.png')}
        style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text>Faça seu cadastro e receba benefícios exclusivos</Text>
        <TextInput
          style={{height: 40, width:'100%', borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button title="Login" onPress={this._signInAsync} />
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}