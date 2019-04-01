import React from 'react';
import { AsyncStorage, View, Image, ScrollView } from 'react-native';
import RubikText from '../ui/RubikText';
import Link from '../ui/Link'
import Breadcrumb from '../ui/Breadcrumb'
import MiniRodape from '../components/MiniRodape'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

export default class AreaCliente extends React.Component {
  
  componentDidMount() {
    this.state = {
      userToken: null
    }
    this._loadUser().then(() => {
      this.state.userToken === null &&
        this.props.navigation.navigate("Cadastro")
    })
    .catch((e) => console.log("erro: ", e))
  }

  render() {
    return <ScrollView style={{backgroundColor: '#1d1e1b'}}>

        <Breadcrumb><RubikText bold={true} style={{color:'white'}}>Área do Cliente</RubikText></Breadcrumb>

        <View style={{flexDirection:'row', textAlign: 'center'}}>
          <View style={{width: '20%'}}>
          </View>
          <View style={{width:'60%',justifyContent: 'center', alignItems:'center', padding: 5}}>
            <RubikText style={{color: 'white', fontSize: 20}}>Olá Ciclana,</RubikText>
            <RubikText style={{color: 'white', fontSize: 20}}>seja bem-vinda</RubikText>
          </View>
          <Link 
            navigation={this.props.navigation} 
            to="AdicionarCupom"
            style={{
              width:'20%', 
              backgroundColor:'#feca03', 
              borderTopLeftRadius: 5, 
              borderBottomLeftRadius: 5, 
              flexDirection: 'column', 
              alignItems: 'center',
              padding: 5}}>
            <Image
              source={require('../assets/qrcode.png')}
              style={{ height: 32, width:32, flexGrow: 0 }}
            />
            <RubikText style={{fontSize: 10, textAlign: 'center'}}>Adicionar cupom</RubikText>
          </Link>
        </View>

        <View style={{marginTop: 20, paddingRight: 10, paddingLeft: 10, flexDirection: 'row'}}>
          <Link 
            navigation={this.props.navigation} 
            to="MeuPerfil" 
            style={this.style.btnMeuPerfil}>
            <MaterialCommunityIcons
              name="account"
              size={64} 
              color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>MEU PERFIL</RubikText>
          </Link>
          <Link 
            navigation={this.props.navigation} 
            to="MeusPontos" style={this.style.btnMeuPerfil}>
            <FontAwesome
              name="star"
              size={64} 
              color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>MEUS PONTOS</RubikText>
          </Link>
        </View>

        <View style={{paddingRight: 10, paddingLeft: 10, paddingBottom: 20, flexDirection: 'row'}}>
          <Link 
            navigation={this.props.navigation} 
            to="ListaDesejos" 
            style={this.style.btnMeuPerfil}>
            <FontAwesome
              name="heart"
              size={64} 
              color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>LISTA DE DESEJOS</RubikText>
          </Link>
          <Link 
            navigation={this.props.navigation} 
            to="MeusCupons" 
            style={this.style.btnMeuPerfil}>
            <Image
              source={require('../assets/qrcode.png')}
              style={{ height: 64, width:64, flexGrow: 0 }}
            />
            <RubikText style={this.style.fonteBotao} bold={true}>MEUS CUPONS</RubikText>
          </Link>
        
        </View>
      <MiniRodape/>
      </ScrollView>
    
  }

  style = {
    btnMeuPerfil: {
      backgroundColor: 'white',
      flexDirection: 'column',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 10,
      flex: 1
    },
    fonteBotao: {
      margin: 2,
      marginTop: 10,
      marginBottom: 10,
      color: '#1e1e1c',
      alignSelf: 'center',
      flexGrow: 0,
      textAlign: 'center'
    }
  }

  _loadUser = async () => {
    // carregar nome ao invés de token
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({
      userToken
    })
  }
}