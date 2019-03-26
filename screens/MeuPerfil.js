import React from 'react';
import { TouchableHighlight, ScrollView, View, StyleSheet, ImageBackground, TextInput, AsyncStorage } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import MiniRodape from '../components/MiniRodape';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

class Checkbox extends React.Component {

  render() { 
    return <TouchableHighlight
      onPress={this.toggleCheckbox}
      style={this.props.style}
      >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialCommunityIcons
        name={this.props.value ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
        size={26}
        style={{color:'white'}}
      />
      <RubikText style={{color: 'white', paddingLeft: 5}}>{this.props.title}</RubikText>
    </View>
    </TouchableHighlight>
  }

  toggleCheckbox = () => {
    const newValue = !this.props.value;
    this.props.onChange(newValue);
  }
}
class InputValidacao extends React.Component {

  render() {
    return (
      <View>
        <RubikText bold={true} style={{color: '#feca03', fontSize:12, marginTop: 3}}>{this.props.title}</RubikText>
        <TextInput 
          style={this.style.inputSublinhado} 
          value={this.props.value}
          onChangeText={this.props.onChange}
          />
      </View>
    )
  }  

  style = {
    inputSublinhado: {
      borderBottomWidth: 1,
      color: 'white',
      borderColor: '#585756',
      marginTop: 5,
      marginBottom: 8,
      paddingBottom: 2,
      fontSize: 15
    }
  }
}

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
    erroAtualizaPerfil: false,
    msgErro: '',
    nome: '',
    email: '',
    cpf: '',
    nascimento: '',
    celular: '',
    receberNovidades: false
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', height: '100%'}}>
        <ScrollView style={{ alignSelf: 'stretch'}}>
        <View style={{padding: 20}}>
          <RubikText bold={true} style={{color:'white', fontSize: 14, marginTop: 10, marginBottom: 10}} >Meu perfil</RubikText>
          <InputValidacao 
            title="Nome" 
            value={this.state.nome}
            onChange={(nome) => this.setState({nome})}/>
          <InputValidacao 
            title="E-mail" 
            value={this.state.email}
            onChange={(email) => this.setState({email})}/>
          <InputValidacao 
            title="CPF" 
            value={this.state.cpf}
            onChange={(cpf) => this.setState({cpf})}/>
          <InputValidacao 
            title="Data de Nascimento" 
            value={this.state.nascimento}
            onChange={(nascimento) => this.setState({nascimento})}/>
          <InputValidacao 
            title="Celular" 
            value={this.state.celular}
            onChange={(celular) => this.setState({celular})}/>

          <Checkbox
            title="Quero receber novidades e ofertas da Vestylle Megastore Jaú"
            value={this.state.receberNovidades}
            onChange={(receberNovidades) => this.setState({receberNovidades})}
            style={{paddingTop: 20, paddingBottom: 15}}/>
          
          <ButtonBorder
            title="CONTINUAR"
            onPress={this.atualizarPerfil}
            style={{marginBottom: 40}}
          />
        </View>
        <MiniRodape/>
        </ScrollView>
      </ImageBackground>
    );
  }

  atualizarPerfil = async () => {
    const jsonRes = await this.fetchPerfil();
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

  fetchPerfil = async () => {
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

}
