// Handles the loading of server requested information into the redux store.
// Often, this will be loaded into component state inside individual screens.
//
// All loaders store the loaded data into the redux store. Since this operation is
// usually async, the functions will accept a callback function into which the loaded
// data is passed.
//
// The following list contains our 'loading events', or the different things which
// need to be loaded/preloaded:
//
// -> nearby events
// -> my events
// -> friend events
// -> user profiles

import { store } from './reduxStore';
import { api } from './ajaxCalls';


var loader = {};

loader.loadNearbyEvents = function(callback) {
  api.getNearbyEvents(function(nearbyEvents) {
    store.dispatch({
      type: 'UPDATE_NEARBY_EVENT_TABLE',
      events: nearbyEvents
    });
    callback(nearbyEvents);
  }, arguments[1], arguments[2]);
}

loader.loadMyEvents = function(callback) {
  var username = store.getState().userProfileInformation.username;
  console.log('api running on username:', username);
  api.getUserByUsername(username, function(profile) {
    var myEvents = profile.activities;
    store.dispatch({
      type: 'UPDATE_MY_EVENT_TABLE',
      events: myEvents
    });
    callback(myEvents);
  });
}

loader.loadFriendsEvents = function(callback) {
  api.getFriendsEvents(function(events) {
    store.dispatch({
      type: 'UPDATE_FRIENDS_EVENT_TABLE',
      events: events
    });
    callback(events);
  })
}

loader.getUserProfiles = function(callback) {
  // This cannot be globally applied, since the instances in which we need this
  // functionality are varied and not currently supporting a modular 'getUserProfile'
  // command.
}

module.exports = {
  loader: loader
}
