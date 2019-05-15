import React, { Component } from 'react';
import { View } from 'react-native';
import RubikText from '../ui/RubikText';

class MiniRodape extends Component {

  render() {
    return <View style={this.style.container}>
      
      <RubikText bold = {true}>Vestylle Megastore Jaú</RubikText>
      <RubikText style={{paddingTop:5, paddingBottom:5, fontSize: 12}}>Rua Edgard Ferraz 281, Jaú - SP | 17201-440</RubikText>
      <RubikText style={{fontSize: 12}}>+55 (14) 2104-3500</RubikText>

    </View>
  }

  style = {
    container: {
      backgroundColor: "white",
      paddingTop: 15,
      paddingBottom: 18,
      alignItems: 'center',
      marginTop: 'auto',
    }
  }
}

export default MiniRodape;