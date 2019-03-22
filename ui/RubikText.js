import React, { Component } from 'react';
import { Text,TouchableHighlight } from 'react-native';

class RubikText extends Component {

  constructor() {
    super();
  }

  render() {
    return <Text 
      style={[this.style.textoRubik, this.props.style, this.props.bold ? this.style.bold : {}]}>
      {this.props.children}
    </Text>
  }

  style = {
    textoRubik: {
      fontFamily: 'Rubik'
    },
    bold: {
      fontFamily: 'RubikBold'
    }
  }
}

export default RubikText;