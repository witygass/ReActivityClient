import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  Button,
  View
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { baseUrl } from '../lib/localvars.js';
import { store } from '../lib/reduxStore.js';

export default class SigninScreen extends React.Component {
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

        <View style={styles.helloBox}>
          <Text style={styles.introText}>Welcome</Text>
          <Text style={styles.introText}>to</Text>
          <Text style={styles.introText}>Reactivity</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.fieldText}>Email:</Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            value={this.state.text}
            style={styles.inputBox}
          />
          <Text style={styles.fieldText}>Password:</Text>
          <TextInput
            onChangeText={(password) => this.setState({password})}
            value={this.state.text}
            style={styles.inputBox}
          />
        </View>


        <Button
          onPress={this.submit}
          title="Submit"
          color="#841584"
        />
      <Text>Don't have an Account?<Text style={styles.signup}onPress={this.goToSignup}>  Signup Here</Text></Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'peachpuff'
  },
  inputBox: {
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10
  },
  introText: {
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'rubik'
  },
  helloBox: {
    flex: 1,
    backgroundColor: 'coral',
    paddingVertical: 20
  },
  fieldText: {
    fontSize: 16,
    marginLeft: 10
  },
  inputContainer: {
    marginTop: 5
  },
  signup: {
    color: 'coral',
    marginLeft: 10
  }
});
