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

import ProfileAvatar from '../components/ProfileAvatar';

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




    // Bind this to functions
    this.renderAttendees = this.renderAttendees.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  renderAttendees(att) {
    var that = this;
    var code = [];
    if (!att) return;
    for (var i = 0; i < att.length; i++) {
      var snippet = (
        <ProfileAvatar username={att[i].username} navigator={that.props.navigator} />
      )
      code.push(snippet);
    }
    return code;
  }

  formatTime(date) {
    var time = new Date(date);

    var hours = time.getHours()%12 + 1
    var minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
    var timeOfDay = time.getHours() >= 12 ? 'PM' : 'AM';

    return hours + ':' + minutes + ' ' + timeOfDay;
  }

  formatDate(date) {
    var time = new Date(date);

    var month = time.getMonth() + 1;
    var day = time.getDay() + 1;
    var date = time.getDate();
    var year = time.getFullYear();

    var months = {
      1 : 'January',
      2 : 'February',
      3 : 'March',
      4 : 'April',
      5 : 'May',
      6 : 'June',
      7 : 'July',
      8 : 'August',
      9 : 'September',
      10 : 'October',
      11 : 'November',
      12 : 'December'
    }

    var days = {
      1 : 'Sunday',
      2 : 'Monday',
      3 : 'Tuesday',
      4 : 'Wednesday',
      5 : 'Thursday',
      6 : 'Friday',
      7 : 'Saturday'
    }

    day = days[day];
    month = months[month];

    return day + ', ' + month + ' ' + date + ', ' + year;

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

            <View>
              <Text
                style = {styles.eventTitle}
              >
                {this.state.event.title}
              </Text>
            </View>
            
            <View style={styles.shadowView}>
              <Text>
                Where: {this.state.event.locDetailsView.streetAddress1}
              </Text>
              <Text>
                Date: {this.formatDate(this.state.event.startTime)}
              </Text>
              <Text>
                When: {this.formatTime(this.state.event.startTime)} - {this.formatTime(this.state.event.endTime)}
              </Text>
              <Text>
                Event: {this.state.event.sport.sport}
              </Text>
              <Text>
                Player Range: Between {this.state.event.minParticipants} and {this.state.event.maxParticipants} players.
              </Text>
            </View>
           
            <View style={styles.shadowView}>
              <Text>
                Who's Coming:
              </Text>
              <View style={styles.attending}>
                {this.renderAttendees(this.state.event.users)}
              </View>
            </View>
            
          </View>
        </ScrollView>
      </View>
    
    )
  }

}

const styles = StyleSheet.create({
    attending: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    container: {
      flex: 1,
      backgroundColor: '#eee'
    },
    contentContainer: {
      paddingTop: 80
    },
    formImageContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,

    },
    formContainer: {
      flex: 1,
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
      shadowOpacity: 0.4
    },
    attendeeNameDisplay: {
      fontSize: 18
    },
    eventTitle: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: 'bold'
    }

})


