import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import socket from '../components/SocketIo';
import { serverURL } from '../lib/localvars.js';

import { store } from '../lib/reduxStore.js';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
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
        email: "john@mail.com",
        password: "john123",
      })
    }).then(function(response){
      console.log('Token: ', JSON.parse(response._bodyText));
      var token = JSON.parse(response._bodyText).token;
      store.dispatch({
        type: 'ADD_USER_TOKEN',
        token: token
      });
      console.log('Current state:', store.getState());

    })
  }
  _sendGET = () => {
    fetch(serverURL + '/api/test', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response){
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
