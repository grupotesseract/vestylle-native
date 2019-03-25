import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import SideSwipe from 'react-native-sideswipe';

class OfertaCard extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => console.log("clicou na img")}>
          <Image
            source={{uri: this.props.illustration}}
            resizeMode="cover"
            style={{ width: width*0.85, height: width*0.9, borderWidth: 1, borderColor: 'white', borderRadius: 8 }}
          />
        </TouchableHighlight>
        <View style={{ width: width*0.82, flexDirection: 'row', marginTop: 10 }}>
          <View style={{alignItems: 'flex-start', flexGrow: 1}}>
            <TouchableHighlight
              onPress={() => console.log("clicou no link")}>
              <RubikText bold={true} style={{color: '#585756', textDecorationLine: 'underline'}}>{this.props.title}</RubikText>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => console.log("clicou no valor")}>
              <RubikText style={{color: '#585756' }}>{this.BRL(this.props.valor)}</RubikText>
            </TouchableHighlight>
          </View>
          <View style={{flexGrow: 0, flexDirection:'row', alignItems: 'center'}}>
            <TouchableHighlight>
              <MaterialCommunityIcons name="share-variant" size={24} style={{color: '#585756' }}/>
            </TouchableHighlight>
            <TouchableHighlight>
              <MaterialCommunityIcons name="heart-outline" size={30} style={{color: '#585756' }}/>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  BRL = (valor) => {
    let formatted = valor.toFixed(2);

    return "R$ "+formatted.replace(/\./g, ',');
  }

  style = {
  }

}

class SliderOfertas extends Component {

  ofertasData = [
    {
      title: 'Conjunto tons pastéis',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
      valor: 290
    },
    {
      title: 'Conjunto tons empadas',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      valor: 420.398
    },
    {
      title: 'Conjunto tons coxinhas',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      valor: 920.5
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
    if(nextIndex >= this.ofertasData.length) nextIndex = 0;
    this.setState(() => ({ currentIndex: nextIndex }))
  }
  render() {
    // center items on screen
    const { width } = Dimensions.get('window');

    return ( <View style={{ alignItems: 'center'}}>
      <RubikText bold={true} style={{ fontSize: 16 }}>CONFIRA AS NOVIDADES</RubikText>
      <View style={{backgroundColor: '#55bcba', height: width/1.4, marginTop: 50, width: '100%'}}></View>
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={OfertaCard.WIDTH}
        style={{ width , marginTop: -width/1.2}}
        data={this.ofertasData}
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
          <OfertaCard
            {...item}
            index={itemIndex}
            currentIndex={currentIndex}
          />
          )
          }
        }
      >
      </SideSwipe>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
        {this.ofertasData.map((item, key)=> {
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
      <TouchableHighlight
        style={this.style.btnPreto}
        onPress={() => console.log("clicou no btn")}>
        <RubikText style={{color: 'white'}}>TODOS OS PRODUTOS</RubikText>
      </TouchableHighlight>
    </View>
    );
  }

  style = {
    textoCinza: {
      fontSize: 15,
      color: '#585756'
    },
    btnPreto: {
      backgroundColor: "black",
      padding: 12,
      paddingLeft: 40,
      paddingRight: 40,
      marginTop: 30,
      marginBottom: 40,
      borderRadius: 4
    }
  }
  
}

export default SliderOfertas;