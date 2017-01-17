import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  Button
} from 'react-native';

import { baseUrl } from '../lib/localvars.js';
import { store } from '../lib/reduxStore.js';
import GiftedFormExample from '../components/GiftedFormExample.js';


export default class SignupScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signup',
    },
  }
  state = {
    username: '',
    firstName: '',
    lastName: '',
    bioText: '',
    profileUrl: '',
    interests: [],
    email: '',
    password: '',
  }

  submit = () => {
    var that =  this;
    fetch(baseUrl + '/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(function(response){
      var body = JSON.parse(response._bodyText);
      that.setState({username: body.username});
      AsyncStorage.multiSet([['JWTtoken', body.token], ['userId', body.userId.toString()]]).then(() => {
        console.log('user info stored');
        that.signupSuccess();
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

  signupSuccess = () => {
    console.log('logged in')
    this.state.email = '';
    this.state.password = '';
    this.props.navigator.push('home');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <GiftedFormExample navigator={this.props.navigator} />
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
