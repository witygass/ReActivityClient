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

import { baseUrl } from '../lib/localvars.js';
import { store } from '../lib/reduxStore.js';

export default class SigninScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signin',
    },
  }
  state = {
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
      var body = JSON.parse(response._bodyText);

      that.setState({username: body.username});
      AsyncStorage.multiSet([['JWTtoken', body.token], ['userId', body.userId.toString()], ['username', body.username]]).then(() => {
        console.log('user info stored');
        that.loginSuccess();
      })
      .catch((err) => {
        console.log('Set AsyncStorage Error:', err);
      });

      store.dispatch({
        type: 'UPDATE_USER_INFO',
        token: body.token,
        userId: body.userId,
        username: body.username
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
      userId: null,
      username: null
    });
    AsyncStorage.removeItem('JWTtoken').then(() => {
      console.log('token deleted');
    })
  }

  goToSignup = () => {
    this.props.navigator.push('signup');
  }

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
      <Text onPress={this.goToSignup}>Signup</Text>
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
