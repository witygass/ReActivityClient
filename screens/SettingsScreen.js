import React from 'react';
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

import { store } from '../lib/reduxStore'

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings'
    },
  }

  constructor() {
    super();
    this.state = {
      token: 'none',
      userId: 0,
      username: ''
    }
  }

  componentWillMount() {
    var that = this;
    AsyncStorage.multiGet(['JWTtoken', 'userId', 'username']).then((array) => {
      that.setState({token: array[0][1], userId: array[1][1], username: array[2][1]});
    });
  }

  goToSignup = () => {
    this.props.navigator.push('signup');
  }

  logout = () => {
    AsyncStorage.multiRemove(['JWTtoken','userId', 'username']).then(() => {
      console.log('token deleted');
    })
    store.dispatch({
      type: 'UPDATE_USER_INFO',
      token: null,
      userId: null,
      username: null
    });
    this.props.navigator.push('signin');
    // this.props.navigation.performAction(({ tabs, stacks }) => {
    //   tabs('main').jumpToTab('signin');
    //   stacks('home').push('signin');
    // });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <View style={styles.whitebox}>
          <Text style={styles.text}>current username: {this.state.username}</Text>
        </View>
        <View style={styles.whitebox}>
          <Button
            onPress={this.logout}
            title="Logout"
            color="coral"
          />
          <Button
            onPress={this.goToSignup}
            title="Signup"
            color="coral"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  text: {
    fontSize: 18
  },
  whitebox: {
    backgroundColor: 'white',
    marginBottom: 3
  }
});
