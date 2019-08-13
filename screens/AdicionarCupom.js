import React from 'react';
import { ScrollView, View, Image, TextInput, TouchableHighlight, Dimensions } from 'react-native';
import RubikText from '../ui/RubikText';
import Link from '../ui/Link'
import Breadcrumb from '../ui/Breadcrumb';
import Alert from '../ui/Alert';
import RodapeCompleto from '../components/RodapeCompleto';
import { FontAwesome } from '@expo/vector-icons'
import { UserConsumer } from '../UserContext';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { withNavigation } from 'react-navigation';
import * as Permissions from 'expo-permissions';

class InputCupomQR extends React.Component {

  state = {
    alertMessage: null,
    cupom: '',
    status: 'display',
    loadingCupom: false,
    redirectTo: null,
    hasCameraPermission: null,
    scanned: false,
    ativaBuscaCupom: null
  }


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    console.log("status :", status)
  }

  handleScan = ({ type, data}) => {
    let cupomValue = data
    if (cupomValue) {
      cupomValue = this.removeURI(cupomValue)
      this.setState({
        scanned: true,
        cupom: cupomValue,
        status: 'display'
      })
      this.findCupom(cupomValue)
    }
  }

  changeStatus = (status) => {
    console.log("status chegned:", status)
    const scanned = status === 'display'
    this.setState({
      status,
      scanned
    })
  }

  componentDidUpdate() {
    const codigoCupom = this.props.codigoCupom
    if(codigoCupom && !this.state.cupom)
    if(codigoCupom){
      this.setState({ cupom: codigoCupom })
      this.findCupom(codigoCupom)
    }
  }

  handleChangeCumpom = (e) => {
    let cupomValue = this.removeURI(e)
    this.setState({cupom: cupomValue})
    clearTimeout(this.state.ativaBuscaCupom)
    this.setState({
      ativaBuscaCupom: setTimeout(()=>{
        this.findCupom(cupomValue)
      } ,1500)
    })
  }

  removeURI(cupomValue) {
    const valoresQR = cupomValue && cupomValue.split('/')
    console.log(valoresQR)
    if(valoresQR && valoresQR.length > 1){
      return valoresQR[valoresQR.length-1]
    }
    return cupomValue
  }

  findCupom = async (cupomValue) => {
    if(cupomValue && cupomValue.length > 3) {
      if(!this.state.loadingCupom) {
        this.setState({ loadingCupom: true })
        console.log(cupomValue)

        this.props.buscaCupom(cupomValue)
        .then(cupom => {
          console.log(cupom)
          if(cupom && cupom.id) {
            this.props.navigation.navigate("Cupom", {id: cupom.id})
          }
        })
        .catch((e) => {
          this.setState({
            alertMessage: e,
            loadingCupom: false
          })
        })
      }
    }
  }

  handleError = err => {
    console.error(err) 
    this.setState({
        status: 'display'
      })
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return <>

      {this.state.status === 'read' && (
        <View style={{zIndex:9, position: 'absolute', backgroundColor: 'black', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start', height: height}}>
          <BarCodeScanner
            onBarCodeScanned={this.state.scanned ? undefined : this.handleScan}
            style={{position: 'absolute', alignSelf: 'flex-start', top: 0, left: 0, right: 0, bottom: 0}}
          />
          <TouchableHighlight 
            onPress={() => this.changeStatus('display')}
            style={{ zIndex: 10, alignSelf: 'flex-start', position: 'absolute', top: 0, left: 10, padding: 10}}
          >
            <FontAwesome
              name="arrow-left"
              size={36}
              color='white'
              />
          </TouchableHighlight>
        </View>
      )}

      <TouchableHighlight
        style={{
          backgroundColor: '#feca03',
          padding: 10,
          alignSelf:'center',
          borderRadius: 5,
          paddingRight: 20,
          paddingLeft: 20,
          marginBottom: 30,
        }}
        onPress={() => this.changeStatus('read')}
      >
        <View style={{flexDirection: 'row'}}>
        <FontAwesome 
          name="camera" 
          color="black" 
          size={20} 
          style={{marginRight: 0, paddingRight: 10}}
        />
        <RubikText style={{fontSize: 20}}>
          LER QR CODE
        </RubikText>
        </View>
      </TouchableHighlight>

      <RubikText
        bold={true} 
        style={{
          backgroundColor: '#55bcba',
          padding: 10,
          marginBottom: 10,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: 'left',
          alignSelf: 'flex-start'
        }}
      >
        Insira seu código no campo abaixo
      </RubikText>

      <TextInput
        type="text"
        style={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 7,
          borderColor: '#bdbabc',
          backgroundColor: '#ebeaeb',
          alignSelf: 'center',
          padding: 10,
          fontSize: 20,
          marginTop: 10,
          marginBottom: 30,
          textAlign: 'center',
          width:200
        }}
        value={this.state.cupom}
        onChangeText={(e) => this.handleChangeCumpom(e)}
      />
      { this.state.loadingCupom && (
          <View style={{ alignItems: 'center', alignSelf: 'stretch', paddingBottom: 10}}>
            <FontAwesome name="spinner" color="black" style={{fontSize: 36}} />
          </View>
      )}
      { this.state.alertMessage && (
        <Alert
          title = "Adicionando Cupom"
          message = {this.state.alertMessage}
          btnText = "OK"
          onClickButton = {this.dismissAlertErro}
          dismissAlert = {this.dismissAlertErro}
        />
      )}
    </>
  }

  dismissAlertErro = () => {
    this.setState({
      alertMessage: false
    })
  }
}

class AdicionarCupom extends React.Component {

  state = {
    codigoCupom: null
  }

  render() {
    return ( <ScrollView>

      <Breadcrumb>
        <Link to="AreaCliente"><RubikText style={{color: '#585756'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
        <Link to="MeusCupons">
          <RubikText style={{color: '#585756'}}>Meus Cupons &gt;&nbsp;</RubikText>
        </Link>
        <RubikText bold={true} style={{color: '#585756'}}>Novo</RubikText>
      </Breadcrumb>

      <View style={{flexDirection: 'row'}}>
        <View style={{ display: 'flex', flexShrink:1, marginTop: 20, marginBottom: 10}}>
          <RubikText
            bold={true}
            style={{
              backgroundColor: '#55bcba',
              padding: 10,
              marginBottom: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              paddingLeft: 20,
              textAlign:'left',
              fontSize: 14
            }}
          >
            Ler o QR Code impresso na etiqueta
          </RubikText>
          <RubikText style={{paddingLeft: 20, textAlign: 'left', fontSize: 14, paddingRight: 25}}>
            Utilize a câmera do seu celular para ler o QRCode impresso na etiqueta do produto com desconto.
          </RubikText>
        </View>
        <View style={{ display: 'flex', flexShrink:0, marginTop: 20 }}>
          <Image
            resizeMode="contain"
            source={require('../assets/qrtag.png')}
            style={{ marginTop:7,marginLeft: -40, width: 80}}
          />
        </View>
      </View>

      <View style={{ backgroundColor: 'black', paddingLeft: 20, marginBottom: 30, marginTop: 40, flexDirection: 'row'}}>
        <View style={{ display: 'flex', flexShrink: 1 }}>
          <RubikText style={{fontSize: 12,color: 'white', textAlign: 'left', paddingBottom: 14, paddingTop: 15}}>
            Clique no botão abaixo e aponte a câmera do seu celular para o QR Code.
            Aguarde alguns instantes até que ele seja escaneado.
          </RubikText>
        </View>
        <View style={{ display: 'flex', flexShrink: 0 }}>
        <Image
          source={require('../assets/maoqr.png')}
          resizeMode="contain"
          style={{marginTop: -59, marginBottom: -67, width: 120 }}
        />
        </View>
      </View>


      <UserConsumer>
        {({buscaCupom}) => (
          <InputCupomQR
            buscaCupom={buscaCupom}
            codigoCupom={this.state.codigoCupom}
            navigation={this.props.navigation}
          />
        )}
      </UserConsumer>

      <RodapeCompleto/>
    </ScrollView>
    )
  }
}

export default withNavigation(AdicionarCupom)