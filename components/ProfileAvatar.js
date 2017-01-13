// This component is the small 'button' which takes you to a user's profile.
import React from 'react';

import {
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { store } from '../lib/reduxStore';

export default class ProfileAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    }

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    store.dispatch({
      type: 'UPDATE_USER_VIEWING_PROFILE',
      viewing: this.state.username
    });
    this.props.navigator.push('otherUserProfile');
  }

  render() {
    var that = this;
    console.log('Username is:', this.state.username);

    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.clicked}>
          {that.state.username}
        </Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    flex: 1,
    marginTop: 20
  }
})