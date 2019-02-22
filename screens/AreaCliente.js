import React from 'react';
import { Text } from 'react-native';
import { AsyncStorage } from 'react-native';

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
      <Text>Area do Cliente</Text>
    );
  }

  _loadUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({
      userToken
    })
  }
}