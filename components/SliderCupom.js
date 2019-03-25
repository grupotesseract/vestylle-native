import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import SideSwipe from 'react-native-sideswipe';

class CupomCard extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => console.log("clicou na img")}>
          <Image
            source={{uri: this.props.illustration}}
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

class SliderCupom extends Component {

  cupomData = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
      title: 'Earlier this morning, NYC',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
      title: 'White Pocket Sunset',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    }
  ];

  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    const intervalSlide = setInterval( this.avancaSlide , 5000);
    this.setState({ intervalSlide })
  } 

  componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
  } 

  avancaSlide = () => {
    let nextIndex = this.state.currentIndex+1;
    if(nextIndex >= this.cupomData.length) nextIndex = 0;
    this.setState(() => ({ currentIndex: nextIndex }))
  }
  render() {
    // center items on screen
    const { width } = Dimensions.get('window');

    return ( <React.Fragment>
      <View style={{backgroundColor: '#55bcba', height: width/2, marginTop: width/2.9, width: '100%'}}></View>
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={CupomCard.WIDTH}
        style={{ width , marginTop: -width/1.3}}
        data={this.cupomData}
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
        {this.cupomData.map((item, key)=> {
          return <TouchableHighlight
          style={{paddingRight: 4, paddingLeft: 4}}
          key={key}
          onPress={() => this.setState({ currentIndex: key })}>
            <MaterialCommunityIcons
              name={key == this.state.currentIndex ? "circle" : "circle-outline"}
              size={12}
            />
          </TouchableHighlight>
        })}
      </View>
      <View style={{alignItems: 'center', paddingTop: 4}}>
        <RubikText bold={true} style={{fontSize: 25}}>
        preparamos
        </RubikText>
        <RubikText bold={true} style={{fontSize: 26}}>
        benefícios exclusivos
        </RubikText>
        <RubikText bold={true} style={{fontSize: 25}}>
        para você
        </RubikText>
      </View>
      <View 
      style={{
        alignItems: 'center', 
        margin: 28, 
        paddingTop: 15,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: '#585756'
      }}>
        <RubikText bold={true} style={this.style.textoCinza}>Com os cupons promocionais</RubikText>
        <RubikText bold={true} style={this.style.textoCinza}>
        Vestylle Megastore Jaú, você tem
        </RubikText>
        <RubikText bold={true} style={this.style.textoCinza}>desconto o ano inteiro.</RubikText>
      </View>
    </React.Fragment>
    );
  }

  style = {
    textoCinza: {
      fontSize: 15,
      color: '#585756'
    }
  }
  
}

export default SliderCupom;