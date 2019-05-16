import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import SideSwipe from 'react-native-sideswipe';
import { LojaConsumer } from '../LojaContext';

class OfertaCard extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => console.log("clicou na img")}>
          <Image
            source={{ uri : "http:"+(this.props.urlFoto || "//via.placeholder.com/500x500")}}
            resizeMode="cover"
            style={{ width: width*0.85, height: width*0.9, borderWidth: 1, borderColor: 'white', borderRadius: 8 }}
          />
        </TouchableHighlight>
        <View style={{ width: width*0.82, flexDirection: 'row', marginTop: 10 }}>
          <View style={{alignItems: 'flex-start', flexGrow: 2, flexShrink:2}}>
            <TouchableHighlight
              onPress={() => console.log("clicou no link")}>
              <RubikText bold={true} style={{color: '#585756', textDecorationLine: 'underline'}}>{this.props.titulo}</RubikText>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => console.log("clicou no valor")}>
              <RubikText style={{color: '#585756' }}>{this.props.subtitulo}</RubikText>
            </TouchableHighlight>
          </View>
          <View style={{flexGrow: 1, flexShrink:1, flexDirection:'row', alignItems: 'center'}}>
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

}

class ListaOfertas extends React.Component {

  state = {
    ofertas: null,
    currentIndex: 0,
    error: null
  }

  atualizaOfertas(props) {
    const listaDesejosIds = props.listaDesejos ? props.listaDesejos.map((produto)=> produto.id) : []
    this.props.getOfertasComLike(listaDesejosIds)
    .then((ofertas)=>{
      ofertas = ofertas.slice(0,10)
      this.setState({ofertas})
    })
    .catch((e) => {
      const error = "Erro ao carregar ofertas."
      this.setState({error})
    })
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
    this.atualizaOfertas(this.props)
  }
  
  componentWillReceiveProps(props) {
    this.atualizaOfertas(props)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
  } 

  avancaSlide = () => {
    let nextIndex = this.state.currentIndex+1;
    if(nextIndex >= this.state.ofertas.length) nextIndex = 0;
    this.setState(() => ({ currentIndex: nextIndex }))
  }

  render() {
    if(this.state.ofertas === null) {
      return <></>
      /*
      <FaSpinner
        style={{
          fontSize: 72,
          color: 'white',
          alignSelf: 'center',
          marginTop: 60
        }}
        className='spin'
      />*/
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
        itemWidth={OfertaCard.WIDTH}
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
    return <LojaConsumer>
        {({getOfertasComLike, ofertas}) => (
        <ListaOfertas
          getOfertasComLike={getOfertasComLike}
          ofertas={ofertas}
        />
        )}
    </LojaConsumer>
  }
  
}

export default SliderOfertas;