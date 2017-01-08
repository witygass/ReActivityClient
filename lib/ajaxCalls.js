// I don't currently know the endpoints. They don't particularly matter, just change them
// here to whatever they need to be.

// Each of these calls pass the response into a CALLBACK FUNCTION. Please provide a callback
// function or expected behavior can't be guaranteed.

// Finally, note that some of these are POST requests, as the server needs to know certain user
// data to make decisions on return data. (Eg, nearby events, my events)

// This is used to produce DRYer code.
import React from 'react';
import { AsyncStorage } from 'react-native';

import { store } from './reduxStore.js';

var baseUrl = 'http://dd1222bc.ngrok.io';

var api = {};

console.log(store.getState())


var fetchTemplate = function(user, callback, endpoint) {
  AsyncStorage.getItem('JWTtoken').then((token) => {
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('JWT ' + token)
      }
    })
  })
  .then(function(response) {  
    var a = response._bodyInit;
    a = JSON.parse(a);
    callback(a);
  });
};

// All of the following post requests send the user's token,

// /api/activities/nearby

api.getNearbyEvents = function(user, callback) {
  // var lat = store.getState().locationDetails.lat;
  // var lon = store.getState().locationDetails.lon;
  var lat = 70, lon = 23;
  fetchTemplate(user, callback, baseUrl + '/api/activities/nearby/' + lat + '/' + lon + '/25');
}

api.getMyEvents = function(user, callback) {
  fetchTemplate(user, callback, baseUrl + '/api/activities/personal');
}

api.getFriendEvents = function(user, callback) {
  fetchTemplate(user, callback, baseUrl + '/api/activities/friends');
}

api.getWatchedEvents = function(user, callback) {
  fetchTemplate(user, callback, baseUrl + '/api/activities/watched');
}

// Get profile information
api.getProfileInformation = function(callback) {
  fetchTemplate(user, callback, baseUrl + '/user/profile');
}

// Get location information (These may not be necessary at all.)
api.getLocationInformation = function(callback) {
  fetchTemplate(user, callback, baseUrl + '/user/location');
}

// Retrieves a player's event history (Which I realize probably doesn't exist yet.)
api.getEventHistory = function(callback) {
  fetchTemplate(user, callback, baseUrl + '/user/history');
}


// THINGS WE NEED

var getProfileByUsername = function(callback) {};


module.exports = {
  api: api
}
