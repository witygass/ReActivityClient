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
import {
  SimpleLineIcons,
} from '@exponent/vector-icons';
import { Components } from 'exponent';
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
    this.thumbnailFromSport = this.thumbnailFromSport.bind(this);
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

  thumbnailFromSport(sport) {
    var sports = {
      'baseball' : 'http://twinstrivia.com/wp-content/uploads/2011/11/Baseball1.png',
      'soccer' : 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Soccerball_mask.svg/50px-Soccerball_mask.svg.png',
      'basketball' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/50px-Basketball.png',
      'weight-training' : 'http://rlv.zcache.com/barbell_bodybuilding_classic_round_sticker-rec30a842558440b8956dc11143ca6a1c_v9waf_8byvr_50.jpg',
      'football' : 'http://cdn.bleacherreport.net/images/team_logos/50x50/college_football.png',
      'mountain-biking' : 'http://argos.scene7.com/is/image/Argos/3324680_R_Z002A_UC1385685?wid=50&hei=50',
      'running' : 'http://litbimg6.rightinthebox.com/images/50x50/201609/utmphm1473306095331.jpg'
    }
    return sports[sport];
  }


  render() {
    var that = this;
    return (

      <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerSpacer}></Text>
        <Text style={styles.headerTitle}>
          My Profile
        </Text>
        <SimpleLineIcons name='note' size={24} color='black'
          style={styles.editIcon}
          onPress={() => { this.props.navigator.push('editprofile'); }}
        />
      </View>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>


          <View style={styles.profileView}>
            <View style={styles.profileInfo}>

            <View style={styles.imageBox}>
              <Image style={styles.profileImage} source = {{uri: this.state.user.profileUrl}}>
                <Components.LinearGradient
                  colors={['transparent','transparent', 'rgba(0,0,0,1)']}
                  style={styles.editPictureGradient}
                  end={[1, 1]}
                >
                  <Text style={styles.editPicture}>
                    <SimpleLineIcons name='note' size={24} color='white'
                    style={styles.edit}
                    onPress={() => { this.props.navigator.push('imageUpload'); }}
                    />
                  </Text>
                </Components.LinearGradient>
              </Image>
            </View>
              <View>
                <Text style={styles.name}>
                  {this.state.user.firstName + ' ' + this.state.user.lastName}
                </Text>
                <Text style={styles.username}>
                @{this.state.user.username}
                </Text>
                <View style={styles.bioBox}>
                  <Text style={styles.bio}>
                  "{this.state.user.bioText}"
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.shadowView}>
              <View style={styles.activityContainer}>
                <Text style={{marginRight: 3, fontFamily: 'rubik', fontSize: 16, marginLeft: 3}}>
                  Interests:
                </Text>
                  {this.state.user.interests.map((interest) => {
                    return (
                      <Image source={{uri: this.thumbnailFromSport(interest.sport)}} style={styles.thumb} key={interest.sport}></Image>
                    )})
                  }
              </View>
            </View>
          </View>

          <View style={styles.upcoming}>
            <Text style={styles.upcomingText}>
              Upcoming Activities:
            </Text>
          </View>

          <View style={styles.eventList}>
            {this.state.user.activities.map((event) => {
              return (
                <EventListEntry navigator={that.props.navigator} event={event} key={event.id} />
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
      width: width/2,
      height: width/2,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: '#333',

    },
    bio: {
      fontFamily: 'rubik',
    },
    username: {
      color: '#444',
      fontStyle: 'italic',
      fontSize: 12,
      fontFamily: 'rubik',
      alignSelf: 'center'
    },
    shadowView: {
      marginVertical: 3,
      backgroundColor: '#fff',
      padding: 5,
    },
    name: {
      fontSize: 24,
      fontFamily: 'rubik',
      alignSelf: 'center'
    },
    interestsLabel: {
      fontSize: 16,
      marginBottom: 5,
      fontFamily: 'rubik',
      marginRight: 5
    },
    headerBar: {
      flex: 1,
      maxHeight: 40,
      backgroundColor: 'coral',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    headerSpacer: {
      flex: 1,
    },
    headerTitle: {
      flex: 10,
      fontSize: 18,
      alignSelf: 'center',
      color: 'black',
      fontFamily: 'rubik',
      textAlign: 'center'
    },
    editIcon: {
      flex: 1,
    },
    editPictureGradient: {
      position: 'absolute',
      bottom: 0,
      width: width/2,
      height: width/2,
      right: 0,
      alignItems: 'flex-end'
    },
    editPicture: {
      position: 'absolute',
      bottom: 2,
      right: 2
    },
    feed: {
      fontFamily: 'rubik'
    },
    interests: {
      fontFamily: 'rubik'
    },
    activityContainer: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    thumb: {
      width: 20,
      height: 20,
      marginRight: 3
    },
    profileInfo: {
      flex: 1,
      flexWrap: 'wrap',
      backgroundColor: 'white'
    },
    profileView: {
      flex: 1,
      flexDirection: 'column'
    },
    bioBox: {
      borderWidth: 1,
      borderColor: '#888',
      marginHorizontal: 15,
      marginVertical: 5,
      padding: 5,
      borderRadius: 10
    },
    imageBox: {
      borderWidth: 1,
      borderColor: '#aaa',
      marginHorizontal: (width / 4) - 2,
      paddingVertical: 1,
      borderRadius: 3,
      marginTop: 5
    },
    upcoming: {
      backgroundColor: 'peachpuff',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
    upcomingText: {
      justifyContent: 'center',
      fontSize: 17
    },
    eventList: {
    }
})
