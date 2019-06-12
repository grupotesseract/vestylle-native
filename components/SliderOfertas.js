import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import SideSwipe from 'react-native-sideswipe';
import { LojaConsumer } from '../LojaContext';
import { UserConsumer } from '../UserContext';
import Produto from './Produto';

class ListaOfertas extends React.Component {

  state = {
    ofertas: null,
    currentIndex: 0,
    error: null
  }

  constructor() {
    super()
    this.RotateValueHolder = new Animated.Value(0);
  }

  static getDerivedStateFromProps(props, state) {

    if (!props.isLoadingUser && !state.ofertas && !props.ofertas) {
      const listaDesejosIds = props.listaDesejos ? props.listaDesejos.map((produto)=> produto.id) : []
      props.getOfertasComLike(listaDesejosIds, props.userToken)
      .then(ofertas => {
      console.log("ofertas",ofertas)
        return {
          ofertas: ofertas
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
    const intervalSlide = setInterval( this.avancaSlide , 5000);
    this.setState({ intervalSlide })
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
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={Produto.WIDTH}
        style={{ width , marginTop: -width/1.2}}
        data={this.state.ofertas}
        contentOffset={0}
        useVelocityForIndex={false}
        onIndexChange={index => {
          this.setState(() => ({ currentIndex: index }))
          clearInterval(this.state.intervalSlide);
          this.setState({ intervalSlide: setInterval( this.avancaSlide , 5000) })
          }
        }
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
          return (
          <Produto
            {...item}
            index={itemIndex}
            currentIndex={currentIndex}
            navigation={this.props.navigation}
          />
          )
          }
        }
      >
      </SideSwipe>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
        {this.state.ofertas.map((item, key)=> {
          return <TouchableHighlight
          style={{paddingRight: 2, paddingLeft: 2}}
          key={key}
          onPress={() => this.setState({ currentIndex: key })}>
            <MaterialCommunityIcons
              name={key == this.state.currentIndex ? "circle" : "circle-outline"}
              size={12}
            />
          </TouchableHighlight>
        })}
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