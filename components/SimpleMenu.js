import React, { Component } from 'react';
import { TouchableHighlight, View, Linking } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';
import { LojaConsumer } from '../LojaContext';

class SimpleMenu extends Component {

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  constructor() {
    super();
  }

  render() {
    return <View style={this.style.container}>
      <TouchableHighlight
        onPress = {() => this.goTo("AdicionarCupom")}
      >
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={26}
          style={this.style.icon}
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {() => this.goTo("MeusPontos")}
      >
        <MaterialCommunityIcons
          name="star"
          size={26}
          style={this.style.icon}
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {() => this.goTo("ListaDesejos")}
      >
        <MaterialCommunityIcons
          name="cards-heart"
          size={26}
          style={this.style.icon}
        />
      </TouchableHighlight>
      <LojaConsumer>
        {({ dadosLoja }) =>

          <TouchableHighlight
            onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=55" + this.onlyNumbers(dadosLoja ? dadosLoja.whatsapp : null))}
          >
            <MaterialCommunityIcons
              name="whatsapp"
              size={26}
              style={this.style.icon}
            />
          </TouchableHighlight>
        }
      </LojaConsumer>

    </View>
  }

  goTo = (page) => {
    this.props.navigation.navigate(page)
  }

  style = {
    container: {
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: "#bdbbbc",
      flexDirection: "row",
      backgroundColor: "#ebebeb",
      paddingTop: 7,
      paddingBottom: 8,
      justifyContent: "space-around"
    },
    icon: {
      color: "#bdbbbc"
    }
  }
}

export default withNavigation(SimpleMenu)