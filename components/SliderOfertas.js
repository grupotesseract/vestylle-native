import React, { Component } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import { LojaConsumer } from '../LojaContext';
import { UserConsumer } from '../UserContext';
import Produto from './Produto';
import Swiper from 'react-native-swiper';

class ListaOfertas extends React.Component {

  state = {
    ofertas: null,
    currentIndex: 0,
    error: null,
    listaDesejosIds: []
  }

  constructor() {
    super()
    this.RotateValueHolder = new Animated.Value(0);
  }

  static getDerivedStateFromProps(props, state) {

    if ((props.listaDesejos !== state.listaDesejosIds) || (!props.isLoadingUser && !state.ofertas && !props.ofertas)) {

      const listaDesejosIds = props.listaDesejos ? props.listaDesejos.map((produto)=> produto.id) : []
      props.getOfertasComLike(listaDesejosIds, props.userToken)
      .then(ofertas => {
      console.log("ofertas",ofertas)
        return {
          ofertas: ofertas,
          listaDesejosIds: props.listaDesejosIds
        }
      })
    }

    if(props.ofertas !== state.ofertas) {
      return {
        ofertas: props.ofertas
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    if(!this.props.ofertas) {
      return
    }
    this.setState({
      ofertas: this.props.ofertas.slice(0,10)
    })
    this.StartImageRotateFunction();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
    Animated.timing(this.RotateValueHolder).stop();    
  } 

  avancaSlide = () => {
    let nextIndex = this.state.currentIndex+1;
    if(nextIndex >= this.state.ofertas.length) nextIndex = 0;
    this.setState(() => ({ currentIndex: nextIndex }))
  }
  
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }


  render() {
    if(this.state.ofertas === null) {
      const RotationDeg = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
      return <Animated.View style={{
        width: '100%',
        height: 200,
        transform: [{rotate: RotationDeg}]
      }}>
          <FontAwesome
            name="spinner"
            size={72}
            style={{
              fontSize: 72,
              color: 'black',
              alignSelf: 'center',
              marginTop: 60
            }}
          />
      </Animated.View>
    }

    if(this.state.ofertas.length === 0) {
      return <RubikText
        style={{
          color: 'white',
          alignSelf: 'center',
          marginTop: 80,
          zIndex: 2
        }}
        >Nenhuma oferta encontrada.</RubikText>
    }
    // center items on screen
    const { width } = Dimensions.get('window');

    return ( <View style={{ alignItems: 'center'}}>
      <RubikText bold={true} style={{ fontSize: 16 }}>CONFIRA AS NOVIDADES</RubikText>
      <View style={{backgroundColor: '#55bcba', height: width/1.4, marginTop: 50, width: '100%'}}></View>
      <View style={{height: width+100, marginTop: -width*(5/6), width: '100%', zIndex: 2}}>
        <Swiper 
          autoplay={true}
          style={{ height: '100%', zIndex:4}}
          dot={<View style={{backgroundColor:'#aaaaaa', width: 7, height: 7,borderRadius: 4, margin: 5,marginTop: 30, marginBottom: -10,  borderColor: '#aaaaaa', borderWidth:1, zIndex:10}} />}
          activeDot={<View style={{backgroundColor:'#555555', width: 7, height: 7,borderRadius: 4, margin: 5,marginTop: 30, marginBottom: -10,  borderColor: '#555555', borderWidth:1, zIndex:10}} />}
        >
        { this.state.ofertas.map( (item,key) => 
          <Produto
            key={key}
            {...item}
          />
        )}
        </Swiper>
      </View>
    </View>
    );
  }
}

class SliderOfertas extends Component {

  render() {
    return <View style={{marginTop:20}}>
      <UserConsumer>
        {( {listaDesejos, userToken, isLoadingUser} ) => (
      <LojaConsumer>
        {({getOfertasComLike, ofertas}) => (
        <ListaOfertas
          getOfertasComLike={getOfertasComLike}
          ofertas={ofertas}
          listaDesejos={listaDesejos}
          userToken={userToken}
          isLoadingUser={isLoadingUser}
          navigation={this.props.navigation}
        />
        )}
      </LojaConsumer>
        )}
      </UserConsumer>
    </View>
  }
  
}

export default SliderOfertas;