import React, { Component } from 'react';
import { Text,TouchableHighlight } from 'react-native';

class Link extends Component {

  constructor() {
    super();
  }

  render() {
    return <TouchableHighlight 
      onPress={() => this.props.navigation.navigate(this.props.to)}>
      <Text style={this.style.textoLink}>{this.props.title}</Text>
    </TouchableHighlight>
  }

  style = {
    textoLink: {
        color: '#FFFFFF',
        textDecorationLine: 'underline',
        fontSize: 8
    }
  }
}

export default Link;