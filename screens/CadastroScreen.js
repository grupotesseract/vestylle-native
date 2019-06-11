import React from 'react';
import { View, StyleSheet, AsyncStorage, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Link from '../ui/Link'
import RubikText from '../ui/RubikText';
import { Facebook } from 'expo';
import { UserConsumer } from '../UserContext';
class FBButton extends React.Component {

  render() {
    return  <TouchableHighlight 
      style={styles.botaoQuadrado}
      onPress={this.logInFacebook}>
        <FontAwesome
          name="facebook"
          size={15}
          color="white">
          <RubikText style={styles.fontBotao}> Login com FACEBOOK</RubikText>
        </FontAwesome>
    </TouchableHighlight>
  }

  logInFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('654012085033078', {
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        this.props.setFacebookToken(token)
        this.props.navigation.navigate('App');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
   
}

export default class CadastroScreen extends React.Component {

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundocadastro.jpg')}
        style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>

        <Image
          source={require('../assets/logobranco.png')}
          resizeMode="contain"
          style={{ width:'80%', alignSelf: 'flex-start', marginLeft: 15, marginBottom: 'auto' }}
        />
        <View style={styles.rightAlign}>
          <RubikText style={{color:'#FFFFFF'}}>Faça seu cadastro e receba benefícios exclusivos</RubikText>

          <UserConsumer>
          {({ setFacebookToken }) => (
            <FBButton
              setFacebookToken={setFacebookToken}
              navigation={this.props.navigation}
            />
          )}
          </UserConsumer>

          <TouchableHighlight
            style={styles.botaoQuadrado}
            onPress={() => this.props.navigation.navigate("CadastroSimples")}>
              <FontAwesome
                name="user-circle"
                size={15}
                color="white">
                <RubikText style={styles.fontBotao}> Cadastrar com CPF ou E-MAIL</RubikText>
              </FontAwesome>
          </TouchableHighlight>
        </View>

        <View style={styles.fullCenter}>
          <RubikText style={styles.textoSmall}>JÁ POSSUI CADASTRO? </RubikText>
          <Link
            navigation={this.props.navigation}
            title="ACESSE SUA CONTA" 
            to="Login"
            fontSize="8"
          />
        </View>

      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  textoSmall: {
    color: '#FFFFFF',
    fontSize: 8
  },
  fontBotao: {
    fontSize: 10,
    marginLeft: 7
  },
  rightAlign: {
    flexDirection: 'column',
    width: '70%',
    color: '#FFFFFF',
    paddingBottom: 40
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
    paddingBottom: 25,
    marginTop: 10
  }
})