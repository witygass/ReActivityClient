import React from 'react';
import {
  Button,
  Image,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import Router from '../navigation/Router'
import EventListEntry from '../components/EventListEntry';
import EventTypeFilterBar from '../components/EventTypeFilterBar';
import HomeScreenHeader from '../components/HomeScreenHeader';
import { MonoText } from '../components/StyledText';
import dummyEventData from './dummyData/dummyEventData';


export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  constructor() {
    super()
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
    };
    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh() {
     this.setState({refreshing: true});
    //  fetchData().then(() => {
    //    this.setState({refreshing: false});
    //  });
   }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{flex: 0, height: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'paleturquoise'}}>
            <HomeScreenHeader/>
          </View>
            <View style={{height: 40}}>
              <EventTypeFilterBar/>
            </View>
          <View>
            <ScrollView
              style={styles.scrollview}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  tintColor="silver"
                  title="Loading..."
                  titleColor="silver"
                />
              }>
              {dummyEventData.map((event)=> <EventListEntry event={event} key={event.key}/>)}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <ScrollView
  //         style={styles.container}
  //         contentContainerStyle={styles.contentContainer}>
  //
  //         <View style={styles.welcomeContainer}>
  //           <Image
  //             source={require('../assets/images/exponent-wordmark.png')}
  //             style={styles.welcomeImage}
  //           />
  //         </View>
  //
  //
  //         <View style={styles.getStartedContainer}>
  //           {this._maybeRenderDevelopmentModeWarning()}
  //
  //           <Text style={styles.getStartedText}>
  //             Get started by opening
  //           </Text>
  //
  //           <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
  //             <MonoText style={styles.codeHighlightText}>
  //               screens/HomeScreen.js
  //             </MonoText>
  //           </View>
  //
  //           <Text style={styles.getStartedText}>
  //             Change this text and your app will automatically reload.
  //           </Text>
  //         </View>
  //
  //         <View style={styles.helpContainer}>
  //           <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
  //             <Text style={styles.helpLinkText}>
  //               Help, it didn’t automatically reload!
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </ScrollView>
  //
  //       <View style={styles.tabBarInfoContainer}>
  //         <Text style={styles.tabBarInfoText}>
  //           This is a tab bar. You can edit it in:
  //         </Text>
  //
  //         <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
  //           <MonoText style={styles.codeHighlightText}>
  //             navigation/RootNavigation.js
  //           </MonoText>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );
  //
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will run slightly slower but
  //         you have access to useful development tools. {learnMoreButton}.
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }
  //
  // _handleLearnMorePress = () => {
  //   Linking.openURL('https://docs.getexponent.com/versions/latest/guides/development-mode');
  // }
  //
  // _handleHelpPress = () => {
  //   Linking.openURL('https://docs.getexponent.com/versions/latest/guides/up-and-running.html#can-t-see-your-changes');
  // }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
