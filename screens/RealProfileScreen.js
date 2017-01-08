import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
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
        <Text>
        {feed[i].eventType} played.
        </Text>
        <Button
          onPress = {
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
          title = 'View'
          color = '#208090'
        />
        </View>
      )
      code.push(a);
    }
    return code;
  }


  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formImageContainer}>
            <Image 
              style={styles.formImage}
              source={{uri: this.state.photo.medium}}/>
          </View>
          <View style={styles.formContainer}>
            <Text>
              {this.state.name}
            </Text>
            <Text>
              {this.state.username}
            </Text>
            <Text>
              {this.state.bio}
            </Text>
            {this.renderFeed(this.state.feed)}
          </View>
          <View style={styles.buttonContainer}>
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
    formImage: {
      width: 200,
      height: 200,
      marginTop: 3,
      borderWidth: 3,
      borderColor: 'black',
      borderRadius: 10

    },
    inputStyle: {
      height: 40
    },
    buttonContainer: {
      marginTop: 10,
      marginBottom: 20
    }

})



