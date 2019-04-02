import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import RubikText from '../ui/RubikText';

class Link extends Component {

  constructor() {
    super();
  }

  render() {
    return <TouchableHighlight 
      onPress={() => this.props.navigation.navigate(this.props.to)}
      style={this.props.style}>
      <>
        { this.props.title && (
          <RubikText 
            style={[this.style.textoLink, { fontSize: Number(this.props.fontSize) }]}
          >
            {this.props.title}
          </RubikText>
        )}
        {this.props.children}
      </>
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