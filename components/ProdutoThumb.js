import React, { Component } from 'react';
import Link from '../ui/Link';
import { View } from 'react-native';
import RubikText from '../ui/RubikText';

class ProdutoThumb extends Component {

  render() {
    return <View 
        style={{ 
          overflow: 'visible', 
          position: 'relative', 
          alignSelf: 'center', 
          margin: 1,
          marginTop: 10,
          width: '100%'
        }}>
        {Number(this.props.porcentagem_off) > 0 &&
        <View style={{
            backgroundColor: '#e20f17',
            position: 'absolute',
            top: -2,
            right: 15,
            padding: 7,
            paddingBottom: 0
          }}
          >
            <RubikText bold={true} 
              style={{
                fontSize:18,
                color: 'white'
              }}>{this.props.porcentagem_off}%</RubikText>
            <RubikText bold={true} 
              style={{
                fontSize:16,
                color: 'white',
                flexDirection: 'column',
                marginTop: -2
              }}>OFF</RubikText>
        </View>
        }
        <Link 
          to={"/produtos/"+this.props.id}
          style={{overflow: 'hidden'}}
          >
          <Image
            resizeMode="cover" 
            style={{
              objectFit:'cover', 
              height: '100%',
              borderWidth: 2,
              borderColor: '#bdbabc',
            }} 
            className="img-thumb"
            src={this.props.img}/>
          
        </Link>
    </View>
  }
}

export default ProdutoThumb;