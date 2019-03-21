import React from 'react';
import { Text, View, AsyncStorage, Button, ScrollView } from 'react-native';
import BoasVindas from './BoasVindas'
import SimpleMenu from '../components/SimpleMenu'

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <SimpleMenu/>
          <BoasVindas/>
          <Button title="Logoff" onPress={this._signOutAsync} />
        </ScrollView>
       </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}