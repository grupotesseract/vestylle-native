import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';

class SimpleMenu extends Component {

  constructor() {
    super();
  }

  render() {
    return <View style={this.style.container}>
      <TouchableHighlight
        onPress = {() => this.goTo("qrcode")}
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
      <TouchableHighlight
        onPress = {() => this.goTo("")}
      >
        <MaterialCommunityIcons
          name="whatsapp"
          size={26}
          style={this.style.icon}
        />
      </TouchableHighlight>
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