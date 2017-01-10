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
import { store } from '../lib/reduxStore.js';

export default class RealProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = store.getState().userProfileInformation;

    // Bind this to functions
    this.updateProfile = this.updateProfile.bind(this);
    this.renderFeed = this.renderFeed.bind(this);

    
  }
  


  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formImageContainer}>
            <Image 
              style={styles.profileImage}
              source={{uri: this.state.photo.medium}}/>
          </View>
          <View style={styles.formContainer}>
            <Text
              style={styles.profileName}
            >
              {this.state.name}
            </Text>
            <Text style={styles.username}>
              @{this.state.username}
            </Text>
            <Text style={styles.bio}>
              {this.state.bio}
            </Text>
          </View>

          <View style={styles.feedContainer}>
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
      marginTop: 3,
      borderBottomColor: '#444',
      borderWidth: 0,
      borderBottomWidth: 10

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