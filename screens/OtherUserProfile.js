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
import { api } from '../lib/ajaxCalls.js';

export default class RealProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: store.getState().userProfileCurrentlyViewing,
      user: {firstName: 'test', interests: []}
    }
    api.getUserByUsername(this.state.username, function(user) {
      this.setState({user: user});
    }.bind(this));
  }
  

  


  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formContainer}>

            <Image source = {{uri: this.state.user.profileUrl}} style={styles.profileImage}>
            </Image>
            <Text>
              {this.state.user.firstName + ' ' + this.state.user.lastName}
            </Text>
            <Text>
              @{this.state.user.username}
            </Text>
            <Text>
              Bio: {this.state.user.bioText}
            </Text>

          </View>
        </ScrollView>
      </View>
    
    )
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
      marginTop: 15,
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


