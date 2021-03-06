import React from 'react';

import { AsyncStorage } from 'react-native';

import { store } from './reduxStore';
import { baseUrl } from './localvars.js';

var api = {};

// Many of our api requests have a similar structure. Since 'fetch' is somewhat length,
// this template is used to shorten future uses. DRYAF
var fetchTemplate = function(callback, endpoint, method) {
  AsyncStorage.getItem('JWTtoken').then((token) => {
    return fetch(endpoint, {
      method: method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('JWT ' + token)
      }
    })
  })
  .then(function(response) {
    if (!method || method === 'GET') {
      var a = response._bodyInit;
      a = JSON.parse(a);
      callback(a);
    } else {
      callback(response);
    }
  })
  .catch(function(error) {
    console.log('API call error', error);
  });
};

api.uploadPhoto = function(options, callback) {
  AsyncStorage.getItem('JWTtoken').then((token) => {
    options.headers['Content-Type'] = 'multipart/formdata';
    options.headers['Authorization'] = 'JWT ' + token;
    return fetch('ENDPOINT HERE', options);
  })
  .then(function(response) {
    callback(response)
  })
}


api.getNearbyEvents = function(callback) {
  var lat = arguments[1] || 37.773972, lon = arguments[2] || -122.431297;
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
  fetchTemplate(callback, baseUrl + '/api/friends/' + id);
}

api.getFriendRequests = function(callback) {
  fetchTemplate(callback, baseUrl + '/api/friends/myrequests');
}

api.acceptFriendRequests = function(id, callback) {
  fetchTemplate(callback, baseUrl + '/api/friends/accept/' + id, 'PUT');
}

api.deleteFriendRequests = function(id, callback) {
  fetchTemplate(callback, baseUrl + '/api/friends/myrequests/' + id, 'DELETE');
}

api.makeFriendRequest = function(id, callback) {
  fetchTemplate(callback, baseUrl + '/api/friends/makerequest/' + id, 'PUT');
}

module.exports = {
  api: api
}
