import React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TextInput, AsyncStorage } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import Link from '../ui/Link'
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';

export default class LoginScreen extends React.Component {
  state = {
    erroLogin: false,
    msgErro: '',
    login: '',
    password: ''
  }
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-between', alignItems: 'center'}}>

        <View
          style={{width: '80%', flexGrow:1, marginBottom: 'auto', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logobranco.png')}
            resizeMode="contain"
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </View>

        <View
          style={{width: '80%'}}>

          <RubikText style={styles.label}>CPF ou E-mail</RubikText>
          <TextInput
            style={styles.inputComBorda}
            onChangeText={(login) => this.setState({login})}
            value={this.state.login}
          />
          <RubikText style={styles.label}>Senha</RubikText>
          <TextInput
            style={styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <ButtonBorder 
            title="LOGIN" 
            onPress={this._signInAsync} 
          />
        </View>
        <Link 
          navigation={this.props.navigation}
          title="Saiba mais sobre o aplicativo Megastore Jaú" 
          to="Home"
          fontSize="12"
          style={{marginTop: 100, marginBottom: 25}}
        />
        { this.state.erroLogin && (
          <Alert
            title = "Erro"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    const jsonRes = await this.fetchLogin();
    if(jsonRes.success) {
      await AsyncStorage.setItem('userToken', jsonRes.data.token);
      this.props.navigation.navigate('App');
      return;
    }
    const msgErro = jsonRes.message;
    this.setState({
      erroLogin: true,
      msgErro
    })
  };

  fetchLogin = async () => {
    const rawResponse = await fetch('https://develop-api.vestylle.grupotesseract.com.br/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.login, password: this.state.password})
    })
    const jsonRes = await rawResponse.json();
    return jsonRes;
  }

  dismissAlertErro = () => {
    this.setState({
      erroLogin: false
    })
  }
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
    fontSize: 10,
    paddingLeft: 12,
    alignSelf: 'flex-start'
  }
  
})