import React from 'react';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import RubikText from '../ui/RubikText';

export default class AreaCliente extends React.Component {
  
  componentDidMount() {
    this.state = {
      userToken: null
    }
    this._loadUser().then(() => {
      this.state.userToken === null &&
        this.props.navigation.navigate("Cadastro")
      console.log(this.state.userToken)
    })
    .catch((e) => console.log("erro: ", e))
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('MeuPerfil')}
      >
        <RubikText>Meu Perfil</RubikText>
      </TouchableHighlight>
    );
  }

  _loadUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({
      userToken
    })
  }
}