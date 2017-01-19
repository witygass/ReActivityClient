import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import Router from '../navigation/Router';
import { store } from '../lib/reduxStore';
import moment from 'moment';

@withNavigation
export default class EventMarkerCallout extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentEventView = this.setCurrentEventView.bind(this);
  }

  setCurrentEventView() {
    var event = this.props.event;
    store.dispatch({
      type: 'UPDATE_CURRENTLY_VIEWING_EVENT',
      event: event
    });
    // console.log('The event being pushed is:', event);
    this.props.navigator.push('eventView');
  }

  render() {
    var sports = {
      'baseball' : 'http://twinstrivia.com/wp-content/uploads/2011/11/Baseball1.png',
      'soccer' : 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Soccerball_mask.svg/50px-Soccerball_mask.svg.png',
      'basketball' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/50px-Basketball.png',
      'weight-training' : 'http://rlv.zcache.com/barbell_bodybuilding_classic_round_sticker-rec30a842558440b8956dc11143ca6a1c_v9waf_8byvr_50.jpg',
      'football' : 'http://cdn.bleacherreport.net/images/team_logos/50x50/college_football.png',
      'mountain-biking' : 'http://argos.scene7.com/is/image/Argos/3324680_R_Z002A_UC1385685?wid=50&hei=50',
      'running' : 'http://litbimg6.rightinthebox.com/images/50x50/201609/utmphm1473306095331.jpg'
    }
    var startDate = moment(this.props.event.startTime).format('dddd, MMMM Do');
    var startTime = moment(this.props.event.startTime).format('h:mma')
    var endTime = moment(this.props.event.endTime).format('h:mma')
    return (
      <TouchableOpacity onPress={this.setCurrentEventView} style={styles.container}>
        <Image
          style={styles.creatorPhoto}
          source={{uri: this.props.event.creator.profileUrl || 'http://lorempixel.com/400/400/'}}
        />
        <View>
          <View style={styles.header}>
            <Text
              style={{fontWeight: '700'}}
              numberOfLines={1}
              >
              {this.props.event.title}
            </Text>
          </View>
          <View style={styles.details}>
            <Image
              style={styles.sportThumbnail}
              source={{uri: sports[this.props.event.sport.sport]}}
              />
            <Text style={styles.timeText}>
              {startDate}
              {'\n'}
              at {startTime} to {endTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ); }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // width: width * .4,
    // backgroundColor: 'lightpink',
  },
  creatorPhoto: {
    width: width * .13,
    height: width * .13
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
    width: width * .6,
    marginLeft: 10,
    // backgroundColor: 'thistle'
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * .6,
    marginTop: 5,
    marginLeft: 10,
    // backgroundColor: 'aquamarine'
  },
  sportThumbnail: {
    width: width * .07,
    height: width * .07
  },
  timeText: {
    marginLeft: width * .02,
    fontSize: 12
  }
});
