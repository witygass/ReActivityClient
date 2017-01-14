import { createStore } from 'redux';


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
  eventPhoto: 'http://www.prepcasts.com/wp-content/uploads/2014/04/BasketballStockImage.jpg',
  attendees: ['bob', 'mark', 'john'],
  creator: 'michael',
  title: 'Basketball fun!',
  locationId: 'Let\'s shoot the hoop.'
})

testEvents.push({
  id: 2,
  location: {
    name: 'The Fields',
    latitude: 70.23131,
    longitude: 30.5523412,
    geom: 'geom(4917)'
  },
  time: {
    created: new Date()/1 - 10000,
    playTime: new Date()/1 + 150000
  },
  eventType: 'Soccer',
  minPlayers: 10,
  maxPlayers: 16,
  eventPhoto: 'https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/1473720/0778540001479694311_filepicker.jpg',
  attendees: ['mark', 'john', 'cindy'],
  creator: 'tyler',
  eventName: '',
  title: "'Futbol Europeno'",
  locationId: 'We love to play soccer. You will too!'
})

testEvents.push({
  id: 3,
  location: {
    name: 'Make a Plumbus',
    latitude: 75.23131,
    longitude: 23.5523412,
    geom: 'geom(4517)'
  },
  time: {
    created: new Date()/1 - 100000,
    playTime: new Date()/1 + 15000
  },
  eventType: 'Fleeb',
  minPlayers: 4,
  maxPlayers: 6,
  eventPhoto: 'http://vignette1.wikia.nocookie.net/rickandmorty/images/7/7a/Fleeb_(Rick_and_Morty).png/revision/latest?cb=20161202151521',
  attendees: ['john', 'sally', 'tom', 'bob'],
  creator: 'nate',
  title: "Making a Plumbus",
  locationId: 'First we\'ll need a Fleeb...'
})

// Placeholder Data
// (This data represents the nested portions of important data blocks. (object in object). This
// is useful because occasionally a page tries to access an object before it is received from
// the server. Without dummy object, errors would occur, as functions would attempt to try
// and access properties of 'undefined'.)

placeholderData = {
  viewedEvent: {
    locDetailsView: {},
    sport: {}
  }
}


// Default state

var defaultState = {
  userProfileInformation: {
    id: 751,
    username: 'Georgiana.Schultz37809',
    name: 'Name loading...',
    bio: 'Contents loading...',
    activities: [],
    interests: [],
    token: null
  },
  userUpcomingEvents: [testEvents[1], testEvents[2]],
  profileUrl: 'example/user/url',
  interests: ['sports', 'lego star wars', 'catz meow OwO'],
  locationDetails: {
    town: 'Town',
    state: 'State',
    country: 'Merica',
    lat: 37.774929,
    lon: -122.419416
  },
  userFriends: [],
  nearbyEvents: [],
  friendsEvents: [testEvents[2], testEvents[1]],
  watchedEvents: [],
  myEvents: [],
  currentlyViewing: 'myEvents',
  currentlyViewedEvent: placeholderData.viewedEvent,
  userProfileCurrentlyViewing: 'Kristopher_Sawayn824'
}



// Reducer

var reducer = function(state = defaultState, action) {
  if (action.type === 'ADD_EVENT') {
    var copy = Object.assign({}, state);
    copy.myEvents.push(action.event);
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
  if (action.type === 'UPDATE_NEARBY_EVENT_TABLE') {
    var copy = Object.assign({}, state);
    copy.nearbyEvents = action.events;
    return copy;
  }
  if (action.type === 'UPDATE_MY_EVENT_TABLE') {
    var copy = Object.assign({}, state);
    copy.myEvents = action.events;
    return copy;
  }
  if (action.type === 'UPDATE_FRIENDS_EVENT_TABLE') {
    var copy = Object.assign({}, state);
    copy.friendsEvents = action.events;
    return copy;
  }
  if (action.type === 'UPDATE_CURRENTLY_VIEWING') {
    var copy = Object.assign({}, state);
    copy.currentlyViewing = action.viewing;
    return copy;
  }
  if (action.type === 'UPDATE_CURRENTLY_VIEWING_EVENT') {
    var copy = Object.assign({}, state);
    copy.currentlyViewedEvent = action.event;
    return copy;
  }
  if (action.type === 'UPDATE_USER_VIEWING_PROFILE') {
    var copy = Object.assign({}, state);
    copy.userProfileCurrentlyViewing = action.viewing;
    return copy;
  }
  if (action.type === 'UPDATE_USER_FRIEND_LIST') {
    var copy = Object.assign({}, state);
    copy.userFriends = action.friendList;
    return copy;
  }
  if (action.type === 'UPDATE_USER_INFO') {
    var copy = Object.assign({}, state);
    copy.userProfileInformation.id = action.userId;
    copy.userProfileInformation.token = action.token;
    copy.userProfileInformation.username = action.username;
    return copy;
  }
  if (action.type === 'UPDATE_USER') {
    var copy = Object.assign({}, state);
    copy.userProfileInformation = action.user;
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
