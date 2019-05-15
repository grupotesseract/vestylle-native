import React from 'react';
import { TouchableHighlight, AsyncStorage, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText'

class MenuButton extends React.Component {
  render() {
    return (
        <View 
          onTouchStart={() => this.props.navigation.navigate(this.props.page)}
          style={{ flexDirection: 'row', }}
        >
          <this.props.font 
            name={this.props.icon}
            size={26}
            style={{padding: 10, justifyContent: 'center', width: 46 }}
            color="white"
          />
          <RubikText style={{
            flexGrow: 1,
            borderBottomColor: '#fff',
            borderBottomWidth: this.props.noborder ? 0 : 1,
            color: 'white',
            textTransform: 'uppercase',
            padding: 5,
            paddingTop: 15,
            fontSize: 14
          }}>{this.props.label.toUpperCase()}</RubikText>
        </View>
    )
  }
}

export class MenuIcon extends React.Component {
  render() {
    return <TouchableHighlight onPress={()=>{}}
        onPress = {
          () => this.props.navigation.navigate('Menu')
        }
    >
        <Ionicons
        name="ios-menu"
        size={32}
        style={{ paddingRight: 20 }}
        />
    </TouchableHighlight>
  }
}

export default class Menu extends React.Component {
  render() {
    return (
        <View style={{ 
            flex: 1, 
            alignItems: 'stretch', 
            justifyContent: 'center', 
            backgroundColor: "#111",
            padding: 30,
            paddingLeft: 10
        }}>
            <MenuButton 
                navigation={this.props.navigation} 
                label="Início"
                page="Home"
                icon="md-home"
                font={Ionicons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Área do Cliente"
                page="AreaCliente"
                icon="person"
                font={MaterialIcons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Meus Pontos"
                page="MeusPontos"
                icon="star"
                font={FontAwesome}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Adicionar Cupom"
                page="AreaCliente"
                icon="qrcode-scan"
                font={MaterialCommunityIcons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Lista de Desejos"
                page="AreaCliente"
                icon="heart"
                font={MaterialCommunityIcons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Produtos"
                page="AreaCliente"
                icon="md-shirt"
                font={Ionicons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Loja"
                page="AreaCliente"
                icon="md-pin"
                font={Ionicons}
            />
            <MenuButton 
                navigation={this.props.navigation} 
                label="Fale Conosco"
                page="AreaCliente"
                icon="whatsapp"
                font={MaterialCommunityIcons}
                noborder={true}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <MaterialCommunityIcons
                  onPress={() => this.props.navigation.goBack()}
                  name="arrow-left"
                  size={26}
                  style={{padding: 10, justifyContent: 'center', width: 46 }}
                  color="white"
              />
              <MaterialCommunityIcons
                  onPress={this._signOutAsync}
                  name="power-standby"
                  size={26}
                  style={{padding: 10, justifyContent: 'center', width: 46 }}
                  color="white"
              />
            </View>
        </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}