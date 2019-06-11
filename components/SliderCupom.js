import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Image, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import SideSwipe from 'react-native-sideswipe';
import { LojaConsumer } from '../LojaContext';

class CupomCard extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => console.log("clicou no"+this.props.id)}>
          <Image
            source={{ uri : "http:"+(this.props.foto_caminho || "//via.placeholder.com/500x500")}}
            resizeMode="cover"
            style={{ width: width*0.85, height: width*0.9 }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={this.style.btnAmareloCupom}
          onPress={() => console.log("clicou no btn")}>
          <RubikText bold={true}>ATIVAR CUPOM</RubikText>
        </TouchableHighlight>
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

  componentDidMount() {
    const intervalSlide = setInterval( this.avancaSlide , 5000);
    this.setState({
      cupons: this.props.cupons,
      intervalSlide
    })
    this.props.atualizaCupons()
    .then((cupons)=>{
      cupons = cupons.slice(0,10)
      this.setState({cupons})
    })
    this.StartImageRotateFunction();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
  } 

  avancaSlide = () => {
    let nextIndex = this.state.currentIndex+1;
    if(nextIndex >= this.state.cupons.length) nextIndex = 0;
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
      <View style={{backgroundColor: '#55bcba', height: width/2, marginTop: width/2.9, width: '100%'}}></View>
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={CupomCard.WIDTH}
        style={{ width , marginTop: -width/1.3}}
        data={this.state.cupons}
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
          <CupomCard
            {...item}
            index={itemIndex}
            currentIndex={currentIndex}
          />
          )
          }
        }
      >
      </SideSwipe>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: -5}}>
        {this.state.cupons.map((item, key)=> {
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
    </>
  }
}

class SliderCupom extends Component {

  render() {

    return ( <>
    <LojaConsumer>
        {({atualizaCupons, cupons}) => (
        <ListaCupons
          atualizaCupons={atualizaCupons}
          cupons={cupons}
        />
        )}
    </LojaConsumer>
    </>
    );
  }

  
}

export default SliderCupom;