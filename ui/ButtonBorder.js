import React, { Component } from 'react';
import { Text,TouchableHighlight } from 'react-native';

class ButtonBorder extends Component {

  constructor() {
    super();
  }

  render() {
    return <TouchableHighlight 
      onPress={() => this.props.onPress}
      style={this.style.btnBorda}>
      <Text style={this.style.txtBtnBorda}>{this.props.title}</Text>
    </TouchableHighlight>
  }

  style = {
    btnBorda: {
      alignSelf: 'center',
      marginTop: 10,
      padding: 6,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: 'white'
    },
    txtBtnBorda: {
      color: 'white',
      textTransform: 'uppercase'
    }
  }
}

export default ButtonBorder;