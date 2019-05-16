import React from 'react';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import BoasVindas from './BoasVindas'
import SimpleMenu from '../components/SimpleMenu'
import RodapeCompleto from '../components/RodapeCompleto'
import SliderCupom from '../components/SliderCupom';
import SliderOfertas from '../components/SliderOfertas';
import RubikText from '../ui/RubikText';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <SimpleMenu/>
          <SliderCupom/>
          <View style={{alignItems: 'center', paddingTop: 4}}>
            <RubikText bold={true} style={{fontSize: 25}}>
            preparamos
            </RubikText>
            <RubikText bold={true} style={{fontSize: 26}}>
            benefícios exclusivos
            </RubikText>
            <RubikText bold={true} style={{fontSize: 25}}>
            para você
            </RubikText>
          </View>
          <View 
          style={{
            alignItems: 'center', 
            margin: 28, 
            paddingTop: 15,
            paddingBottom: 10,
            borderTopWidth: 1,
            borderColor: '#585756'
          }}>
            <RubikText bold={true} style={this.style.textoCinza}>Com os cupons promocionais</RubikText>
            <RubikText bold={true} style={this.style.textoCinza}>
            Vestylle Megastore Jaú, você tem
            </RubikText>
            <RubikText bold={true} style={this.style.textoCinza}>desconto o ano inteiro.</RubikText>
          </View>
          <BoasVindas/>
          <SliderOfertas/>
          <TouchableHighlight
            style={this.style.btnPreto}
            onPress={() => console.log("clicou no btn")}>
            <RubikText style={{color: 'white'}}>TODOS OS PRODUTOS</RubikText>
          </TouchableHighlight>
          <RodapeCompleto/>
        </ScrollView>
       </View>
    );
  }

  style = {
    textoCinza: {
      fontSize: 15,
      color: '#585756'
    },
    btnPreto: {
      backgroundColor: "black",
      padding: 12,
      paddingLeft: 40,
      paddingRight: 40,
      marginTop: 30,
      marginBottom: 40,
      borderRadius: 4
    }
  }

}