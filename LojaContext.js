import React from 'react';
import Api from './constants/Api';

const LojaContext = React.createContext();

class LojaProvider extends React.Component {
    state = {
        ofertas: null,
        cupons: null,
        dadosLoja: null
    }

    constructor() {
        super()
        this.atualizaDadosLoja = this.atualizaDadosLoja.bind(this)
    }

  componentDidMount() {
    this.atualizaDadosLoja()
    .catch((msg) => console.log(msg))
  }

  async atualizaDadosLoja() {
    const res = await fetch(Api.url+'/lojas')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizaDadosLoja',erro))
    if(res && res.success) {
      const dadosLoja = res.data;
      this.setState({dadosLoja})
      return dadosLoja
    } 
    if(res && !res.success) {
      throw res.message
    }
    if(!res) {
      return {}
    }
  }
  render() {
    return (
      <LojaContext.Provider
        value={{ 
          atualizaDadosLoja: this.atualizaDadosLoja,
          dadosLoja: this.state.dadosLoja
        }}
      >
        {this.props.children}
      </LojaContext.Provider>
    )
  }

  
}

const LojaConsumer = LojaContext.Consumer

export { LojaProvider, LojaConsumer }