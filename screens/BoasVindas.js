import React from 'react';
import { Text, View, Image } from 'react-native';
import Colors from '../constants/Colors'
import RubikText from '../ui/RubikText';
import Link from '../ui/Link';
import { withNavigation } from 'react-navigation';

class CupomContent extends React.Component {

  render() {
    if(this.props.isAuth) {
      return null
    }
    
    return <View style={this.style.container}>
      <View 
        style={{
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
      }}>
        <View style={{
          textAlign: 'center',
          position: 'relative',
          width: 120,
          alignItems: 'center'
          }}>
          <View style={{
            position: 'absolute',
            top: -25,
            padding: 10,
            paddingTop: 20
          }}>
            <Image
              source={require('../assets/bandeirola.png')}
              resizeMode="contain"
              style={{position:'absolute', width: 85,marginTop: -49, left: 0}}
            />
            <RubikText bold={true} 
              style={{
                fontSize:32,
                color: 'white'
              }}>10%</RubikText>
            <RubikText bold={true} 
              style={{
                fontSize:28,
                color: 'white',
                flexDirection: 'column'
              }}>OFF</RubikText>
          </View>
        </View>
        <View>
          <View style={{padding: 15, paddingRight: 0, textAlign:'left'}}>
          <RubikText bold={true} className="faca-seu-cadastro">FAÇA SEU CADASTRO </RubikText>
          <RubikText bold={true} className="faca-seu-cadastro" style={{marginTop: 5, marginBottom: 5}}>E GANHE UM CUPOM </RubikText>
          <RubikText bold={true} className="faca-seu-cadastro">DE BOAS-VINDAS!</RubikText>
          </View>
          <Link
            to="Cadastro"
            style={{
              borderWidth: 1,
              padding: 12
            }}
          >
            <RubikText bold={true} className="faca-seu-cadastro">QUERO ME CADASTRAR</RubikText>
          </Link>
        </View>
      </View>
    </View>
  }

  goTo = (page) => {
    this.props.navigation.navigate(page)
  }

  style = {
    container: {
      justifyContent: 'center',
      flexDirection: "row",
      backgroundColor: Colors.corPrimaria,
      padding: 15,
      paddingTop: 17,
      paddingBottom: 18,
    },
    bandeirola: {
      color: "#bdbbbc"
    }
  }
}

class BoasVindas extends React.Component {
  render() {
    return (
      <View>
        <CupomContent isAuth={false}/>
      </View>
    );
  }
}

export default withNavigation(BoasVindas)