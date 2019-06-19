import React from 'react';
import { TouchableHighlight, ScrollView, View, ImageBackground, TextInput } from 'react-native';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import MiniRodape from '../components/MiniRodape';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text'
import { UserConsumer } from '../UserContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
class Checkbox extends React.Component {

  render() { 
    return <TouchableHighlight
      onPress={this.toggleCheckbox}
      style={this.props.style}
      >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialCommunityIcons
        name={this.props.value ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
        size={26}
        style={{color:'white'}}
      />
      <RubikText style={{color: 'white', paddingLeft: 5}}>{this.props.title}</RubikText>
    </View>
    </TouchableHighlight>
  }

  toggleCheckbox = () => {
    const newValue = !this.props.value;
    this.props.onChange(newValue);
  }
}
class InputValidacao extends React.Component {

  render() {
    return (
      <View>
        <RubikText bold={true} style={{color: '#feca03', fontSize:12, marginTop: 3}}>{this.props.title}</RubikText>
        { this.props.mask ? (
          <TextInputMask
            style={this.style.inputSublinhado} 
            value={this.props.value}
            onChangeText={this.props.onChange}
            option={this.props.maskOptions}
            type={this.props.mask}
          />
        ):(
        <TextInput 
          style={this.style.inputSublinhado} 
          value={this.props.value}
          onChangeText={this.props.onChange}
          />
        )}
      </View>
    )
  }  

  style = {
    inputSublinhado: {
      borderBottomWidth: 1,
      color: 'white',
      borderColor: '#585756',
      marginTop: 5,
      marginBottom: 8,
      paddingBottom: 2,
      fontSize: 15
    }
  }
}

class FormMeuPerfil extends React.Component {

  state = {
    nome: '',
    email: '',
    cpf: '',
    data_nascimento: '',
    celular: '',
    genero: '',
    receberNovidades: false,
    loading: true,
    atualizando: false
  }
  
  loadPerfil() {
    if(this.state.loading) {
      this.props.getData()
      .then(perfil => {
        if(perfil.data_nascimento) {
          perfil.data_nascimento = this.utf2ddmmaaaa(perfil.data_nascimento)
        }
        this.setState({
          ...perfil,
          loading: false
        })
      })
      .catch(erro => console.log('Erro no form de meu perfil',erro))
    }
  }

  componentDidUpdate() {
    this.loadPerfil();
  }

  componentDidMount() {
    this.loadPerfil();
  }

  render() {
    return <>
        <RubikText bold={true} style={{color:'white', fontSize: 14, marginTop: 10, marginBottom: 10}} >Meu perfil         {this.state.loading ? (<FontAwesome name="spinner" color="white"/>) : ''}</RubikText>
          <InputValidacao 
            title="Nome" 
            value={this.state.nome}
            onChange={(nome) => this.setState({nome})}/>
          <InputValidacao 
            title="E-mail" 
            value={this.state.email}
            onChange={(email) => this.setState({email})}/>
          <InputValidacao 
            mask="cpf"
            title="CPF" 
            value={this.state.cpf}
            onChange={(cpf) => this.setState({cpf})}/>
          <InputValidacao 
            mask="datetime"
            title="Data de Nascimento" 
            value={this.state.data_nascimento}
            onChange={(data_nascimento) => this.setState({data_nascimento})}/>
          <InputValidacao 
            mask="cel-phone"
            title="Celular" 
            value={this.state.celular}
            onChange={(celular) => this.setState({celular})}/>

          <Checkbox
            title="Quero receber novidades e ofertas da Vestylle Megastore Jaú"
            value={this.state.receberNovidades}
            onChange={(receberNovidades) => this.toggleNotificacoes(receberNovidades)}
            style={{paddingTop: 20, paddingBottom: 15}}/>
          
          <ButtonBorder
            title="CONTINUAR"
            onPress={() => this.atualizarPerfil()}
            style={{marginBottom: 40}}
            loading={this.state.loading}
          />

        { this.state.erroUpdate && (
          <Alert
            title = "Atenção"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
    </>
  }

  toggleNotificacoes(receberNovidades) {
    this.setState({receberNovidades})
    if(receberNovidades) {
      this.props.receberNotificacoes();
    }
  }

  dismissAlertErro = () => {
    this.setState({
      erroUpdate: false
    })
  }

  async atualizarPerfil(event) {
    if(event) {
      event.preventDefault()
    }
    this.setState({loading: true})
    let perfil = {
      nome: this.state.nome,
      email: this.state.email,
      cpf: this.state.cpf,
      genero: this.state.genero,
      data_nascimento: this.state.data_nascimento,
      celular: this.state.celular,
      receberNovidades: this.state.receberNovidades
    }
    
    // Trata data de nascimento e cpf
    if(perfil.data_nascimento) {
      perfil.data_nascimento = this.ddmmaaaa2utf(perfil.data_nascimento)
    }
    if(perfil.cpf) {
      perfil.cpf = perfil.cpf.replace(/\D/g,'')
    }

    this.setState({
      atualizando: true
    })

    await this.props.setData(perfil)
    .then((res) => {
      if(res && res.succes && res.data) {
        const meuPerfil = res.data
        this.props.atualizaPerfil(meuPerfil)
      }
      this.props.getData()
      this.setState({atualizando: false})
      this.props.navigation.navigate('AreaCliente')
    })
    .catch((e) => {
      let msgErro = ""
      Object.keys(e).map((campo) => {
        msgErro += " "+e[campo]
        return msgErro
      })
      this.setState({
        atualizando: false,
        loading: false,
        erroUpdate:true,
        msgErro
      })
    })
  }

  ddmmaaaa2utf = (stringDate) => {
    const splittedDate = stringDate.split('/');
    const day = splittedDate[0]
    const month = splittedDate[1]
    const year = splittedDate[2]
    return year+'-'+month+'-'+day;
  }
  utf2ddmmaaaa = (utfDate) => {
    const date = utfDate.split(' ')[0];
    const splittedDate = date.split('-');
    const day = splittedDate[2]
    const month = splittedDate[1]
    const year = splittedDate[0]
    return day+''+month+''+year;
  }
}

export default class MeuPerfil extends React.Component {

  state = {
    erroAtualizaPerfil: false,
    msgErro: '',
    nome: '',
    email: '',
    cpf: '',
    nascimento: '',
    celular: '',
    receberNovidades: false
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', height: '100%'}}>
        <ScrollView style={{ alignSelf: 'stretch'}}>
        <View style={{padding: 20}}>
          <UserConsumer>
          {({ getDadosMeuPerfil, setDadosMeuPerfil, setPerfil, receberNotificacoes }) => (
              <FormMeuPerfil
                getData={getDadosMeuPerfil}
                setData={setDadosMeuPerfil}
                atualizaPerfil={setPerfil}
                navigation={this.props.navigation}
                receberNotificacoes={receberNotificacoes}
              />
          )}
          </UserConsumer>
        </View>
        <MiniRodape/>
        </ScrollView>
      </ImageBackground>
    );
  }

}
