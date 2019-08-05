import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import Produto from '../components/Produto';
import { UserConsumer } from '../UserContext';
import BoasVindas from './BoasVindas'
import Link from '../ui/Link';
import ProdutoThumb from '../components/ProdutoThumb';
import FontAwesome from '@expo/vector-icons/FontAwesome';

class ListaProdutos extends React.Component {

  state = {
    ofertas: [],
    listaDesejos: [],
    visualizacao: 'full',
    atualizaOfertas: null
  }

  constructor() {
    super();
    this.atualizaOfertas = this.atualizaOfertas.bind(this)
  }

  atualizaOfertas() {
    this.props.atualizaListaDesejos();
    this.props.atualizaOfertas();
    this.props.getOfertasComLike()
    .then((ofertas) => {
      this.setState({ofertas})
    })
  }

  componentDidMount() {
    this.setState({
      atualizaOfertas: this.atualizaOfertas
    })
    this.atualizaOfertas();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.listaDesejos !== state.listaDesejos) {
      if(state.atualizaOfertas) {
        state.atualizaOfertas()
      }
      return {
        listaDesejos: props.listaDesejos,
      };
    }
    if (props.visualizacao !== state.visualizacao) {
      return {
        visualizacao: props.visualizacao,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }


  render() {

    if(this.state.visualizacao === 'thumb') {
      return <View style={{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        marginBottom: 50
        }}>
      {this.state.ofertas.map((oferta, key) => {
        return (
        <View 
          style={{
            position:'relative', 
            maxWidth: '50%', 
            float: 'left',
            minWidth: 160
          }} 
          key={key}>
          <ProdutoThumb
            id={oferta.id}
            img={oferta.urlFoto}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
        )
      })}
      </View>
    }

  return <>
    {this.state.ofertas.map((oferta, key) => {
      let rowBackground = null

      // Exibe um div de background a cada 2 produtos
      // (somente na visualizacao full)
      if(key%2 === 0 && this.state.visualizacao === 'full') {
        rowBackground = <View style={{
          position: 'absolute',
          height: '50%',
          width: '100%',
          backgroundColor: '#55bcba',
          top: '25%',
          zIndex: 1
        }}></View>
      }


      return (
      <View style={{position:'relative'}} key={key}>
        {rowBackground}
        <View style={{paddingTop:30, paddingBottom: 30, zIndex:2}}>
          <Produto
            key={key}
            id={oferta.id}
            urlFoto={oferta.urlFoto}
            liked={oferta.liked}
            titulo={oferta.titulo}
            subtitulo={oferta.subtitulo}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
      </View>
    )})}
    </>
  }
}

export default class Produtos extends React.Component {

  state = {
    visualizacao: 'full'
  }

  render() {
    return ( <ScrollView>
      <Breadcrumb>
        <RubikText bold={true} style={{color: '#585756'}}>Produtos</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
          <LaughingSmiling>das melhores marcas!</LaughingSmiling>
        </View>
      </View>

      <View style={{ padding: 10, paddingLeft: 30, paddingRight: 30}}>

        <View 
          style={{ 
           borderTopWidth: 2, 
            borderBottomWidth: 2, 
            borderColor: 'black', 
            borderStyle: 'solid', 
            marginTop: 5,
            marginBottom: 5,
            flexDirection: 'row'
          }}>
          <Link to="ListaDesejos"
          style={{
            paddingTop: 0, 
            paddingBottom:0,
            paddingRight: 2,
            flexDirection: 'row'
          }}>
            <FontAwesome
              name="heart" 
              size={20}
              style={{padding: 2,marginRight: 10, flexShrink: 0}}
            />
            <RubikText style={{textAlign: 'left', fontSize: 12,flexShrink: 1}}> Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
          </Link>
         
        </View>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <RubikText bold={true} style={{color: 'black'}}>Confira as novidades</RubikText>
      </View>

      <View>
        <UserConsumer>
        {({listaDesejos, getOfertasComLike, atualizaOfertas, atualizaListaDesejos}) => (
          <ListaProdutos
            atualizaOfertas={atualizaOfertas}
            atualizaListaDesejos={atualizaListaDesejos}
            getOfertasComLike={getOfertasComLike}
            listaDesejos={listaDesejos}
            visualizacao={this.state.visualizacao}
          />
        )}
        </UserConsumer>
      </View>
      <BoasVindas/>
      <RodapeCompleto/>
    </ScrollView>
    )
  }

  setVisualizacaoGrande() {
    this.setState({ visualizacao: 'full' })
  }

  setVisualizacaoMiniatura() {
    this.setState({ visualizacao: 'thumb' })
  }
}