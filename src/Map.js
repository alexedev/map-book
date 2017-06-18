/*global google*/

import React from 'react';
import { API_KEY } from './config';

import Button from './Button';

export default class Map extends React.Component {
  componentDidMount() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.match.params.cityName}&key=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          const location = json.results[0].geometry.location;
          this.map = new google.maps.Map(this.refs.map, {
            center: location,
            zoom: 16,
          });
          var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Hello World!',
          });
          const service = new google.maps.places.PlacesService(this.map);
          service.nearbySearch(
            {
              location,
              radius: '500',
              type: ['cities'],
            },
            (results, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results[0].photos[0].getUrl({ maxWidth: 400 }));
              }
            },
          );
        });
      }
    });
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '540px',
      border: 'none',
    };

    return (
      <div style={{ position: 'relative' }}>
        <div ref="map" style={mapStyle} />
        <Button
          onBooklistToggle={this.props.onBooklistToggle}
          icon="book"
          text="Filter books"
        />
      </div>
    );
  }
}
