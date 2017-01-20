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
import Backbar from '../components/Backbar';


export default class SettingsScreen extends React.Component {
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
      <View style={styles.container}>
    <View style={styles.headerBar}>
      <Text style={styles.headerSpacer}></Text>
      <Text style={styles.headerTitle}>
        Settings
      </Text>
    </View>
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
            color="black"
          />
        </View>
      </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  headerBar: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: 'coral',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'rubik',
    textAlign: 'center'
  },
  text: {
    fontSize: 18
  },
  whitebox: {
    backgroundColor: 'white',
    marginBottom: 3
  }
});
