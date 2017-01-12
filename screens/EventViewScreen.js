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
import { api } from '../lib/ajaxCalls.js';

export default class EventViewScreen extends React.Component {

  constructor(props) {
    super(props);
    var that = this;
    this.state = {
      event: store.getState().currentlyViewedEvent
    }

    // Update the currently viewed event with a more detailed/recent one. 
    api.getEventById(that.state.event.id, function(event) {
      store.dispatch({
        type: 'UPDATE_CURRENTLY_VIEWING_EVENT',
        event: event
      });
      that.setState({event: store.getState().currentlyViewedEvent});
    })

    // If you come here from certain pages, the event object will not have all
    // the properties it needs to display. In this case, we must add 'dummy objects'
    // into the event. This will quickly be replaced by the above api call.
    if (!this.state.event.locDetailsView) this.state.event.locDetailsView = {};
    if (!this.state.event.creator) this.state.event.creator = {};
    if (!this.state.event.sport) this.state.event.sport = {};


    console.log('The current event (before update) is:', this.state.event);


    // Bind this to functions
    this.renderAttendees = this.renderAttendees.bind(this);
  }

  renderAttendees(att) {
    var that = this;
    var code = [];
    for (var i = 0; i < att && att.length; i++) {
      var snippet = (
        <Text
          style={styles.attendeeNameDisplay}
          onPress={
            function() {
              store.dispatch({
                type: 'UPDATE_USER_VIEWING_PROFILE',
                viewing: this
              });
              that.props.navigator.push('otherUserProfile');
            }.bind(att[i])
          }
        >
          • {att[i].firstName + ' ' + att[i].lastName}
        </Text>
      )
      code.push(snippet);
    }
    return code;
  }


  render() {
    var that = this;
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formImageContainer}>
            <Text
              onPress = {
                function() {
                  that.props.navigator.pop();
                }
              }>
              Back 
            </Text>
            <Image 
              style={styles.formImage}
              source={{uri: this.state.event.photoUrl}}/>
          </View>
          <View style={styles.formContainer}>

            <Text
              style = {styles.eventTitle}
            >
              {this.state.event.locDetailsView.name}
            </Text>
            <Text>
              Creator Name: {this.state.event.creator.username}
            </Text>
            <Text>
              Id: {this.state.event.id}
            </Text>
            <Text>
              Position: Lat - {this.state.event.locDetailsView.latitude} : Lon - {this.state.event.locDetailsView.longitude}
            </Text>
            <Text>
              Stars At: {this.state.event.startTime}
            </Text>
            <Text>
              Ends At: {this.state.event.endTime}
            </Text>
            <Text>
              Event Type: {this.state.event.sport.sport}
            </Text>
            <Text>
              Player Range: Between {this.state.event.minParticipants} and {this.state.event.maxParticipants} players.
            </Text>
           
            <View style={styles.listContainer}>
              <Text>
                Coming:
              </Text>
              {this.renderAttendees(this.state.event.users)}
            </View>
            
          </View>
        </ScrollView>
      </View>
    
    )
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
      marginTop: 5,
      marginBottom: 20
    },
    formImage: {
      width: 400,
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
    listContainer: {
      borderTopWidth: 2,
      marginTop: 10
    },
    attendeeNameDisplay: {
      fontSize: 18
    },
    eventTitle: {
      fontSize: 20,
      textAlign: 'center',
      textShadowOffset: {width: 2, height: 2},
      textShadowRadius: 2,
      textShadowColor: '#666'
    }

})


