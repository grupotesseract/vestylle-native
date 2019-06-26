import React from 'react';
import { Image, View, StyleSheet, ImageBackground, TextInput } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import Link from '../ui/Link';
import { UserConsumer } from '../UserContext';

class FormLogin extends React.Component {
  
  state = {
    erroLogin: false,
    msgErro: '',
    login: '',
    password: ''
  }

  render() {
    return  <>
        <View
          style={{width: '80%', paddingBottom: 120}}>

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
          <Link
            to="EsqueceuSenha"
            style={{marginTop: 10, marginBottom: 12,  justifyContent: 'flex-start'}}>
            <RubikText style={{color: '#feca03', fontSize: 14}}>Esqueceu sua senha?</RubikText>  
          </Link>
          <ButtonBorder 
            title="LOGIN" 
            onPress={this._signInAsync} 
            loading={this.state.loading}
          />
        </View>
        { this.state.erroLogin && (
          <Alert
            title = "Erro"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
    </>
  }

  _signInAsync = async () => {
    const self = this;
    this.setState({loading:true})
    await this.props.login(this.state.login, this.state.password)
    .then(jsonRes => {
      if(jsonRes.success) {
        this.props.navigation.navigate('AreaCliente');
        return;
      }
      const msgErro = jsonRes.message;
      self.setState({
        erroLogin: true,
        loading: false,
        msgErro
      })
    })
    .catch(erro => {
      self.setState({
        erroLogin: true, 
        msgErro: erro.toString(),
        loading: false
      })
    })
  };

  dismissAlertErro = () => {
    this.setState({
      erroLogin: false
    })
  }
}
export default class LoginScreen extends React.Component {
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-between', alignItems: 'center'}}>

        <Link to="Cadastro"
          style={{width: '80%', flexGrow:1, marginBottom: 'auto', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logobranco.png')}
            resizeMode="contain"
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </Link>

        <UserConsumer>
        {({ login }) => (
        <FormLogin
          login={login}
          navigation={this.props.navigation}
        />
        )}
        </UserConsumer>
      </ImageBackground>
    );
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