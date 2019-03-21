import React, { Component } from 'react';
import { Text, Modal, View } from 'react-native';
import RubikText from './RubikText'
import ButtonBorder from './ButtonBorder'

class Alert extends Component {

    state = {
        visible: true
    }

  constructor() {
    super();
  }

  render() {
    return <Modal 
        visible={this.state.visible}
        animationType={"fade"}
        transparent={true}
        onRequestClose={this.props.dismissAlert}
    >

        <View style={this.style.alertBackground}>
            <View style={this.style.alertContainer}>
                <RubikText style={{color: '#feca03'}}> {this.props.title} </RubikText>
                <RubikText style={{color: 'white'}}> {this.props.message} </RubikText>
                <ButtonBorder
                    title = {this.props.btnText}
                    onPress = {this.props.onClickButton}
                />
            </View>
        </View>
    </Modal>
  }

  style = {
    alertBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(254, 202, 03, 0.9)'
    },
    alertContainer: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 20,
        maxWidth: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    }
  }
}

export default Alert;