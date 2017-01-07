import { createStore } from 'redux';

// Actions

console.log('starting redux store.')

var exampleUpdateMessage = function(newMessage) {
  return {
    type: 'EXAMPLE_UPDATE_MESSAGE',
    message: newMessage
  }
};

// var addEvent = function(newEvent) {
//   return {
//     type: 'ADD_EVENT',
//     message: newEvent
//   }
// }

// Test events

var testEvents = [];

testEvents.push({
  id: 1,
  location: {
    name: 'The Courts',
    latitude: 75.23131,
    longitude: 23.5523412,
    geom: 'geom(4517)'
  },
  time: {
    created: new Date()/1 - 100000,
    playTime: new Date()/1 + 15000
  },
  eventType: 'Basketball',
  minPlayers: 4,
  maxPlayers: 12,
  eventPhoto: 'https://tmp-m.org/wp-content/uploads/2016/11/bball-basketball.jpg'
})

// Default state

var defaultState = {
  userProfileInformation: {
    username: 'jarob903',
    name: 'Jarob R. Gilliam',
    bio: 'I do some things and don\'t do other things.',
    feed: ['Something 1 day ago.', 'Something else 3 days ago.', 'A thing 3 weeks back.'], 
    photo: {
      small: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/A-G/duke-lemur-blue.jpg.adapt.945.1.jpg',
      medium: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/A-G/duke-lemur-blue.jpg.adapt.945.1.jpg',
      large: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/A-G/duke-lemur-blue.jpg.adapt.945.1.jpg'
    }
  },
  userFriends: ['Object[miniProfile]', 'Object[miniProfile]'],
  nearbyEvents: ['Object[event]', 'Object[event]'],
  friendsEvents: ['Object[event]', 'Object[event]'],
  watchedEvents: ['Object[event]', 'Object[event]'],
  myEvents: ['Object[event]', 'Object[event]'],
  currentlyViewing: testEvents[0]
}

// Reducer

var reducer = function(state = defaultState, action) {
  if (action.type === 'EXAMPLE_UPDATE_MESSAGE') {
    Object.assign({}, state, {
      message: action.message
    });
  }
  if (action.type === 'ADD_EVENT') {
    var copy = Object.assign({}, state);
    copy.events.push(action.event);
    console.log('Event added! State is:', copy);
    return copy;
  }
  if (action.type === 'CHANGE_EVENT_VIEW') {
    var copy = Object.assign({}, state);
    copy.currentlyViewing = action.event;
    return copy;
  }
  if (action.type === 'EDIT_PROFILE') {
    var copy = Object.assign({}, state);
    copy.bio = action.newBio;
    console.log('Profile editted! State is:', copy);
    return copy;
  }
  if (action.type === 'ADD_USER_TOKEN') {
    var copy = Object.assign({}, state);
    copy.userToken = action.token;
    return copy;
  }
  else {
    return state;
  }
}

// Store

var store = createStore(reducer);

module.exports = {
  store: store
};