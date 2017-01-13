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

import { store } from '../lib/reduxStore.js';

export default class RealProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = store.getState().userProfileInformation;

    // Bind this to functions
    this.updateProfile = this.updateProfile.bind(this);
    this.renderFeed = this.renderFeed.bind(this);

    
  }
  

  renderFeed(feed) {
    var that = this;
    var code = [];
    console.log('Feed is:', feed);
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
              console.log('Store has been updated. state is:', store.getState().currentlyViewing)
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
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.profileView}>
            <Image style={styles.profileImage}>
            </Image>
            <View style={styles.profileDetails}>
              <Text>
                Building...
              </Text>
              <Text style={styles.location}>
              </Text>
              <Text style={styles.bio}>
              </Text>
              <Text style={styles.sports}>
              </Text> 
            </View>
          </View>
        </ScrollView>
      </View>
    
    )
  }



  updateProfile() {
    // This should redirect to a 'edit profile bio' page
    console.log('UpdateProfile is happening.')
  }

}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    contentContainer: {
      paddingTop: 80
    },
    formImageContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    formContainer: {
      marginTop: 10,
      marginBottom: 20
    },
    profileImage: {
      width: width,
      height: 200,
      marginTop: 3

    },
    inputStyle: {
      height: 40
    },
    buttonContainer: {
      marginTop: 10,
      marginBottom: 20
    },
    profileName: {
      height: 20
    },
    feed: {
      color: '#66e',
      backgroundColor: '#fff',
      textAlign: 'center',
      height: 30,
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
      })
    },
    feedContainer: {
      borderWidth: 1,
      borderColor: '#333'
    },
    bio: {
      marginTop: 10,  
      fontStyle: 'italic',
      marginLeft: 10
    },
    username: {
      color: '#444',
      fontStyle: 'italic',
      fontSize: 10  
    }

})



