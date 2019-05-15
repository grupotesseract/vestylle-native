import React from 'react';
import { View } from 'react-native';
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import { UserConsumer } from '../UserContext';

class ListagemDesejos extends React.Component {

  state = {
    listaDesejos: null,
    loading: false
  }

  componentDidMount() {
    if(this.props.getOfertas) {
      this.props.getOfertas()
      .then((listaDesejos) => {
      this.setState({listaDesejos})
      console.log("return getofertas", listaDesejos)
      })
    }    
  }

  static getDerivedStateFromProps(props, state) {
    const loading = props.isAuth && props.listaDesejos === null
    if (props.listaDesejos !== state.listaDesejos) {
      return {
        listaDesejos: props.listaDesejos,
        loading
      };
    }

    // Return null to indicate no change to state.
    return null;
  }



  render() {
      return <RubikText>
        Alo
      </RubikText>
  }
}

export default class ListaDesejos extends React.Component {

  render() {
    return ( <View>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>
          Lista de desejos
        </RubikText>
      </Breadcrumb>
    

  
      <UserConsumer>
      {({listaDesejos, getOfertas}) => (<>
          <ListagemDesejos
            listaDesejos={listaDesejos}
            getOfertas={getOfertas}
          />
      </>
      )}
      </UserConsumer> 
      <RodapeCompleto/>
    </View>
    )
  }
}