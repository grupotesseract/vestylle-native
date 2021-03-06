import React from 'react';
import { View, Image, ScrollView, TouchableHighlight } from 'react-native';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Link from '../ui/Link';
import RodapeCompleto from '../components/RodapeCompleto';
import { UserConsumer } from '../UserContext';
import { NavigationEvents } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class ListaCupons extends React.Component {
    state = {
        cupons: [],
        cuponsSelecionados: 'ativos'
    }

    datetime2DDMMAAAA = (datetime) => {
        if(!datetime) return "";
        const date = datetime.split(" ")[0].split("-");
        const year = date[0]
        const month = date[1]
        const day = date[2]
        return day+"/"+month+"/"+year
    }

    componentDidMount() {
        if(this.props.atualizaCupons) {
            this.props.atualizaCupons()
        }
        if(this.props.atualizaCuponsUtilizados) {
            this.props.atualizaCuponsUtilizados()
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.cuponsSelecionados === 'ativos' &&
            props.cupons !== state.cupons) {
            return {
                cupons: props.cupons,
            };
        }

        if (state.cuponsSelecionados === 'utilizados' &&
            props.cuponsUtilizados !== state.cupons) {
            return {
                cupons: props.cuponsUtilizados,
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    render() {
        return <>
            <TouchableHighlight onPress={() => this.toggleCupom()}>
              <View style={{ flexDirection: 'row', marginTop: 15}}>
                <RubikText
                    style={ 
                      Object.assign({}, 
                        this.style.toggleBtn, 
                        this.style.toggleLeftBtn, 
                        this.state.cuponsSelecionados === 'ativos' ? 
                            this.style.toggleAtivo :
                            this.style.toggleInativo) 
                    }
                >
                    DISPONÍVEIS
                </RubikText>
                <RubikText
                    style={ 
                      Object.assign({}, 
                        this.style.toggleBtn, 
                        this.style.toggleRightBtn, 
                        this.state.cuponsSelecionados === 'utilizados' ? 
                            this.style.toggleAtivo :
                            this.style.toggleInativo) 
                    }
                >
                    ATIVADOS
                </RubikText>
              </View>
            </TouchableHighlight>
        {this.state.cupons && 
         this.state.cupons.map((cupom,key) => {
            const sourceImgCupom = "https:" + ( (cupom.fotos_listagem && cupom.fotos_listagem.length > 0) && cupom.fotos_listagem[0].urlCloudinary || ((cupom.oferta && cupom.oferta.urlFoto) && cupom.oferta.urlFoto));
            return <View 
            key={key}
            style={Object.assign({},{
                backgroundColor: 'white',
                borderRadius: 3,
                margin: 20,
                alignSelf: 'stretch',
                alignItems: 'stretch',
                padding: 10,
                position: 'relative'
            },(this.state.cuponsSelecionados === 'utilizados') ? {
                opacity: 0.7,
                filter: 'grayscale(100%)'
            }:{})}>

                {Number(cupom.porcentagem_off) > 0 &&
                <View style={{
                    position: 'absolute',
                    top: -25,
                    padding: 10,
                    paddingTop: 37,
                    left: 45, 
                    zIndex: 3
                }}>
                    <Image
                    source={require('../assets/bandeirola.png')}
                    resizeMode="contain"
                    style={{
                        position:'absolute', 
                        width: 63,
                        marginTop: -48
                    }}
                    />
                    <RubikText bold={true} 
                    style={{
                        fontSize:22,
                        color: 'white'
                    }}>{cupom.porcentagem_off}%</RubikText>
                    <RubikText bold={true} 
                    style={{
                        fontSize:20,
                        color: 'white',
                        flexDirection: 'column',
                        marginTop: -2
                    }}>OFF</RubikText>
                </View>
                }
            
                <View
                    style={{
                        margin: 20,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#868686',
                        borderStyle: 'solid',
                        height: 110,
                        justifyItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: sourceImgCupom}}
                        style={{
                            width:'100%',
                            position: 'absolute',
                            height: '100%'
                        }}
                    />
                </View>
                <View style={this.style.bordaCentro}>
                <RubikText bold={true}>
                    {cupom.titulo && cupom.titulo.toUpperCase()}
                </RubikText>
                </View>
                <View style={this.style.bordaCentro}>
                <RubikText>
                    {cupom.subtitulo}
                </RubikText>
                </View>
                <View style={{
                        marginRight: 30, 
                        marginLeft: 30, 
                        padding: 5, 
                        alignItems: 'center', 
                        textAlign: 'center',
                        justifyContent: 'center'
                    }}>
                    <RubikText>
                        Válido até {this.datetime2DDMMAAAA(cupom.data_validade)}
                    </RubikText>
                </View>
                <Link
                    to="Cupom"
                    options={{id:cupom.id}}
                    style={{
                        backgroundColor: '#e20f17',
                        padding: 5,
                        marginTop: 10,
                        paddingRight: 30,
                        paddingLeft: 30,
                        borderRadius: 5,
                        alignSelf: 'center'
                    }}
                >
                    <RubikText style={{
                        color: 'white'
                    }}>ENTRAR</RubikText>
                </Link>
            </View>
        })}
        </>
    }

  toggleCupom = () => {
    let cuponsSelecionados = this.state.cuponsSelecionados
    if(this.props.atualizaCupons) {
        this.props.atualizaCupons()
    }
    if(this.props.atualizaCuponsUtilizados) {
        this.props.atualizaCuponsUtilizados()
    }
    if(cuponsSelecionados === 'utilizados') {
        cuponsSelecionados = 'ativos'
        this.setState({cuponsSelecionados})
        return
    }
    cuponsSelecionados = 'utilizados'
    this.setState({cuponsSelecionados})
  }

    style = {
        bordaCentro : {
            borderBottomWidth: 1, 
            borderStyle: 'solid',
            borderColor: '#868686',
            alignItems: 'center', 
            textAlign: 'center',
            justifyContent: 'center',
            padding: 5,
            marginRight: 30,
            marginLeft: 30,
        },
      toggleBtn: {
        borderWidth: 0,
        borderStyle: 'solid',
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
      },
      toggleLeftBtn: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
      },
      toggleRightBtn: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        paddingRight: 10,
        paddingLeft: 10,
      },
      toggleAtivo: {
          borderWidth: 1,
          borderColor: '#feca03',
          backgroundColor: '#feca03',
          color: 'black'
      },
      toggleInativo: {
          borderWidth: 1,
          borderColor: '#bdbabc',
          backgroundColor: 'transparent',
          color: '#bdbabc'
      },
  }
}

class MeusCupons extends React.Component {

  state = {
    cupons: 'ativos',
    cuponsAtivos: [],
    cuponsUtilizados: []
  }

  render() {
    return (<> 
        <UserConsumer>
        {({perfil}) => 
        <NavigationEvents
          onWillFocus={payload => {
            if(!perfil) {
              this.props.navigation.navigate("Cadastro")
            }
          }}
        />
        }
        </UserConsumer>
        <Link 
            to="AdicionarCupom"
            style={{
                width:65, 
                backgroundColor:'#feca03', 
                borderTopLeftRadius: 5, 
                borderBottomLeftRadius: 5, 
                flexDirection: 'column', 
                padding: 10,
                position: 'absolute',
                right:0,
                top: 65,
                zIndex:2,
            }}>
            <Image
                source={require('../assets/qrcode.png')}
                style={{ height: 36, width:36, flexGrow: 0 }}
            />
            <RubikText style={{fontSize: 10}}>Adicionar cupom</RubikText>
        </Link>
    <ScrollView>

      <View style={{backgroundColor: "#585756", position: 'relative'}}>

        <Breadcrumb>
            <Link to="AreaCliente">
                <RubikText style={{color: 'white'}}>Área do cliente &gt;&nbsp;</RubikText>
            </Link>
            <RubikText bold={true} style={{color: 'white'}}>Meus cupons</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center', position: 'relative'}}>
            <UserConsumer>
            {({cupons, cuponsUtilizados, atualizaCupons, atualizaCuponsUtilizados }) => {
                if(cupons) {
                    cupons = cupons.filter(cupom => cuponsUtilizados.findIndex(cupomU => Number(cupomU.id) === Number(cupom.id)) < 0)
                }
                return (
                <ListaCupons
                cupons={cupons}
                cuponsUtilizados={cuponsUtilizados}
                atualizaCupons={atualizaCupons}
                atualizaCuponsUtilizados={atualizaCuponsUtilizados}
                />
            )}}
            </UserConsumer>

            <Link 
            to="AdicionarCupom"
            style={{
                backgroundColor: "#feca03",
                margin: 30,
                padding: 30,
                flexDirection: 'row'
            }}>
                <Image
                source={require('../assets/barscan.png')}
                alt="Escanear Cupom"
                className="sm-hide"
                style={{
                    marginLeft: 10,
                    marginRight: 30
                }}
                />
                <View style={{justifyContent: 'center'}}>
                    <RubikText bold={true}>
                        ADICIONAR CUPOM
                    </RubikText>
                    <RubikText style={{textAlign: 'left'}}>
                        Insira seu código promocional ou faça a leitura do QR Code e ganhe descontos especiais em suas compras
                    </RubikText>
                </View>
            </Link>

        </View>
      </View>
        <RubikText
            bold={true} 
            style={{
            backgroundColor: '#55bcba',
            padding: 10,
            paddingRight: 20,
            marginTop: 20,
            marginBottom: -2,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 10,
            paddingLeft: 35,
            alignSelf: 'flex-start'
            }}
        >
            COMO UTILIZO O MEU CUPOM?
        </RubikText>
        <View style={{flexDirection: 'row', alignSelf: 'stretch', backgroundColor: 'black', marginBottom: 50}}>
            <View>
                <RubikText style={{ color: 'white',padding: 20, textAlign: 'left'}}>
                    Para utilizar seu cupom basta <RubikText bold={true} style={{color: "#feca03"}}>ativar e mostrar a tela do seu celular</RubikText> para um(a) atendente da loja Vestylle Megastore Jaú
                </RubikText>
            </View>
            <Image
            source={require('../assets/maobar.png')}
            alt="Escanear Cupom"
            className="sm-hide"
            style={{
                marginTop: -12,
                marginBottom: -12,
                zIndex: 2,
                alignSelf:'center',
                width: 500
            }}
            />
        </View>
      <RodapeCompleto/>
    </ScrollView>
    </>
    )
  }


}

export default withNavigation(MeusCupons)