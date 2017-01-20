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
import SignupForm from '../components/SignupForm.js';


export default class SignupScreen extends React.Component {

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

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <SignupForm navigator={this.props.navigator} />
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
