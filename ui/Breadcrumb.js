import React, { Component } from 'react';
import { View } from 'react-native';

class Breadcrumb extends Component {

  render() {
    return <View style={this.style.container}>
        {this.props.children}
    </View>
  }

  style = {
    container: {
      paddingTop: 20,
      paddingLeft: 20,
      color: 'white'
    }
  }
}

export default Breadcrumb;