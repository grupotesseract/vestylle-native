import React, { Component } from 'react';
import { Text,TouchableHighlight } from 'react-native';

class LaughingSmiling extends Component {

  constructor() {
    super();
  }

  render() {
    return <Text 
      style={[this.style.textoLS, this.props.style, this.props.bold ? this.style.bold : {}]}>
      {this.props.children}
    </Text>
  }

  style = {
    textoLS: {
      alignContent: 'center',
      textAlign: 'center',
      fontFamily: 'LaughingSmiling',
      fontSize: 18,
      padding:4
    },
    bold: {
      fontFamily: 'RubikBold'
    }
  }
}

export default LaughingSmiling;