// Composes a list of random events for testing purposes. Events come from the 'activites/nearby' 
// server route.

import { api } from './ajaxCalls.js';
import { store } from './reduxStore';

// Generate 'my events' and 'friends events' arrays of length n
var generateData = function(n) {
  api.getNEvents(2*n, null, function(events) {
    var myEvents = events.splice(n);
    var friendsEvents = events;

    // Update redux state
    store.dispatch({
      type: 'UPDATE_MY_EVENT_TABLE',
      events: myEvents
    });
    store.dispatch({
      type: 'UPDATE_FRIENDS_EVENT_TABLE',
      events: friendsEvents
    });
  })
}

module.exports = {
  generator: generateData
}