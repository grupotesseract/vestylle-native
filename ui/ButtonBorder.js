import React, { Component } from 'react';
import { Text,TouchableHighlight,View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

class ButtonBorder extends Component {

  render() {
    return <TouchableHighlight 
      onPress={this.props.onPress}
      style={this.style.btnBorda}>
      <View style={this.props.style || {}}>
      <Text style={this.style.txtBtnBorda}>
      {this.props.title}
      {this.props.loading ? (<FontAwesome name="spinner" color="white"/>) : ''}
      </Text>
      </View>
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