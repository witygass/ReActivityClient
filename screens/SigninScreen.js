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
    password: '',
    username: 0
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
      var body = JSON.parse(response._bodyText);

      that.setState({username: body.username});
      AsyncStorage.multiSet([['JWTtoken', body.token], ['userId', body.userId.toString()]]).then(() => {
        console.log('user info stored');
        that.loginSuccess();
      })
      .catch((err) => {
        console.log('Set AsyncStorage Error:', err);
      });

      store.dispatch({
        type: 'UPDATE_USER_INFO',
        token: body.token,
        userId: body.userId
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
    store.dispatch({
      type: 'UPDATE_USER_INFO',
      token: null,
      userId: null
    });
    
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
