import React, { Component } from 'react';
import { View } from 'react-native';
import RubikText from '../ui/RubikText';
import { LojaConsumer } from '../LojaContext';


class InfosMiniRodape extends Component {

  render() { 

    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }

    return <View style={this.style.container}>
      <RubikText bold = {true}>Vestylle Megastore Jaú</RubikText>
      <RubikText style={{paddingTop:5, paddingBottom:5, fontSize: 12}}> {dadosLoja.endereco} </RubikText>
      <RubikText style={{fontSize: 12}}> {dadosLoja.telefone} </RubikText>
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

class MiniRodape extends Component {

  render() {
    return ( <>
      <View>
        <LojaConsumer>
          {({ dadosLoja }) => (<>
            <InfosMiniRodape
              dadosLoja={dadosLoja}
            />
          </>
          )}
        </LojaConsumer>
      </View> 
    </React.Fragment>
    )
  }
}

export default MiniRodape;
