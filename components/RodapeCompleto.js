import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Linking } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { LojaConsumer } from '../LojaContext';
import RubikText from '../ui/RubikText';
import MiniRodape from './MiniRodape'

class InfosRodape extends React.Component {

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  state = {
    dadosLoja: null,
    loading: false
  }

  componentDidMount() {
    if(this.props.atualizaDadosLoja) {
      this.props.atualizaDadosLoja()
      .then((dadosLoja) => {
        this.setState({dadosLoja})
      })
    }    
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dadosLoja !== state.dadosLoja) {
      return {
        dadosLoja: props.dadosLoja
      };
    }

    return null;
  }

  render() {

    if(!this.state.dadosLoja) {
      return <></>
    }

    const dados = this.state.dadosLoja

    return <View style={{ width: '100%' }}>

      <View style={this.style.container}>
        <Image
          source={require('../assets/logofull.png')}
          resizeMode="contain"
          style={{ width: '70%', alignSelf: 'center' }}
        />
        <RubikText bold={true} style={{ fontSize: 19, marginTop: -20 }}>Estamos te esperando</RubikText>
        <View style={[this.style.toLeft, this.style.paddingTopBottom]}>
          <RubikText bold={true} style={{ fontSize: 14 }}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
            /> Horário de funcionamento</RubikText>
          <RubikText style={{ fontSize: 14 }}>Segunda a Sexta 9h as 18h</RubikText>
          <RubikText style={{ fontSize: 14 }}>Sábados 9h as 17h</RubikText>
        </View>
        <TouchableHighlight onPress={() => Linking.openURL("http://maps.apple.com/?ll=-22.2955408,-48.5574577,17&q=Vestylle+Megastore&address=R.+Edgard+Ferraz%2c+281+-+Centro%2c+Ja%c3%ba+-+SP%2c+17201-440")}>
          <RubikText bold={true} style={{ fontSize: 14, textDecorationLine: 'underline' }}>VER LOCALIZAÇÃO NO MAPA</RubikText>
        </TouchableHighlight>
      </View>
      <View style={this.style.faleConosco}>

        <View style={this.style.linhaDuvidas}>
          <View style={this.style.duvidas}>
            <RubikText bold={true} style={{ color: "white" }}>
              DÚVIDAS ?
            </RubikText>
          </View>
          <Image
            source={require('../assets/atendente.png')}
            resizeMode="contain"
            style={{ height: 30, width: 30, flexGrow: 0, marginRight: 5, marginLeft: 5 }}
          />
          <View style={this.style.faleComAtendentes}>
            <RubikText bold={true} style={{ color: "#feca03" }}>FALE CONOSCO</RubikText>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <RubikText style={{ color: "white", paddingLeft: 20 }}>
            Iniciar conversa pelo
          </RubikText>
          <TouchableHighlight onPress={this.openWhatsapp} style={{ flexGrow: 1, marginLeft: 2, justifyContent: "flex-start" }}>
            <RubikText style={{ color: "#feca03", textDecorationLine: 'underline' }}>Whatsapp</RubikText>
          </TouchableHighlight>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableHighlight onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=55" + this.onlyNumbers(dados.whatsapp))}>
            <RubikText style={{ color: "#feca03", textDecorationLine: 'underline', flexGrow: 0, marginRight: 2 }}>
              <MaterialCommunityIcons
                name="whatsapp"
                size={14}
              /> {dados.whatsapp}
            </RubikText>
          </TouchableHighlight>
          {dados.whatsapp2 ?
            <TouchableHighlight onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=55" + this.onlyNumbers(dados.whatsapp2))}>
              <RubikText style={{ color: "#feca03", textDecorationLine: 'underline', flexGrow: 0, marginLeft: 2 }}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={14}
                />{dados.whatsapp2}
              </RubikText>
            </TouchableHighlight>
            : <></>
          }
        </View>

        <View style={{ alignItems: 'flex-start', flexGrow: 1, alignSelf: 'stretch' }}>
          <RubikText style={{ color: "white", paddingTop: 20, paddingLeft: 20 }}>
            Ou se preferir, você pode entrar em
          </RubikText>
          <RubikText style={{ color: "white", paddingLeft: 20 }}>
            contato com a loja pelo telefone
          </RubikText>
        </View>
        <TouchableHighlight onPress={() => Linking.openURL("tel:" + this.onlyNumbers(dados.telefone))}>
          <RubikText style={{ color: "white" }}>
            <MaterialCommunityIcons
              name="phone"
              size={14}
              style={this.style.icon}
            /> {dados.telefone}
          </RubikText>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => Linking.openURL("mailto:" + dados.email)}
          style={this.style.email}
        >
          <RubikText style={{ color: "white" }}>
            <MaterialCommunityIcons
              name="email"
              size={14}
              style={{ color: "#feca03", paddingTop: 5 }}
            /> {dados.email}
          </RubikText>
        </TouchableHighlight>
      </View>
    </View>
  }

  openWhatsapp = () => {
    Linking.openURL("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dados.whatsapp))
  }

  style = {
    container: {
      backgroundColor: "#ebebeb",
      alignItems: "center",
      paddingTop: 3,
      paddingBottom: 25,
    },
    paddingTopBottom: {
      paddingBottom: 18,
      paddingTop: 18,
    },
    toLeft: {
      paddingLeft: 10,
      alignItems: "flex-end",
      alignSelf: "flex-start"
    },
    faleConosco: {
      backgroundColor: "black",
      alignItems: "center",
      paddingTop: 25,
      paddingBottom: 20
    },
    linhaDuvidas: {
      flexDirection: "row",
    },
    duvidas: {
      flexDirection: "row",
      backgroundColor: "#e20f17",
      color: "white",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: 10,
      borderBottomRightRadius: 15,
      borderTopRightRadius: 15,
      flexGrow: 4
    },
    faleComAtendentes: {
      flexGrow: 8,
      justifyContent: 'center',
    },
    email: {
      borderTopWidth: 1,
      borderColor: "#feca03",
      paddingTop: 5,
      marginTop: 10,
      width: '70%',
      alignSelf: 'flex-end',
      justifyContent: 'flex-start'
    }
  }

}

export default class RodapeCompleto extends React.Component {

  render() { 
    return ( <React.Fragment>
      <View>
        <LojaConsumer>
          {({ atualizaDadosLoja, dadosLoja }) => (<>
            <InfosRodape
              atualizaDadosLoja={atualizaDadosLoja}
              dadosLoja={dadosLoja}
            />
          </>
          )}
        </LojaConsumer>
      </View> 
      <MiniRodape />
    </React.Fragment>
    )
  }

}
