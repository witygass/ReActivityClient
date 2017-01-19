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

export default class FriendListEntry extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.friend.profileUrl) {
      this.props.friend.profileUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/aaronkwhite/128.jpg";
    }
  }

  goToProfilePage(user) {
    api.getUserByUsername(user.id, (user) => {
      store.dispatch({
        type: 'UPDATE_USER_VIEWING_PROFILE',
        viewing: user.id
      })
      this.props.navigator.push('otherUserProfile');
    })
  }

  render() {
    var that = this;
    var user = this.props.friend;
    return (
      <TouchableOpacity onPress = {this.goToProfilePage.bind(this, user)}>
        <View style={styles.container}>
          <View style={styles.creator}>
            <Image
              style={styles.creatorPhoto}
              source={{uri: this.props.friend.profileUrl || 'https://s3.amazonaws.com/uifaces/faces/twitter/aaronkwhite/128.jpg'}}
              />
          </View >
          <View style={styles.details}>
            <Text style={{fontFamily: 'rubik'}}>{this.props.friend.firstName} {this.props.friend.lastName}</Text>
            <Text></Text>
          </View>
      </View>
    </TouchableOpacity>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fbfbfb',
    paddingVertical: 6,
    minHeight: 95,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  creator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * .22,
    borderRightColor: '#D3D3D3',
    borderStyle: 'solid',
    borderRightWidth: 1,
  },
  creatorPhoto: {
    width: 100,
    height: 100,
  },
  creatorName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
  details: {
    marginLeft: width * .05,
    width: width * .76,
  },
  title: {
    fontSize: 17
  },
  description: {
    color: 'darkslategray',
    fontSize: 13,
    fontWeight: '100'
  },
});
