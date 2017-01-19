import { createStore } from 'redux';

/**********************************************************
*                                                         *
*                     PLACEHOLDER DATA                    *
*                                                         *
**********************************************************/

// This data represents the nested portions of important data blocks. (object in object). This
// is useful because occasionally a page tries to access an object property before it is received from
// the server. Without dummy objects, errors will occur, as functions would attempt to try
// and access properties of 'undefined'.

placeholderData = {
  viewedEvent: {
    locDetailsView: {},
    sport: {}
  }
}


/**********************************************************
*                                                         *
*                     DEFAULT STATE                       *
*                                                         *
**********************************************************/

// Note: Many of these are temporary and will never be displayed to the user. They simply must have
// some initial value.


var defaultState = {
  // This stores info from the user's profile.
  userProfileInformation: {
    id: 982,
    username: 'Margarita.Howe12631',
    name: 'Name loading...',
    bio: 'Contents loading...',
    activities: [],
    interests: [],
    token: null
  },
  // It's not clear if this is used. Consider removal.
  userUpcomingEvents: [],
  // This is the profile photo
  profileUrl: 'example/user/url',
  interests: ['sports', 'lego star wars', 'catz meow OwO'],
  // This refers to the signed-in user's location.
  locationDetails: {
    town: 'Town',
    state: 'State',
    country: 'Merica',
    lat: 37.774929,
    lon: -122.419416
  },
  // These four arrays are collections of events fitting a category.
  userFriends: [],
  friendRequests: [],
  nearbyEvents: [],
  friendsEvents: [],
  watchedEvents: [],
  myEvents: [],
  // The event collection currently being view. This is a string on purpose. Don't
  // break it.
  currentlyViewing: 'myEvents',
  // This refers to the specific event being viewed. It stores an event object. I
  // don't want to hear about how that doesn't make sense.
  currentlyViewedEvent: placeholderData.viewedEvent,
  // A string referring to the username of the profile of the person being viewed.
  userProfileCurrentlyViewing: 'Kristopher_Sawayn824',
  // An object which stores the current filter options for event list view filter
  filterOptions: {
    sports: [],
    date: [],
    eventList: ''
  },
  sportsToIds: [],
  // This is the hacky filter array used in filterOptions. If you have time to improve
  // this, feel free
  selectedActivities: [],
  // Remembers the 'state' of the filter selection buttons. This allows us to remember what
  // options we chose next time we need it. The key is the event name itself.
  filterButtonSelected: {}

}


/**********************************************************
*                                                         *
*                        REDUCER                          *
*                                                         *
**********************************************************/

// This is a busy reducer. If it gets larger, we simply need to break it into multiple
// reducers, which can be combined using a redux operation. Note the action naming con-
// vention is followed. 

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
  if (action.type === 'UPDATE_FRIENDS_REQUESTS') {
    var copy = Object.assign({}, state);
    copy.friendRequests = action.requestList;
    return copy;
  }
  // This refers to the *list* currently being viewed on the home screen.
  if (action.type === 'UPDATE_CURRENTLY_VIEWING') {
    var copy = Object.assign({}, state);
    copy.currentlyViewing = action.viewing;
    return copy;
  }
  // This refers to the *event* currently being viewed on the event view screen.
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
  if (action.type === 'SET_FILTER_OPTIONS') {
    var copy = Object.assign({}, state);
    copy.filterOptions = action.filterOptions;
    return copy;
  }
  if (action.type === 'SET_SPORT_IDS') {
    var copy = Object.assign({}, state);
    copy.sportsToIds = action.sportIds;
    return copy;
  }
  if (action.type === 'SET_SELECTED_ACTIVITIES') {
    var copy = Object.assign({}, state);
    copy.selectedActivities = action.selectedActivities;
    return copy;
  }
  if (action.type === 'SET_FILTER_BUTTON') {
    var copy = Object.assign({}, state);
    copy.filterButtonSelected[action.eventName] = action.newValue;
    return copy;
  }
  else {
    return state;
  }
}

/**********************************************************
*                                                         *
*                          STORE                          *
*                                                         *
**********************************************************/

var store = createStore(reducer);

module.exports = {
  store: store
};
