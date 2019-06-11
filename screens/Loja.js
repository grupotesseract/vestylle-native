import React from 'react';
import { View, ScrollView, Dimensions, Image, TouchableHighlight, Linking} from 'react-native';
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import { LojaConsumer } from '../LojaContext';
import SideSwipe from 'react-native-sideswipe';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LaughingSmiling from '../ui/LaughingSmiling';

class InfosLoja extends React.Component {

  state = {
    dadosLoja: null,
    currentIndex: 0,
    loading: false
  }

  componentDidMount() {
    const intervalSlide = setInterval( this.avancaSlide , 5000);
    this.setState({ intervalSlide })
    if(this.props.atualizaDadosLoja) {
      this.props.atualizaDadosLoja()
      .then((dadosLoja) => {
        this.setState({dadosLoja})
      })
    }    
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dadosLoja !== state.dadosLoja) {
      return {
        dadosLoja: props.dadosLoja
      };
    }

    return null;
  }


 componentWillUnmount() {
    clearInterval(this.state.intervalSlide);
  } 

  avancaSlide = () => {
    let nextIndex = this.state.currentIndex+1;
    if(nextIndex >= this.state.dadosLoja.fotos.length) nextIndex = 0;
    this.setState(() => ({ currentIndex: nextIndex }))
  }
  
  render() {

    const { width } = Dimensions.get('window');
    if(!this.state.dadosLoja) {
      return <></>
    }

    const dados = this.state.dadosLoja

      return <View style={{ alignItems: 'center'}}>
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={width}
        style={{ width }}
        data={dados.fotos}
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
          <View style={{width, alignItems: 'center'}}
          >
            <Image 
              source={{uri: "http:"+item.urlCloudinary}}
              resizeMode="cover"
              style={{ width: '94%', height: width*0.66}}
              />
          </View>
          )
          }
        }
      >
      </SideSwipe>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5, marginBottom: 20}}>
        {dados.fotos.map((item, key)=> {
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
      <View style={{padding: 20, backgroundColor: '#ebebeb'}}>
        <RubikText bold={true} style={{fontSize:20}}>COMO CHEGAR</RubikText>
        <RubikText style={{fontSize: 16}}>
          <MaterialCommunityIcons
            name="map-marker"
            size={14}
          />
          Rua Edgard Ferraz 281, Jaú - SP | 17201-440
        </RubikText>

        <TouchableHighlight onPress={() => Linking.openURL("http://maps.apple.com/?ll=-22.2955408,-48.5574577,17")}>
        <Image 
          source={require('../assets/minimap.png')}
          resizeMode="contain"
          style={{ width: width*0.9, height: width*0.9}}
        />
        </TouchableHighlight>
      </View>

    </View>
  }
}

export default class Loja extends React.Component {

  render() {
    return ( <ScrollView>
      <View style={{backgroundColor: 'white'}}>
        <Breadcrumb>
          <RubikText bold={true} style={{color: 'black'}}>Loja</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', padding: 20}}>
            <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
            <LaughingSmiling>das melhores marcas!</LaughingSmiling>
          </View>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <RubikText bold={true} style={{color: 'black', fontSize:14}}>Somos uma loja multimarcas de moda</RubikText>
          <RubikText bold={true} style={{color: 'black', fontSize:14}}>jovem, casual, acessórios e calçados</RubikText>
        </View>

        <LojaConsumer>
        {({ atualizaDadosLoja, dadosLoja }) => (<>
            <InfosLoja
              atualizaDadosLoja = {atualizaDadosLoja}
              dadosLoja = {dadosLoja}
            />
        </>
        )}
        </LojaConsumer>
      </View> 
      <RodapeCompleto/>
    </ScrollView>
    )
  }
}