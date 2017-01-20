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
import {
  Ionicons,
} from '@exponent/vector-icons';

import { store } from '../lib/reduxStore';
import { api } from '../lib/ajaxCalls';

export default class RequestListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestHandled: false,
      requestAction: 'something'
    }
    if (!this.props.request.profileUrl) {
      this.props.request.profileUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/aaronkwhite/128.jpg";
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

  accept(user) {
    api.acceptFriendRequests(user.id, () => {
      this.setState({requestHandled: true, requestAction: 'Friend request accepted'});
    })
  }

  reject(user) {
    api.deleteFriendRequests(user.id, () => {
      this.setState({requestHandled: true, requestAction: 'Friend request deleted'});
    })
  }

  render() {

    var user = this.props.request;
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress = {this.goToProfilePage.bind(this, user)}>
          <View style={styles.creator}>
            <Image
              style={styles.creatorPhoto}
              source={{uri: this.props.request.profileUrl || 'https://s3.amazonaws.com/uifaces/faces/twitter/aaronkwhite/128.jpg'}}
              />
          </View >
        </TouchableOpacity>
        <View style={styles.details}>
          <Text style={styles.title}>{this.props.request.firstName} {this.props.request.lastName}</Text>
            <View style={styles.optionBox}>
              <Text>
                {this.state.requestHandled ? this.state.requestAction :
                  <Text>
                      <View style={{height: 0, width: width * .0}}/>
                      <TouchableOpacity
                        style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * .25, height: width * .065, backgroundColor: 'tomato', borderRadius: 7}}
                        onPress={this.accept.bind(this, user)}
                        >
                        <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white'}}>
                          Confirm
                        </Text>
                      </TouchableOpacity>
                      <View style={{height: 0, width: width * .05}}/>
                      <TouchableOpacity
                        style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * .25, height: width * .065, backgroundColor: 'black', borderRadius: 7}}
                        onPress={this.reject.bind(this, user)}
                        >
                        <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white'}}>
                          Deny
                        </Text>
                      </TouchableOpacity>
                  </Text>
                }
              </Text>
            </View>
          </View>
      </View>
    );
  }
}

// <Ionicons name='md-checkbox-outline' size={50} color='coral' onPress={this.accept.bind(this, user)} />
// <Ionicons name='md-close' size={50} color='black'  onPress={this.reject.bind(this, user)} />
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fbfbfb',
    paddingVertical: 6,
    minHeight: 95,
    marginBottom: 3,
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
    width: 90,
    height: 90,
  },
  creatorName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
  details: {
    marginLeft: width * .02,
    width: width * .76,
  },
  optionBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * .8,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
  },
  description: {
    color: 'darkslategray',
    marginTop: 5,
    marginRight: 3,
    fontSize: 13,
    fontWeight: '100'
  },
});
