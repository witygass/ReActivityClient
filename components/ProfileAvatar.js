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
import { api } from '../lib/ajaxCalls';

export default class ProfileAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      profImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }
    // We need the user's profile image. We'll be receiving this info again on click,
    // but this (potentially) saves space by just getting the image and throwing everything else
    // away until needed.
    api.getUserByUsername(this.state.username, function(user) {
      this.setState({profImage: user.profileUrl})
    }.bind(this));

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

    return (
      <TouchableOpacity style={styles.container} onPress={this.clicked}>
        <Image
          source={{uri: this.state.profImage || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
          style={styles.image}
        >
        </Image>
      </TouchableOpacity>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    margin: 3,
    width: 69,
    height: 69,
    
  },
  image: {
    height: 69,
    width: 69,
    borderRadius: 5
  }
})