import React from 'react';
import { Image, View, StyleSheet, ImageBackground, TextInput, AsyncStorage } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import Link from '../ui/Link'
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';

export default class MeuPerfil extends React.Component {

  componentDidMount() {
    this.state = {
      userToken: null
    }
    this._loadUser().then(() => {
      this.state.userToken === null &&
        this.props.navigation.navigate("Cadastro")
      console.log(this.state.userToken)
    })
    .catch((e) => console.log("erro: ", e))
  }

  _loadUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({
      userToken
    })
  }

  state = {
    erroCadastro: false,
    passwordMismatch: false,
    msgErro: '',
    login: '',
    password: '',
    passwordConfirm: ''
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
          <RubikText style={styles.label}>Crie uma senha</RubikText>
          <TextInput
            style={styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <RubikText style={styles.label}>Confirme sua senha</RubikText>
          <TextInput
            style={styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
            value={this.state.passwordConfirm}
            onBlur={this.blurPasswordConfirm}
          />
          { this.state.passwordMismatch && (
            <RubikText style={styles.erroText}>Campos de senha estão diferentes</RubikText>
          )}
          <ButtonBorder 
            title="CADASTRAR" 
            onPress={this.cadastrarNovoUsuario} 
          />
        </View>
        <Link 
          navigation={this.props.navigation}
          title="Saiba mais sobre o aplicativo Megastore Jaú" 
          to="Home"
          fontSize="12"
          style={{marginTop: 50, marginBottom: 25}}
        />
        { this.state.cadastroConcluido && (
          <Alert
            title = "Obrigado!"
            message = "Cadastro realizado com sucesso."
            btnText = "começar"
            onClickButton = {this.onClickAlertButton}
            dismissAlert = {this.onClickAlertButton}
          />
        )}
        { this.state.erroCadastro && (
          <Alert
            title = "Atenção"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
        
      </ImageBackground>
    );
  }

  cadastrarNovoUsuario = async () => {
    const jsonRes = await this.fetchCadastro();
    if(jsonRes.success) {
      const token = jsonRes.data.token.token
      await AsyncStorage.setItem('userToken', token);
      this.setState({
        cadastroConcluido: true
      })
      return
    }
    const msgErro = jsonRes.message;
    this.setState({
      erroCadastro: true,
      msgErro
    })
  };

  fetchCadastro = async () => {
    const rawResponse = await fetch('https://develop-api.vestylle.grupotesseract.com.br/api/pessoas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.login, password: this.state.password, nome:'teste', cpf: this.state.login})
    })
    const jsonRes = await rawResponse.json();
    return jsonRes;
  }

  dismissAlertErro = () => {
    this.setState({
      erroCadastro: false
    })
  }

  onClickAlertButton = () => {
    this.props.navigation.navigate('App');
  }

  blurPasswordConfirm = () => {
    if(this.state.password != this.state.passwordConfirm) {
      this.setState({
        passwordMismatch: true
      })
    } else {
      this.setState({
        passwordMismatch: false
      })
    }
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
  erroText: {
    color: 'white',
    textAlign: 'left'
  },
  textoBranco: {
    color: '#FFFFFF',
    fontSize: 10,
    paddingLeft: 12,
    alignSelf: 'flex-start'
  }
  
})