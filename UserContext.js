import React  from 'react';
import Api from './constants/Api';
import {AsyncStorage} from 'react-native';
import { Permissions, Notifications } from 'expo';

const UserContext = React.createContext();

class UserProvider extends React.Component {

  state = { 
    isAuth: false,
    userToken: null,
    fbData: null,
    userId: null,
    perfil: null,
    ofertas: [],
    cupons: [],
    cuponsUtilizados: [],
    isLoadingUser: true
  }

  constructor() {
    super()
    this.ativaCupom = this.ativaCupom.bind(this)
    this.atualizaCupons = this.atualizaCupons.bind(this)
    this.atualizaCuponsUtilizados = this.atualizaCuponsUtilizados.bind(this)
    this.buscaCupom = this.buscaCupom.bind(this)
    this.faleConosco = this.faleConosco.bind(this)
    this.getCupomById = this.getCupomById.bind(this)
    this.getDadosMeuPerfil = this.getDadosMeuPerfil.bind(this)
    this.getOfertas = this.getOfertas.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.receberNotificacoes = this.receberNotificacoes.bind(this)
    this.setDadosMeuPerfil = this.setDadosMeuPerfil.bind(this)
    this.setFacebookToken = this.setFacebookToken.bind(this)
    this.setPerfil = this.setPerfil.bind(this)
    this.setToken = this.setToken.bind(this)
    this.signup = this.signup.bind(this)
    this.toggleDesejo = this.toggleDesejo.bind(this)
  }

  async loadFromLocalStorage() {
    if(!this.state.isAuth) {
      const userToken = await AsyncStorage.getItem('userToken')
      const userId = await AsyncStorage.getItem('userId')
      if(userToken && userId) {
        this.setState({userToken, userId, isAuth: true})
        if(!this.state.perfil) {
          const perfil = JSON.parse(await AsyncStorage.getItem('perfil'))
          console.log("perfil carregado do localStorage", perfil)
          const ofertas = JSON.parse(await AsyncStorage.getItem('ofertas'))
          this.setState({perfil, ofertas})
        }
      }
    }
  }

  componentDidMount() {
    this.atualizaInfosUser()
  }

  async atualizaInfosUser() {
    await this.loadFromLocalStorage()
    await this.atualizaCuponsUtilizados()
    await this.setState({ isLoadingUser: false })
  }

  async signup(login, passwd) {
    const params = JSON.stringify({email: login, password: passwd})
    const res = await fetch(Api.url+'/pessoas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          this.setToken(jsonRes.data.token.token)
          this.setPerfil(jsonRes.data.pessoa)
        }
        return jsonRes
      })
    })
    .catch(error => console.error('Signup error', error));
    return res;
  }

  async login(user,passwd) {
    const res = await fetch(Api.url+'/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user, password: passwd})
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          this.setToken(jsonRes.data.token.token)
          this.setPerfil(jsonRes.data.pessoa)
        }
        return jsonRes
      })
    })
    .catch(erro => console.error('Erro no login',erro))
    return res;
  }


  logout() {
    AsyncStorage.clear();
    this.setState({
      isAuth: false,
      userToken: null,
      fbData: null,
      userId: null,
      perfil: null,
      ofertas: []
    });
  }

  async setToken(userToken) {
    this.setState({
      isAuth: true,
      userToken
    })
    console.log("setUserToken",userToken);
    await AsyncStorage.setItem('userToken', userToken.toString());
    await AsyncStorage.setItem('isAuth', "true");
  }

  async setFacebookToken(fbToken) {
    if(!fbToken || fbToken === '') {
      return null
    }
    
    // Get the user's name using Facebook's Graph API
    const response = await fetch('https://graph.facebook.com/me?fields=name,email&access_token=' + fbToken);
    const fbData = await response.json()
    fbData.accessToken = fbToken
    this.setState({
      fbData
    })
    await AsyncStorage.setItem('fbData', JSON.stringify(fbData));
    const res = await this.getAPITokenFromFacebookData(fbData)
    .then((response) => {
      if(response && response.success) {
        const loginData = response.data
        const perfil = loginData.pessoa
        const userToken = loginData.token
        this.setToken(userToken)
        this.setPerfil(perfil)
        return userToken
      }
      return null
    })
    .catch((e) => {
      console.log("Error on facebook login", e)
      return null
    });
    return res
  }

  async setPerfil(perfil) {
    let perfilCompleto = this.null2emptystring(perfil)

    // Inclui o primeiro nome no obj de perfil
    if(perfilCompleto.nome && perfilCompleto.nome !== '') {
      const nomeSimples = perfilCompleto.nome.split(' ')[0];
      perfilCompleto.nomeSimples = nomeSimples
    }

    this.setState({
      userId: perfil.id,
      perfil: perfilCompleto
    })
    console.log("perfil",perfilCompleto);
    await AsyncStorage.setItem('userId', perfil.id.toString());
    await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
  }

  async setOfertas(ofertas) {
    console.log("lista de desejo atualizada", ofertas)
    await this.setState({
      ofertas
    })
    await AsyncStorage.setItem('ofertas', JSON.stringify(ofertas));
  }

  async getAPITokenFromFacebookData(fbData) {
    console.log(fbData)
    const bodyRequest = {
      email: fbData.email,
      social_token: fbData.accessToken,
      nome: fbData.name
    }
    const res = await fetch(Api.url+'/login/facebook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no login',erro))
    return res;
  }

  async atualizaCupons() {
    if(this.state.isLoadingUser) {
      await this.atualizaInfosUser()
    }
    const userToken = this.state.userToken
    let auth = null
    if(userToken) {
      auth = {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+userToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    }
    await fetch(Api.url+'/cupons', auth)
    .then(response => {
      response.json()
      .then(res => {
        if(res && res.success) {
          const cupons = res.data
          console.log("cupons",cupons)
          this.setState({
            cupons
          })
        }
      })
    })
    .catch(erro => console.error('Erro no atualizacupons',erro))
  }

  async atualizaCuponsUtilizados() {
    if(!this.state.userId) {
      return []
    }

    const res = await fetch(Api.url+'/pessoas/'+this.state.userId+'/cupons', {
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          const cuponsUtilizados = jsonRes.data
          const cuponsFormatados = cuponsUtilizados.map(cupom => {
            let cupomFormatado = Object.assign({},cupom,{codigo_unico: cupom.codigo_unico});
            return cupomFormatado
          })
          this.setState({cuponsUtilizados: cuponsFormatados})
          return cuponsFormatados
        } else {
          console.log(jsonRes.message)
        }
      })
    })
    .catch(error => {
      console.log('Atualiza cupons utilizados error', error)
      this.logout();
    });
    return res;
  }

  async getCupomById(cupomId) {
    if(!cupomId) {
      const msgErro = { erro: "Cupom não encontrado." }
      throw msgErro
    }

    const res = await fetch(Api.url+'/cupons/'+cupomId,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => {
      console.log('Erro no buscaCupom',erro)
      throw erro
    })
    if(!res) {
      const msgErro = { erro: "Cupom não encontrado." }
      throw msgErro
    }
    if(res.success) {
      const cupom = res.data
      return cupom
    } else {
      throw res.message
    }
  }


  async buscaCupom(codigoCupom) {
    if(!codigoCupom) {
      const msgErro = { erro: "Sem código cupom" }
      throw msgErro
    }

    const res = await fetch(Api.url+'/cupons/encrypt/'+codigoCupom,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.log('Erro no buscaCupom',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const cupom = res.data
      return cupom
    } else {
      throw res.message
    }

  }

  async ativaCupom(idCupom) {
    if(!this.state.userId || !idCupom) {
      return {}
    }
    const params = JSON.stringify({
      pessoa_id: this.state.userId
    })
    const res = await fetch(Api.url+'/cupons/'+idCupom+'/ativar', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          const cupomAtivo = jsonRes.data
          return cupomAtivo
        } else {
          throw jsonRes.message
        }
      })
    })
    .catch(error => console.log('Ativa cupom error', error));
    return res;
  }
  async toggleDesejo(oferta_id) {
    if(!this.state.userId) {
      return
    }
    const res = await fetch(Api.url+'/pessoas/'+this.state.userId+'/ofertas', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"oferta_id":oferta_id})
    })
    .then(response => response.json())
    .catch(erro => console.log('Erro no toggleDesejo',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const ofertas = res.data.ofertas
      this.setOfertas(ofertas)
      return ofertas
    } else {
      throw res.message
    }
  }

  async getOfertas() {
    if(!this.state.userId) {
      return []
    }
    const res = await fetch(Api.url+'/pessoas/'+this.state.userId+'/ofertas',
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.log('Erro no getOfertas',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const ofertas = res.data.ofertas
      console.log("lista de desejos atualizadas", ofertas)
      await this.setOfertas(ofertas)
      return ofertas
    } else {
      throw res.message
    }
  }

  async getDadosMeuPerfil() {
    const res = await fetch(Api.url+'/pessoas/'+this.state.userId,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.log('Erro no getDadosMeuPerfil',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const meuPerfil = res.data
      this.setPerfil(meuPerfil)
      return meuPerfil
    } else {
      throw res.message
    }
  }

  async setDadosMeuPerfil(perfil) {
    const res = await fetch(Api.url+'/pessoas/'+this.state.userId, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.state.userToken
      },
      body: JSON.stringify(perfil)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no setDados',erro))
    if(res.errors) {
      throw res.errors
    }
    return res;
  }

  async faleConosco(nome, contato, assunto, mensagem) {
    const params = JSON.stringify({
      nome,
      assunto,
      mensagem,
      contato
    })
    const options = this.state.userToken ?
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+this.state.userToken,
          'Content-Type': 'application/json'
        },
        body: params
      } :
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: params
      }
    const res = await fetch(Api.url+'/fale_conoscos', options)
    .then(response => {
      return response.json().then((jsonRes) => {
        return jsonRes
      })
    })
    .catch(error => console.error('Erro no fale conosco', error));
    return res;
  }

  null2emptystring = (obj) => {
    const objRes = obj
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if(!obj[prop]) {
            objRes[prop] = ''
          }
        }
    }
    return objRes
  }

  async receberNotificacoes() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.enviaExpoToken(token)
  }

  enviaExpoToken = async (token) => {
    console.log('userId:', this.state.userId, 'expo token:', token);

    const res = await fetch(Api.url+'/pessoas/'+this.state.userId+'/subscription', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token":token})
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no enviaExpoToken',erro))
    if(!res) {
      return
    }
    if(res.success) {
      console.log("sucesso no post subscription", res)
    } else {
      console.log("erro no enviaExpoToken", res.message)
    }
  }

  // Utility function
  // Chrome doesnt support base64String
  urlBase64ToUint8Array = (base64String) => {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  registerOnPush = (swReg) => {
    swReg.active.addEventListener("push", (event) => {
      console.log("push received");
      let title = (event.data && event.data.text()) || "Chegou uma mensagem!";
      let body = "Recebemos uma mensagem por push :)";
      let tag = "push-demo-tag";
      let icon = '/assets/icon.png';

      event.waitUntil(
        swReg.showNotification(title, { body, icon, tag })
      )
    });

    console.log(swReg)
  }

  render() {
    return (
      <UserContext.Provider
        value={{ 
          ativaCupom: this.ativaCupom,
          atualizaCupons: this.atualizaCupons,
          atualizaCuponsUtilizados: this.atualizaCuponsUtilizados,
          buscaCupom: this.buscaCupom,
          cupons: this.state.cupons,
          cuponsUtilizados: this.state.cuponsUtilizados,
          faleConosco: this.faleConosco, 
          getCupomById: this.getCupomById,
          getDadosMeuPerfil: this.getDadosMeuPerfil,
          getOfertas: this.getOfertas,
          isAuth: this.state.isAuth,
          isLoadingUser: this.state.isLoadingUser,
          listaDesejos: this.state.ofertas, 
          login: this.login,
          logout: this.logout,
          perfil: this.state.perfil,
          receberNotificacoes: this.receberNotificacoes,
          setDadosMeuPerfil: this.setDadosMeuPerfil,
          setFacebookToken: this.setFacebookToken,
          setPerfil: this.setPerfil,
          setToken: this.setToken,
          signup: this.signup,
          toggleDesejo: this.toggleDesejo,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

  
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }