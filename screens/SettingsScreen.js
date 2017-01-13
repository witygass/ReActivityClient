import React from 'react';
import {
  AsyncStorage,
  Button,
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
      title: 'Settings'
    },
  }

  constructor() {
    super();
    this.state = {
      token: 'none',
      userId: 0
    }
  }

  componentWillMount() {
    var that = this;
    AsyncStorage.multiGet(['JWTtoken', 'userId']).then((array) => {
      that.setState({token: array[0][1], userId: array[1][1]});
    });
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
        <Text>current token: {this.state.token}</Text>
        <Text>current userId: {this.state.userId}</Text>
        <Button
          onPress={this.logout}
          title="Logout"
          color="#841584"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
