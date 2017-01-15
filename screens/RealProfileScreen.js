import React from 'react';
import {
  Dimensions,
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native';

import ProfileAvatar from '../components/ProfileAvatar';
import EventListEntry from '../components/EventListEntry';

import { store } from '../lib/reduxStore';
import { api } from '../lib/ajaxCalls';

export default class RealProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().userProfileInformation
    }

    console.log('profile state is:', this.state.user);

    // Bind this to functions
    this.updateProfile = this.updateProfile.bind(this);
    this.renderFeed = this.renderFeed.bind(this);
  }

  componentWillMount() {
    var that = this;
    api.getUserByUsername(this.state.user.username, function(user) {
      store.dispatch({
        type: 'UPDATE_USER',
        user: user
      })
      that.setState({user: user});
    })
  }
  

  renderFeed(feed) {
    var that = this;
    var code = [];
    for (var i = 0; i < feed.length; i++) {
      var b = i;
      var a = (
        <View key = {i}>
        <Text onPress = {
          function() {

              store.dispatch({
                type: 'CHANGE_EVENT_VIEW',
                event: this
              });
              // Reroute
              that.props.navigator.push('eventView');
            }.bind(feed[b])
        }
        style={styles.feed}
        >
        {feed[i].eventType} played.
        </Text>
        </View>
      )
      code.push(a);
    }
    return code;
  }


  render() {
    var that = this;
    return (

      <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>
          My Profile
        </Text>
      </View>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.profileView}>
            <Image style={styles.profileImage}
              source = {{uri: this.state.user.profileUrl}}
            >
            </Image>
            <View style={styles.shadowView}>
              <Text style={styles.name}>
                {this.state.user.firstName + ' ' + this.state.user.lastName}
              </Text>
              <Text style={styles.username}>
              @{this.state.user.username}
              </Text>
              <Text style={styles.bio}>
              "{this.state.user.bioText}"
              </Text>
            </View>
            <View style={styles.shadowView}>
              <Text style={styles.interestsLabel}>
                Interests:
              </Text>
              <Text style={styles.interests}>
              {this.state.user.interests.map((interest) => <Text> -{interest.sport} </Text>)}
              </Text> 
            </View>
          </View>
          <View style={styles.eventList}>
            {this.state.user.activities.map((event) => {
              return (
                <EventListEntry navigator={that.props.navigator} event={event} />
              )
            })}
          </View>
        </ScrollView>
      </View>
    
    )
  }



  updateProfile() {
    // This should redirect to a 'edit profile bio' page
  }

}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee'
    },
    contentContainer: {
      paddingTop: 80
    },
    profileImage: {
      width: 200,
      height: 200,
      marginTop: 3,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: '#333'

    },
    bio: {
      marginTop: 10,  
      fontStyle: 'italic',
      marginLeft: 10,
      fontFamily: 'rubik'
    },
    username: {
      color: '#444',
      fontStyle: 'italic',
      fontSize: 10,
      fontFamily: 'rubik'
    },
    shadowView: {
      margin: 5,
      backgroundColor: '#fff',
      padding: 5,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 3,
      shadowOpacity: 0.4,
      borderRadius: 5
    },
    name: {
      fontSize: 16,
      fontFamily: 'rubik'
    },
    interestsLabel: {
      fontSize: 16,
      marginBottom: 5,
      fontFamily: 'rubik'
    },
    headerBar: {
      flex: 1,
      maxHeight: 40,
      backgroundColor: 'coral',
      justifyContent: 'center'
    },
    headerTitle: {
      fontSize: 18,
      alignSelf: 'center',
      color: 'black',
      fontFamily: 'rubik'
    },
    feed: {
      fontFamily: 'rubik'
    },
    interests: {
      fontFamily: 'rubik'
    }

})



