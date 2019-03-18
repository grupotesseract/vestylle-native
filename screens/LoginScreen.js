import React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TextInput, AsyncStorage, Button } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import Link from '../ui/Link'

export default class LoginScreen extends React.Component {
  state = {
    login: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundocadastro.png')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
        <View
          style={{width: '80%'}}>

          <Image
            source={require('../assets/logofull.png')}
            resizeMode="center"
            style={{ width:'100%' }}
          />
          <Text style={styles.textoBranco}>Faça seu cadastro e receba benefícios exclusivos</Text>
          <Text style={styles.label}>CPF ou E-mail</Text>
          <TextInput
            style={styles.inputComBorda}
            onChangeText={(login) => this.setState({login})}
            value={this.state.login}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <ButtonBorder 
            title="Login" 
            onPress={this._signInAsync} 
            style={styles.btnBorda}  
          />
        </View>
        <Link 
          navigation={this.props.navigation}
          title="Saiba mais sobre o aplicativo Megastore Jaú" 
          to="Home"
          fontSize="10"
          style={{marginTop: 100, marginBottom: 10}}
        />
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  inputComBorda: {
    height: 40,
    width:'100%',
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
  label: {
    color: '#feca03',
    marginTop: 5,
    textAlign: 'left'
  },
  textoBranco: {
    color: '#FFFFFF',
  }
  
})