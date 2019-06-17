import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import RodapeCompleto from '../components/RodapeCompleto'
import RubikText from '../ui/RubikText';
import Link from '../ui/Link'
import Breadcrumb from '../ui/Breadcrumb';
import ProgressCircle from 'react-native-progress-circle'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class MeusPontos extends React.Component {

  state = {
    qtdPontos: 1000
  }

  componentDidMount() {
  }
 
  render() {
    return (
      <View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <View style={{ backgroundColor: '#1d1e1b'}}>
            <Breadcrumb>
              <Link to="/meuspontos"><RubikText style={{color:'white'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
              <RubikText bold={true} style={{color:'white'}}>Meus pontos</RubikText>
            </Breadcrumb>

            <View style={{ padding: 20, alignItems: 'center' }}>
              <RubikText style={{color: 'white', fontSize: 20}}>Suas compras</RubikText>
              <RubikText style={{color: 'white', fontSize: 20, marginBottom: 20}}>acumulam pontos</RubikText>
            
              <ProgressCircle
                percent={this.state.qtdPontos/10}
                radius={50}
                borderWidth={8}
                color="#55bcba"
                shadowColor="#585756"
                bgColor="#1d1e1b"
              >
                <RubikText style={{ fontSize: 18, color: 'white' }}>{this.state.qtdPontos}</RubikText>
              </ProgressCircle>

              <View style={{alignItems: 'flex-start', marginTop: 20}}>
                { this.state.qtdPontos === 0 && (<>
                  <RubikText style={this.style.fonteDestaque}>Você ainda não possui pontos.</RubikText>
                  <RubikText style={{color: 'white'}}>Para começar a acumular pontos, utilize seu CPF nas próximas compras na loja Vestylle Megastore Jaú. Seus pontos aparecerão aqui.</RubikText>
                </>)}
                { this.state.qtdPontos > 0 && this.state.qtdPontos < 1000 && (<>
                  <RubikText style={{color: 'white'}} bold={true}>Ciclana,</RubikText>
                  <RubikText style={this.style.fonteDestaque}>Você ainda não possui nenhum bônus promocional.</RubikText>
                  <RubikText style={{color: 'white'}}>Junte mais { 1000 - this.state.qtdPontos } pontos para garantir seu bônus</RubikText>
                </>)}
                { this.state.qtdPontos >= 1000 && (<>
                  <RubikText style={{color: 'white'}} bold={true}>Parabéns Ciclana,</RubikText>
                  <RubikText style={{color: 'white'}} bold={true}>você completou 1000 pontos.</RubikText>
                  <RubikText style={this.style.fonteDestaque}>E ganhou um bônus de R$60,00</RubikText>
                  <RubikText style={{color: 'white'}}>para gastar como quiser.</RubikText>
                  <View style={{flexDirection: 'row', alignSelf: 'center', margin: 10}}>
                    <View style={{backgroundColor: "#55bcba", width: 40}}>
                      <RubikText bold={true} style={{width:100 ,fontSize: 10, color: "white", transform: [{rotate:'-90deg'},{translateY:-29},{translateX:-14}]}}>MIL PONTOS</RubikText>
                    </View>
                    <View style={{backgroundColor: "white", padding: 5}}>
                      <RubikText bold ={true} style={{fontSize: 36 ,borderWidth: 1, borderColor:"#55bcba" ,padding: 10, paddingTop: 15}}>R$ 60,00</RubikText>
                    </View>
                  </View>

                  <RubikText style={{color: 'white'}}>Junte mais {1000 - this.state.qtdPontos%1000 } pontos para ganhar outro bônus</RubikText>
                </>)}
              </View>
            </View>
          </View>
          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <RubikText 
              style={{ 
                backgroundColor: '#bdbabc', 
                padding: 4,
                paddingRight: 10, 
                paddingLeft: 20, 
                marginBottom: 5,
                alignSelf: 'flex-start',
              }} 
              bold={true}>
            Como resgatar seus pontos?
            </RubikText>
            <RubikText style={{paddingLeft: 20}}>Para utilizar seus pontos, informe seu</RubikText>
            <RubikText style={{paddingLeft: 20}}>CPF na próxima compra.</RubikText>
          </View>
          <View style={{alignItems: 'center'}}>
            <RubikText 
              bold={true} 
              style={{
                backgroundColor:"#feca03",
                fontSize: 16,
                padding: 5,
                paddingLeft: 30,
                paddingRight: 30,
                zIndex: 2
              }}>
              COMO FUNCIONA?
            </RubikText>
            <View style={{zIndex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: -10, backgroundColor: "#585756"}}>
              <RubikText bold={true} style={{padding: 20, paddingTop: 30, fontSize: 26, color: 'white'}}>R$1,00 = 1 ponto</RubikText>
            </View>
            <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#585756"}}>
              <View style={{flexDirection:"row", paddingTop: 20}}>
                <Image
                  source={require('../assets/bags.png')}
                  resizeMode="contain"
                  style={{ height: 75, width:75,  marginRight: -5, marginBottom: 20 }}
                />
                <View style={{flexDirection:"column"}}>
                  <View>
                    <RubikText style={{fontSize: 20, color:'white'}}>A cada</RubikText>
                  </View>
                  <View style={{flexDirection:"row", paddingLeft: 10}}>
                    <RubikText bold={true} style={{fontSize: 30, color: 'white', marginTop: -5}}>1000</RubikText>
                    <RubikText style={{fontSize: 24, color: 'white'}}>PONTOS</RubikText>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#585756"}}>
              <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <RubikText style={{color: 'white', fontSize: 16}}>VOCÊ GANHA</RubikText>
                  <RubikText style={{color: 'white', fontSize: 16}}>1 BÔNUS no valor</RubikText>
                  <View style={{flexDirection: 'row'}}>
                    <RubikText style={{color: 'white', fontSize: 16}}>de </RubikText>
                    <RubikText bold={true} style={{color: 'white', fontSize: 16}}>R$60,00</RubikText>
                  </View>
                </View>
                <View style={{paddingLeft: 10}}>
                  <FontAwesome
                    name="star"
                    size={60}
                    color="#feca03"
                  />
                </View>
              </View>
            </View>
          </View>
          <RodapeCompleto/>
        </ScrollView>
       </View>
    );
  }

  style = {
    fonteDestaque: {
      fontFamily: 'RubikBold',
      color: '#58bcba'
    }
  }

}