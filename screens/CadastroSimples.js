import React from 'react';
import { Image, View, StyleSheet,KeyboardAvoidingView, ImageBackground, TextInput, AsyncStorage } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import Link from '../ui/Link'
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import { UserConsumer } from '../UserContext';

class FormCadastro extends React.Component {

  state = {
    cadastroConcluido: false,
    erroCadastro: false,
    passwordMismatch: false,
    formValido: false,
    msgErro: '',
    login: '',
    password: '',
    passwordConfirm: '',
    loading: false
  }

  render() {
    return <KeyboardAvoidingView
        behavior="padding"
        style={{width: '80%', paddingBottom: 30}}>

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
        loading={this.state.loading}
        disabled={!this.state.formValido}
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
        
    </KeyboardAvoidingView>
  }

  cadastrarNovoUsuario = async () => {
    if(!this.state.formValido) return;
    const self = this;
    this.setState({loading:true})
    await this.props.signup(this.state.login, this.state.password)
    .then(jsonRes => {
      if(jsonRes.success) {
        self.setState({
          cadastroConcluido: true,
          loading: false
        })
        return
      }
      let msgErro = jsonRes.message;
      if(jsonRes.errors) {
        msgErro = ""
        Object.keys(jsonRes.errors).map((campo) => {
          msgErro += " "+jsonRes.errors[campo]
          return msgErro
        })
      }
      self.setState({
        erroCadastro: true,
        msgErro,
        loading: false
      })
    })
    .catch(error => console.error('Deu ruim memo:', error));
  };

  dismissAlertErro = () => {
    this.setState({
      erroCadastro: false
    })
  }

  onClickAlertButton = () => {
    this.props.navigation.navigate('AreaCliente');
  }

  blurPasswordConfirm = () => {
    if(this.state.password != this.state.passwordConfirm) {
      this.setState({
        passwordMismatch: true,
        formValido: false
      })
    } else {
      this.setState({
        passwordMismatch: false,
      })
      if(this.state.password && this.state.passwordConfirm) {
        this.setState({
          formValido: true
        })
      }
    }
  }
}

export default class CadastroSimples extends React.Component {

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>

        <Link to="Cadastro"
          style={{width: '80%', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logobranco.png')}
            resizeMode="contain"
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </Link>

        <UserConsumer>
        {({ signup }) => (
          <FormCadastro
            signup={signup}
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