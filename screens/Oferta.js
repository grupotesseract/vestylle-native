import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import BoasVindas from './BoasVindas';
import Link from '../ui/Link';
import { UserConsumer } from '../UserContext';
import Swiper from 'react-native-swiper';

class ProdutoDetalhado extends React.Component {

  state = {
    oferta: null
  }

  sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };


  componentDidMount() {
    if(this.props.produtoId) {
      this.props.getOfertaById(this.props.produtoId, this.props.userToken)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  componentWillReceiveProps(props) {
    if(props.produtoId) {
      props.getOfertaById(props.produtoId, props.userToken)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  render() {
    const { width } = Dimensions.get('window')
    const oferta = this.state.oferta
    if (!oferta) return <></>
    const cupom = oferta && oferta.cupons && oferta.cupons.length > 0 ? oferta.cupons[0] : null
    const porcentagem_off = cupom && cupom.id ? cupom.porcentagem_off : oferta.porcentagem_off
    return (
      <>
      {Number(porcentagem_off) > 0 && (
      <View style={{
        alignItems: 'center',
        backgroundColor: '#e20f17',
        padding: 10,
        marginTop: 20,
        marginBottom:-15
      }}>
        <RubikText bold={true} style={{ fontSize: 20, color: 'white' }}>
          {cupom && cupom.id && 
            porcentagem_off+"% OFF COM CUPOM"
          }
          {cupom && cupom.id && !cupom.porcentagem_off && 
            "DESCONTO COM CUPOM"
          }
          {(!cupom || !cupom.id) && 
            porcentagem_off+"% OFF"
          }
        </RubikText>
      </View>

      )}
      <View style={{
        alignItems: 'center',
        backgroundColor: '#55bcba',
        padding: 10,
        marginTop: 20,
        marginBottom:5
      }}>
        <RubikText bold={true} style={{ fontSize: 20 }}>
          {oferta.titulo.toUpperCase()}
        </RubikText>
      </View>
      
      <View style={{
        marginBottom: 20,
      }}>
        <RubikText style={{alignSelf: 'center', margin: 10}}>{oferta.subtitulo}</RubikText>

        { oferta.fotos && oferta.fotos.length > 0 &&
          <View style={{marginBottom: 50}}>
            <Swiper 
                style={{height: width}}
                dot={<View style={{backgroundColor:'#aaaaaa', width: 5, height: 5,borderRadius: 4, margin: 3,marginTop: 50, marginBottom: -70,  borderColor: '#aaaaaa', borderWidth:1}} />}
                activeDot={<View style={{backgroundColor:'#555555', width: 6, height: 6,borderRadius: 4, margin: 3,marginTop: 50, marginBottom: -70,  borderColor: '#555555', borderWidth:1}} />}
            >
              {oferta.fotos.map((foto, key) => {
                    return <View 
                    key={key}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <Image 
                        resizeMode="cover"
                        source={{ uri : "https:"+(foto.urlCloudinary || "//via.placeholder.com/500x500?Text=Oferta+Vestylle")}}
                        style={{ width:width, height: width, flex: 1 }}
                    />
                    </View>
              })}
            </Swiper>
          </View>
        }
        { (!oferta.fotos || oferta.fotos.length === 0) &&
            <Image 
                resizeMode="cover"
                source={{ uri : "https://via.placeholder.com/500x500?text=Oferta+Vestylle"}}
                style={{ height: 300, width:'100%',flex: 1 }}
            />
        }

        <View style={{
          backgroundColor: 'black',
          alignSelf: 'stretch',
          padding: 20,
          marginTop: 15
        }}>
          <RubikText style={{
            color: 'white',
            fontSize: 20
           }}>
            {oferta.texto_oferta}
          </RubikText>
          <RubikText style={{
            color: 'white',
            marginTop: 10
           }}>
            {oferta.descricao_oferta}
          </RubikText>

        </View>
        {oferta.codigo_promocional &&
          <View style={{
            backgroundColor: "#ebebeb",
            padding:10,
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
            <RubikText bold={true}>CÓDIGO DO PRODUTO:</RubikText>
            <RubikText style={{marginLeft: 5}}> {oferta.codigo_promocional}</RubikText>
          </View>
        }
      
        {cupom && cupom.id && (
          <Link
            to="Cupom"
            options={{id: cupom.id}}
            style={{
              backgroundColor: '#e20f17',
              padding: 8,
              marginTop:20,
              marginBottom:20,
              paddingRight: 30,
              paddingLeft: 30,
              alignSelf: 'center'
            }}
          >
            <RubikText bold={true} style={{color: 'white'}}>VER CUPOM DE DESCONTO</RubikText>
          </Link>
        )}

      </View>

      </>
    )
  }
}

export default class Oferta extends React.Component {

  state = {
    produtoId: null
  }

  componentDidMount() {
    const produtoId = this.props.navigation.getParam('id', null)
    this.setState({
      produtoId
    })
  }

  render() {
    return ( <ScrollView>
      <Breadcrumb>
        <Link to="Produtos">
          <RubikText bold={true} style={{color: '#585756'}}>Produtos</RubikText>
        </Link>
      </Breadcrumb>

      <View>
        <UserConsumer>
          {({userToken, getOfertaById}) => (
            <ProdutoDetalhado
              getOfertaById={getOfertaById}
              produtoId={this.state.produtoId}
              userToken={userToken}
            />
          )}
        </UserConsumer>
      </View>

      <BoasVindas/>

      <RodapeCompleto/>
    </ScrollView>
    )
  }
}