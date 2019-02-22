import React from 'react';
import { Text, View, AsyncStorage, Button, ScrollView } from 'react-native';
import Colors from '../constants/Colors'
import { withNavigation } from 'react-navigation';

class BoasVindas extends React.Component {

  render() {
    return (
      <View>
        <Text>Com os cupons promocionais _Vestylle Megastore Jaú_, você tem desconto o ano inteiro</Text>
        <View style={{ backgroundColor: Colors.fundoBanner }}>
            <Text>Faça seu cadastro e ganhe um cupom de boas vindas</Text>
            <Button title="Quero me cadastrar" onPress={() => this.props.navigation.navigate('Cadastro')} />
        </View>
       </View>
    );
  }
}

export default withNavigation(BoasVindas)