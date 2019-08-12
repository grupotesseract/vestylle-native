import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import BoasVindas from './BoasVindas'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import { UserConsumer } from '../UserContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Produto from '../components/Produto';
import LaughingSmiling from '../ui/LaughingSmiling';

class ListagemDesejos extends React.Component {

  state = {
    listaDesejos: null,
    loading: false
  }

  componentDidMount() {
    if(this.props.atualizaListaDesejos) {
      this.props.atualizaListaDesejos()
      .then((listaDesejos) => {
      this.setState({listaDesejos})
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
      if(this.state.loading) {
        return <View style={{ alignItems: 'center', alignSelf: 'stretch', paddingBottom: 100}}>
            <FontAwesome name="spinner" style={{fontSize: 36}} />
          </View>
      }
      return !this.state.listaDesejos || this.state.listaDesejos.length < 1 ? (<>
        <View style={{alignItems: 'center'}}>
          <RubikText bold={true}>A Lista de Desejos facilita suas compras.</RubikText>
        </View>
        <View style={{flexDirection:'row', padding:15}}>
          <View style={{backgroundColor: 'white', flexShrink:0, padding: 10}}>
            <View
              style={{padding:15, borderWidth: 1, borderColor:'#bdbabc', borderRadius: 5, marginTop: 8}}
            >
              <Image 
                resizeMode="contain"
                source={require('../assets/sinoalerta.png')}
                style={{width: 32, height: 32}}
              />
            </View>
          </View>
          <View style={{flexShrink: 1}}>
            <RubikText bold={true} style={{fontSize: 14, marginBottom:2}}>ALERTA DE DESCONTO</RubikText>
            <RubikText bold={true} style={{fontSize: 12, justifyContent:'flex-start', textAlign: 'left'}}>Adicionando seus produtos favoritos, nós podemos te avisar se ele entrar em oferta. </RubikText>
            <RubikText style={{fontSize: 12,justifyContent:'flex-start'}}>Você pode desabilitar essa função em Area do Cliente > Meu Perfil</RubikText>
          </View>
        </View>
        <View style={{flexDirection:'row', marginBottom: 50, padding: 15}}>
          <View style={{backgroundColor: 'white', flexGrow:1, padding: 10}}>
            <View
              style={{padding:15, borderWidth: 1, borderColor:'#bdbabc', borderRadius: 5, marginTop: 8}}
            >
              <Image 
                resizeMode="contain"
                source={require('../assets/bag.png')}
                style={{width: 32, height: 32}}
              />
            </View>
          </View>
          <View style={{flexShrink: 1}}>
            <RubikText bold={true} style={{fontSize: 14, marginTop:8, marginBottom:5}}>COMPRAS PRÁTICAS</RubikText>
            <RubikText bold={true} style={{fontSize: 12,justifyContent:'flex-start', textAlign: 'left'}}>Na hora das compras em nossa loja, a lista te ajuda.</RubikText>
            <RubikText style={{fontSize: 12,justifyContent:'flex-start', textAlign: 'left'}}>É só mostrá-la para um de nossos atendentes que ele encontra para você.</RubikText>
          </View>
        </View>

        <RubikText
          bold={true}
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            fontSize: 18,
            marginBottom: -15,
            alignSelf: 'flex-start',
            backgroundColor: '#55bcba',
            zIndex:2
          }}
        >COMO FUNCIONA?</RubikText>
        <View style={{
          backgroundColor:'#1d1e1b',
          padding: 20,
          alignItems: 'flex-start',
          zIndex:1,
          flexDirection: 'row'
        }}>
          <RubikText style={{
            color: 'white', 
            textAlign:'left',
            paddingTop: 15,
            paddingRight:10,
            flexShrink: 1
            }}>
            No momento sua lista está vazia. 
            Para adicionar seus produtos favoritos aqui, 
            <RubikText bold={true}> basta clicar no ícone <FontAwesome name="heart"/> </RubikText> 
            no canto inferior do produto.</RubikText>
          <View
            style={{marginTop: -70, marginBottom: -50, marginRight: -10}}
          >
          <Image
            resizeMode="contain"
            source={require('../assets/minilike.png')}
            style={{
              width: 100
            }}/>
          </View>
        </View>
        <View style={{
          backgroundColor:'#585756', 
          padding: 20, 
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 50,
          boxShadow: '0 0 10px black'
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/like.png')}
            style={{
              maxWidth: 70,
              marginRight: 20
            }}/>
          <RubikText bold={true} style={{fontSize: 12, color: 'white'}}>Produto adicionado à lista.</RubikText>
        </View>
        <BoasVindas/>
      </> ):(<>
        {this.state.listaDesejos.map((desejo, key) => (
          <View key={key} style={{position: 'relative'}}>
            <View style={{
              position: 'absolute',
              height: '45%',
              width: '100%',
              backgroundColor: '#55bcba',
              top: '12%',
              zIndex:1
            }}></View>
            <View style={{
                alignSelf:'center',
                marginBottom: 100,
                zIndex:2
              }}>
              <Produto
                key={key}
                id={desejo.id}
                urlFoto={desejo.urlFoto}
                liked={true}
                titulo={desejo.titulo}
                subtitulo={desejo.subtitulo}
              />
            </View>
          </View>
        ))}      
      </>)
  }
}

export default class ListaDesejos extends React.Component {

  render() {
    return ( <ScrollView>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>
          Lista de desejos
        </RubikText>
      </Breadcrumb>

      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Seus produtos favoritos </LaughingSmiling>
          <LaughingSmiling>ficam salvos aqui</LaughingSmiling>
        </View>
      </View>
 

  
      <UserConsumer>
      {({ atualizaListaDesejos, listaDesejos, isAuth }) => (<>
          <ListagemDesejos
            atualizaListaDesejos={atualizaListaDesejos}
            listaDesejos={listaDesejos}
            isAuth={isAuth}
          />
      </>
      )}
      </UserConsumer> 
      <RodapeCompleto/>
    </ScrollView>
    )
  }
}