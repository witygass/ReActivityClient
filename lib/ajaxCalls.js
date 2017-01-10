import React from 'react';

import { AsyncStorage } from 'react-native';
import { store } from './reduxStore';
import { serverUrl } from './localvars.js';


var baseUrl = serverUrl;
var api = {};

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


api.getNearbyEvents = function(user, callback) {
  var lat = 70, lon = 23;
  fetchTemplate(user, callback, baseUrl + '/api/activities/nearby/' + lat + '/' + lon + '/25');
}

api.getMyEvents = function(user, callback) {
  fetchTemplate(user, callback, baseUrl + '/api/activities/personal');
}

api.getFriendEvents = function(user, callback) {
  fetchTemplate(user, callback, baseUrl + '/api/activities/friends');
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


module.exports = {
  api: api
}
