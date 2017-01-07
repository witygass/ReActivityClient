import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import socket from '../components/SocketIo';
import { serverURL } from '../lib/localvars.js';

import { store } from '../lib/reduxStore.js';

export default class SigninScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signin',
    },
  }
  componentDidMount() {
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  state = {
    isConnected: false,
    data: null,
  }

  componentDidMount() {

    socket.on('connect', () => {
      this.setState({isConnected: true});
    });

    socket.on('ping', (data) => {
      this.setState(data: data);
    });
  }

  _getToken = () => {
    fetch(serverURL + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "michael@gmail.com",
        password: "michael",
      })
    }).then(function(response){
      var token = JSON.parse(response._bodyText).token;
      AsyncStorage.setItem('JWTtoken', token);
      AsyncStorage.getItem('JWTtoken').then((token) => {
        console.log('token stored', token);
      });
    })
  }

  _sendGET = () => {
    AsyncStorage.getItem('JWTtoken').then((token) => {
      return fetch(serverURL + '/api/test', {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' +  token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    })
    .then(function(response){
      console.log('Answer: ', response._bodyText);
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>This is where the profile screen will live</Text>
        <Text>But currently it is the test field for server - client conenctions:</Text>

        { this.state.data && (
          <Text>
            socket connection: {this.state.data}
          </Text>
        )}

        <Text onPress={this._getToken}>Click here to get a token!</Text>
        <Text onPress={this._sendGET}>Click here to send GET request!</Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
