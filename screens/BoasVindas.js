import React from 'react';
import { Text, View, Button } from 'react-native';
import Colors from '../constants/Colors'
import RubikText from '../ui/RubikText';
import { withNavigation } from 'react-navigation';

class BoasVindas extends React.Component {
/*
          <Link>
          </Link>
          */
  render() {
    return (
      <View>
        <View style={{ backgroundColor: Colors.fundoBanner }}>
            <Text>Faça seu cadastro e ganhe um cupom de boas vindas</Text>
            <Button title="Quero me cadastrar" onPress={() => this.props.navigation.navigate('Cadastro')} />
        </View>
          <RubikText>
            Com os cupons promocionais _Vestylle Megastore Jaú_, você tem desconto o ano inteiro
          </RubikText>
       </View>
    );
  }
}

export default withNavigation(BoasVindas)