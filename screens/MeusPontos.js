import React from 'react';
import { View, ScrollView } from 'react-native';
import RodapeCompleto from '../components/RodapeCompleto'
import RubikText from '../ui/RubikText';
import Link from '../ui/Link'
import Breadcrumb from '../ui/Breadcrumb';
import ProgressCircle from 'react-native-progress-circle'

export default class MeusPontos extends React.Component {

  state = {
    qtdPontos: 0
  }

  componentDidMount() {
    var interval = setInterval(this.crescePonto, 10);
    this.setState({interval})
  }
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
  
  crescePonto = () => {
    const aumenta = this.state.qtdPontos > 100 ? 10 : 1
    this.setState({qtdPontos: this.state.qtdPontos+aumenta})
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
                  <RubikText style={this.style.fonteDestaque}>Você ainda não possui nenhum cupom promocional.</RubikText>
                  <RubikText style={{color: 'white'}}>Junte mais { 1000 - this.state.qtdPontos } pontos para garantir seu cupom</RubikText>
                </>)}
                { this.state.qtdPontos >= 1000 && (<>
                  <RubikText style={{color: 'white'}} bold={true}>Parabéns Ciclana,</RubikText>
                  <RubikText style={{color: 'white'}} bold={true}>você completou 1000 pontos.</RubikText>
                  <RubikText style={this.style.fonteDestaque}>E ganhou um cupom de R$60,00</RubikText>
                  <RubikText style={{color: 'white'}}>para gastar como quiser.</RubikText>
                  <RubikText style={{color: 'white'}}>Junte mais {1000 - this.state.qtdPontos%1000 } pontos para ganhar outro cupom</RubikText>
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