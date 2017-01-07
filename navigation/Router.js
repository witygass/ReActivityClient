import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MapScreen from '../screens/MapScreen';
import SigninScreen from '../screens/SigninScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import CreateEventScreen from '../screens/CreateEventScreen';
import RealProfileScreen from '../screens/RealProfileScreen';
import EventViewScreen from '../screens/EventViewScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  map: () => MapScreen,
  signin: () => SigninScreen,
  friends: () => FriendsScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  createEvent: () => CreateEventScreen,
  realProfile: () => RealProfileScreen,
  eventView: () => EventViewScreen
}));
