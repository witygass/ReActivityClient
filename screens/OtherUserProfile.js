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
import EventListEntry from '../components/EventListEntry';

/* IMPORTANT NOTE */
//
// If you've recently updated the database and you find this page not working, go to
// the reduxStore.js file and change the default state of 'userProfileCurrentlyViewing'
// to a name you can confirm is in the database. Name are newly generated each time, so
// you likely won't have duplicate names from the last seeding.
//
// This should be refactored to display a 'User Not Found' page, so that it's not necessary
// to update the redux default state every time we want to reseed the database.


export default class OtherUserProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: store.getState().userProfileCurrentlyViewing,
      user: {firstName: 'test', interests: [], activities: []}
    }
    api.getUserByUsername(this.state.username, function(user) {
      this.setState({user: user});
    }.bind(this));

    // Replace the event history with more detailed events.
    // this.replaceEventHistory();

    // Function binding
    this.replaceEventHistory = this.replaceEventHistory.bind(this);
  }


  // In the case where you try and click on an event, the EventListView attempts to display
  // it, but other user profiles do not come with detailed event information, but rather a somewhat
  // condensed version. It is necessary to replace these brief histories with full histories, since
  // we pass in the clicked event to the EventListView directly.
  replaceEventHistory() {
    // I see no reason why this would actually work.
    var that = this;
    var events = this.state.user.activities;
    for (var i = 0; i < events.length; i++) {
      api.getEventById(events[i].id, function(detailedEvent) {
        events[this] = detailedEvent;
        that.setState({activities: events});
      }.bind(i))
    }
  }

  


  render() {
    var that = this;
    console.log('this.state.user is:', this.state.user)
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text
              style={styles.backButton}
              onPress = {
                function() {
                  that.props.navigator.pop();
                }
              }>
              Back 
            </Text>

            <Image source = {{uri: this.state.user.profileUrl}} style={styles.profileImage}>
            </Image>
            <Text>
              Name: {this.state.user.firstName + ' ' + this.state.user.lastName}
            </Text>
            <Text>
              Id: {this.state.user.id}
            </Text>
            <Text>
              @{this.state.user.username}
            </Text>
            <Text>
              Last Active: {this.state.user.lastActive}
            </Text>
            <Text>
              Interests:
            </Text>
              {this.state.user.interests.map((interest) => (<Text>{interest.sport}</Text>))}
            <Text>
              Bio: {this.state.user.bioText}
            </Text>
            <Text>
            Events:
            </Text>
            {this.state.user.activities.map((activity) => (
              <EventListEntry event={activity} key={activity.id} navigator={that.props.navigator} />
            ))}

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
    },
    backButton: {
      alignItems: 'center',
      textAlign: 'center'
    }

})


