import React from 'react';
import { Text, View, AsyncStorage, Button, ScrollView } from 'react-native';
import BoasVindas from './BoasVindas'
import SimpleMenu from '../components/SimpleMenu'
import RodapeCompleto from '../components/RodapeCompleto'
import SliderCupom from '../components/SliderCupom';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <SimpleMenu/>
          <SliderCupom/>
          <BoasVindas/>
          <Button title="Logoff" onPress={this._signOutAsync} />
          <RodapeCompleto/>
        </ScrollView>
       </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}