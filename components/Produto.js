import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions, Image, Share } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import RubikText from '../ui/RubikText';
import { UserConsumer } from '../UserContext';
import { withNavigation } from 'react-navigation';

class Produto extends Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{width, alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Oferta', {id: this.props.id})}>
          <Image
            source={{ uri : "https:"+(this.props.urlFoto || "//via.placeholder.com/500x500?text=Oferta+Vestylle")}}
            resizeMode="cover"
            style={{ width: width*0.85, height: width*0.9, borderWidth: 1, borderColor: 'white', borderRadius: 0 }}
          />
        </TouchableHighlight>
        <View style={{ width: width*0.82, flexDirection: 'row', marginTop: 10 }}>
        <TouchableHighlight
        style={{alignItems: 'flex-start', flexGrow: 2, flexShrink:2}}
        onPress={() => this.props.navigation.navigate('Oferta', {id: this.props.id})}>
            <>
              <RubikText bold={true} style={{color: '#585756', textDecorationLine: 'underline'}}>{this.props.titulo.toUpperCase()}</RubikText>
              <RubikText style={{color: '#585756' }}>{this.props.subtitulo}</RubikText>
            </>
        </TouchableHighlight>
          <View style={{flexGrow: 1, flexShrink:1, flexDirection:'row', alignItems: 'center'}}>
            <TouchableHighlight onPress={this.onShare}>
              <MaterialCommunityIcons name="share-variant" size={24} style={{color: '#585756' }}/>
            </TouchableHighlight>

          <UserConsumer>
            {({toggleDesejo}) => (
            <TouchableHighlight
                onPress={ () => toggleDesejo(this.props.id).catch(() => this.props.navigation.navigate("Cadastro"))}
            >
              <MaterialCommunityIcons name={this.props.liked ? "heart" : "heart-outline"} size={30} style={{color: '#585756' }}/>
            </TouchableHighlight>
            )}
          </UserConsumer>
          </View>
        </View>
      </View>
    )
  }

  onShare = async () => {
    const urlProduto = 'https://vestylle.grupotesseract.com.br/produtos/'+this.props.id;
    try {
      const result = await Share.share({
        url:urlProduto,
        message:
          'Produto em oferta! \n '+urlProduto,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
}


export default withNavigation(Produto)