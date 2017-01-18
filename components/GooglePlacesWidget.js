var React = require('react');

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import { googleAPI } from '../lib/localvars.js';


module.exports = React.createClass({

  getDefaultProps() {
    return {
      type: 'GooglePlacesWidget',
    };
  },

  render() {
    const everywhere = {description: 'Everywhere', geometry: { location: { lat: 0, lng: 0 } }};


    return (
      <GooglePlacesAutocomplete
        placeholder='Type a city name'
        minLength={2} // minimum length of text to search
        autoFocus={true}
        fetchDetails={true}
        onPress={(data, details = {}) => { // details is provided when fetchDetails = true
          this.props.state.setState({
            modalVisible: false,
            data: data,
            details: details,
          })
          // this.props.onClose(details.formatted_address, this.props.navigator);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: googleAPI,
          language: 'en', // language of the results
          types: 'geocode', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        currentLocationAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        // predefinedPlaces={[everywhere]}


        {...this.props} // @todo test sans (need for 'name')
      />
    );
  },
});

//geocode
// {"address_components":[{"long_name":"944","short_name":"944","types":["street_number"]},{"long_name":"Market Street","short_name":"Market St","types":["route"]},{"long_name":"Tenderloin","short_name":"Tenderloin","types":["neighborhood","political"]},{"long_name":"San Francisco","short_name":"SF","types":["locality","political"]},{"long_name":"San Francisco County","short_name":"San Francisco County","types":["administrative_area_level_2","political"]},{"long_name":"California","short_name":"CA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"94102","short_name":"94102","types":["postal_code"]}],
// "adr_address":"<span class=\"street-address\">944 Market St</span>, <span class=\"locality\">San Francisco</span>, <span class=\"region\">CA</span> <span class=\"postal-code\">94102</span>, <span class=\"country-name\">USA</span>",
// "formatted_address":"944 Market St, San Francisco, CA 94102, USA",
// "geometry":{"location":{"lat":37.7836966,"lng":-122.4089664},"viewport":{"northeast":{"lat":37.7838028,"lng":-122.40863175},"southwest":{"lat":37.783378,"lng":-122.40907795}}},
// "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"62a16ff294ba7361380c7e4f8e5a066eec0829ef",
// "name":"944 Market St",
// "place_id":"ChIJa2U7loWAhYARXXIPjJLMNcM",
// "reference":"CmRbAAAAU-qqCGX6FSPkuSrKREEtb3lzcA5Y3OH9e8E6maVVsaIpIrpQzuLoRgIwmGlbDEzED_3HGtthqKZxNwkI_Le4ss94ZMq-q1VFx-IhwFU3yEucezq66luWHTvkJ30BKqfzEhBn584CJEP3wz839ct5elG3GhTKUaAHBdBpbvQyVGeu6cCCvjtXtA",
// "scope":"GOOGLE",
// "types":["premise"],
// "url":"https://maps.google.com/?q=944+Market+St,+San+Francisco,+CA+94102,+USA&ftid=0x80858085963b656b:0xc335cc928c0f725d",
// "utc_offset":-480,
// "vicinity":"San Francisco"}
