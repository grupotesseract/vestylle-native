import React from 'react';
import { Button, Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'

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
          <Text style={{
            flexGrow: 1,
            borderBottomColor: '#fff',
            borderBottomWidth: this.props.noborder ? 0 : 1,
            color: 'white',
            textTransform: 'uppercase',
            padding: 5,
            paddingTop: 15,
            fontSize: 14
          }}>{this.props.label.toUpperCase()}</Text>
        </View>
    )
  }
}

export class MenuIcon extends React.Component {
  render() {
    return <Button
        onPress = {
          () => this.props.navigation.navigate('Menu')
        }
        navigation = {this.props.navigation}
        title = "Info"
        color = "#fff"
    />
  }
}

export class Menu extends React.Component {
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
                page="AreaCliente"
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
            <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
            />
        </View>
    );
  }
}