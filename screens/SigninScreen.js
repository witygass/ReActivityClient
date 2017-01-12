import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  Button
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

// import socket from '../components/SocketIo';
import { baseUrl } from '../lib/localvars.js';

import { store } from '../lib/reduxStore.js';

export default class SigninScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signin',
    },
  }
  state = {
    isConnected: false,
    data: '',
    email: '',
    password: ''
  }


  submit = () => {
    var that =  this;
    fetch(baseUrl + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then(function(response){
      var token = JSON.parse(response._bodyText).token;
      AsyncStorage.setItem('JWTtoken', token).then(() => {
        console.log('token stored');
        that.loginSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }

  loginSuccess = () => {
    console.log('logged in')
    this.state.email = '';
    this.state.password = '';
    this.props.navigator.push('home');
  }

  logout = () => {
    AsyncStorage.removeItem('JWTtoken').then(() => {
      console.log('token deleted');
    })
  }

// #Elements to test, remove once sockets are integrated
// #in View
// <Text onPress={this._sendGET}>After signing in, click here to test a protected route</Text>
// { this.state.data && (
//   <Text>
//     Sever time to test socket connection: {this.state.data}
//   </Text>
// )}
//
// componentDidMount() {
//   socket.on('connect', () => {
//     this.setState({isConnected: true});
//   });
//   socket.on('ping', (data) => {
//     this.setState(data: data);
//   });
// }
//
// #function
//   _sendGET = () => {
//     AsyncStorage.getItem('JWTtoken').then((token) => {
//       return fetch(baseUrl + '/api/test', {
//         method: 'GET',
//         headers: {
//           'Authorization': 'JWT ' +  token,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         }
//       })
//     })
//     .then(function(response){
//       console.log('server answer: ', response._bodyText);
//     })
//   }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>


        <Text>Email:</Text>
        <TextInput
          onChangeText={(email) => this.setState({email})}
          value={this.state.text}
          style={styles.inputBox}
        />
        <Text>Password:</Text>
        <TextInput
          onChangeText={(password) => this.setState({password})}
          value={this.state.text}
          style={styles.inputBox}
        />
        <Button
          onPress={this.submit}
          title="Submit"
          color="#841584"
        />
      <Text onPress={this.logout}>Logout</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  inputBox: {
    height: 40
  }
});
