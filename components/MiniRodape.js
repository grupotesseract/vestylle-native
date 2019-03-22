import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';

class MiniRodape extends Component {

  constructor() {
    super();
  }

  render() {
    return <View style={this.style.container}>
      
      <RubikText bold = {true}>Vestylle Megastore Jaú</RubikText>
      <RubikText style={{paddingTop:5, paddingBottom:5}}>Rua Edgard Ferraz 281, Jaú - SP | 17201-000</RubikText>
      <RubikText>+55 (14) 2104-3500</RubikText>

    </View>
  }

  style = {
    container: {
      backgroundColor: "white",
      paddingTop: 15,
      paddingBottom: 18,
      alignItems: 'center'
    }
  }
}

export default MiniRodape;