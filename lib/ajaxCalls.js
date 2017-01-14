import React from 'react';

import { AsyncStorage } from 'react-native';

import { store } from './reduxStore';
import { baseUrl } from './localvars.js';

var api = {};

// Many of our api requests have a similar structure. Since 'fetch' is somewhat length,
// this template is used to shorten future uses. DRYAF
var fetchTemplate = function(callback, endpoint) {
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


api.getNearbyEvents = function(callback) {
  var lat = 37.773972, lon = -122.431297;
  fetchTemplate(callback, baseUrl + '/api/activities/nearby/' + lat + '/' + lon + '/25');
}

api.getFriendsEvents = function(callback) {
  fetchTemplate(callback, baseUrl + '/api/activities/myfriends/25');
}

api.getUserByUsername = function(username, callback) {
  fetchTemplate(callback, baseUrl + '/api/profile/' + username);
}

api.getEventById = function(id, callback) {
  fetchTemplate(callback, baseUrl + '/api/activities/' + id);
}

api.createEvent = function(event) {
  AsyncStorage.getItem('JWTtoken').then((token) => {
    fetch(baseUrl + '/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ('JWT ' + token)
      },
      body: JSON.stringify(event)
    });
  })

}

api.getFriendListById = function(id, callback) {
  // using random user to mock friends
  // change to real api for friends by token ID
  fetchTemplate(callback, baseUrl + '/api/friends/' + id);
}

module.exports = {
  api: api
}
