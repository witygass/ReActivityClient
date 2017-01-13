import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json'
    },
  }

  constructor() {
    super();
    this.state = {
      token: 'none'
    }
  }

  componentWillUpdate() {
    var that = this;
    AsyncStorage.getItem('JWTtoken').then((token) => that.setState({token: token}));
  }


  logout = () => {
    AsyncStorage.removeItem('JWTtoken').then(() => {
      console.log('token deleted');
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>current token:{this.state.token}</Text>
        <Text onPress={this.logout}>Logout</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
