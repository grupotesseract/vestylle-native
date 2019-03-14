import React from 'react';
import { View, StyleSheet, Text, AsyncStorage, Button, ImageBackground, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Link from '../ui/Link'

export default class CadastroScreen extends React.Component {

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundocadastro.png')}
        style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>

        <View style={styles.rightAlign}>
          <Text style={{color:'#FFFFFF'}}>Faça seu cadastro e receba benefícios exclusivos</Text>

          <TouchableHighlight 
            style={styles.botaoQuadrado}
            onPress={this._signInAsync}>
              <FontAwesome
                name="facebook"
                size={15}
                color="white">
                <Text style={styles.fontBotao}> Cadastrar com FACEBOOK</Text>
              </FontAwesome>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.botaoQuadrado}
            onPress={this._signInAsync}>
              <FontAwesome
                name="user-circle"
                size={15}
                color="white">
                <Text style={styles.fontBotao}> Cadastrar com CPF ou E-MAIL</Text>
              </FontAwesome>
          </TouchableHighlight>
          <View style={[styles.fullCenter,{paddingRight:30}]}>
            <Text style={styles.textoSmall}>Sobre o programa </Text>
            <Link 
              navigation={this.props.navigation}
              title="Cliente Vestylle Megastore Jaú" 
              to="Home"
              fontSize="8"
            />
          </View>
        </View>

        <View style={styles.fullCenter}>
          <Text style={styles.textoSmall}>Já possui cadastro?</Text>
          <Link
            navigation={this.props.navigation}
            title="Acesse sua conta" 
            to="Login"
            fontSize="8"
          />
        </View>

      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  textoSmall: {
    color: '#FFFFFF',
    fontSize: 8
  },
  fontBotao: {
    fontSize: 12,
    marginLeft: 10
  },
  rightAlign: {
    flexDirection: 'column',
    width: '70%',
    color: '#FFFFFF',
    paddingBottom: 50
  },
  botaoQuadrado: {
    marginTop: 3,
    marginBottom: 3,
    marginRight: 30,
    padding: 6,
    borderWidth: 1,
    borderColor: 'white',
  },
  fullCenter: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  }
})