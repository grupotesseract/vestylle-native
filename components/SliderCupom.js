import React, { Component } from 'react';
import { View, Dimensions, Image, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import { LojaConsumer } from '../LojaContext';
import { UserConsumer } from '../UserContext';
import Link from '../ui/Link';
import Swiper from 'react-native-swiper';

class CupomCard extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <Link
          to="Cupom"
          options={{id: this.props.id}}
        >
          <Image
            source={{ uri : "https:"+(this.props.foto_caminho || "//via.placeholder.com/500x500?text=Cupom+Vestylle")}}
            resizeMode="cover"
            style={{ width: width*0.85, height: width*0.9 }}
          />
        </Link>
        <Link
          style={this.style.btnAmareloCupom}
          to="Cupom"
          options={{id: this.props.id}}
        >
          <RubikText bold={true}>ATIVAR CUPOM</RubikText>
        </Link>
      </View>
    )
  }

  style = {
    btnAmareloCupom: {
      backgroundColor: "#feca03",
      padding: 6,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: -50,
      marginBottom: 30
    }
  }

}

class ListaCupons extends React.Component {

  state = {
    cupons: null,
    currentIndex: 0
  }

  constructor() {
    super()
    this.RotateValueHolder = new Animated.Value(0);
  }

  static getDerivedStateFromProps(props, state) {

    if (!props.isLoadingUser && !state.cupons && !props.cupons) {
      const token = props.userToken
      props.atualizaCupons(token)
    }

    if(props.cupons !== state.cupons) {
      return {
        cupons: props.cupons
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.setState({
      cupons: this.props.cupons,
    })
    this.StartImageRotateFunction();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
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
    // center items on screen
    const { width } = Dimensions.get('window');
    if(this.state.cupons === null) {
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
    if(this.state.cupons.length === 0) {
      return <RubikText
        style={{
          color: 'white',
          alignSelf: 'center',
          marginTop: 80,
          zIndex: 2
        }}
        >Nenhum cupom encontrado.</RubikText>
    }
    return <>
      <View style={{backgroundColor: '#55bcba', height: width/2, marginTop: width/3, width: '100%', zIndex: 1}}></View>
      <View style={{height: width, marginTop: 30-width*(5/6), width: '100%', zIndex: 2}}>
      <Swiper 
        autoplay={true}
          style={{ height: '100%', zIndex:4}}
          dot={<View style={{backgroundColor:'#aaaaaa', width: 7, height: 7,borderRadius: 4, margin: 5,marginTop: 40, marginBottom: -20,  borderColor: '#aaaaaa', borderWidth:1}} />}
          activeDot={<View style={{backgroundColor:'#555555', width: 7, height: 7,borderRadius: 4, margin: 5,marginTop: 40, marginBottom: -20,  borderColor: '#555555', borderWidth:1}} />}
      >
      { this.state.cupons
        .map( (item,key) => 
        <CupomCard
          key={key}
          {...item}
        />
      )}
      </Swiper>
      </View>
    </>
  }
}

class SliderCupom extends Component {

  render() {

    return ( <>
      <UserConsumer>
        {({userToken, isLoadingUser}) => (
        <LojaConsumer>
          {({atualizaCupons, cupons}) => (
          <ListaCupons
            atualizaCupons={atualizaCupons}
            cupons={cupons && cupons.filter((item) => item.em_destaque === true)}
            userToken={userToken}
            isLoadingUser={isLoadingUser}
          />
          )}
        </LojaConsumer>
        )}
      </UserConsumer>
    </>
    );
  }

  
}

export default SliderCupom;