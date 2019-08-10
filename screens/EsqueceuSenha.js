import React from 'react';
import { Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import Link from '../ui/Link';
import { UserConsumer } from '../UserContext';
import { withNavigation } from 'react-navigation';

class EsqueceuSenha extends React.Component {

  state = {
    email: '',
    erroRecover: false,
    emailEnviado: false,
    msgErro: '',
  }
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>

        <Link to="Cadastro"
          style={{ width: '80%', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logobranco.png')}
            resizeMode="contain"
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </Link>

        <KeyboardAvoidingView
          behavior="padding"
          style={{width: '80%', justifySelf: 'center'}}>

          <RubikText style={styles.label}>Digite seu E-mail</RubikText>
          <TextInput
            style={styles.inputComBorda}
            onChangeText={(email) => this.setState({email: email})}
            value={this.state.email}
          />
          <UserConsumer>
          {({ recoverPassword }) => (
          <ButtonBorder 
            title="PRÓXIMA"
            loading={this.state.loading}
            onPress={() => this.callRecover(recoverPassword)} 
          />
          )}
          </UserConsumer>
        </KeyboardAvoidingView>
        { this.state.emailEnviado && (
          <Alert
            title = "Veja seu email!"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.goHome}
            dismissAlert = {this.goHome}
          />
        )}
        { this.state.erroRecover && (
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

  callRecover(recoverPassword) {
    recoverPassword(this.state.email)
    .then((res) => {
      if(res && !res.success) {
        this.setState({
          erroRecover: true,
          msgErro: res.message
        })
        return
      }
      if(res && res.success) {
        this.setState({
          emailEnviado: true,
          msgErro: res.message
        })
        return
      }
    })
    .catch((e) => console.log('erro no callRecover', e))
  }

  goHome = () => {
    this.setState({emailEnviado: false})
    this.props.navigation.navigate('Login')
  }

  dismissAlertErro = () => {
    this.setState({
      erroRecover: false
    })
  }
}

const styles = {
  inputComBorda: {
    height: 40,
    width:'100%',
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10
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
}

export default withNavigation(EsqueceuSenha);