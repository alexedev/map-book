/*global google*/

import React from 'react';
import { API_KEY } from './config';

import Button from './Button';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
    };
  }
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
            zoom: 11,
            scrollwheel: false,
          });
          if (this.props.match.params.cityName === 'London') {
            fetch('http://ea0a38c5.ngrok.io/places', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            }).then(response => {
              response.json().then(json => {
                console.log(json);
                this.setState(
                  {
                    places: json.filter(
                      place => place.city === this.props.match.params.cityName,
                    ),
                  },
                  () => {
                    if (this.state.places && this.state.places.length) {
                      console.log(this.state.places);
                      this.state.places.forEach(place => {
                        const marker = new google.maps.Marker({
                          position: {
                            lat: place.lat,
                            lng: place.lng,
                          },
                          map: this.map,
                          title: place.name,
                        });
                      });
                    }
                  },
                );
              });
            });
          }

          const service = new google.maps.places.PlacesService(this.map);
          service.nearbySearch(
            {
              location,
              radius: '100',
              type: ['cities'],
            },
            (results, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
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
      <div>
        <div style={{ position: 'relative' }}>
          <div ref="map" style={mapStyle} />
          <Button
            onBooklistToggle={this.props.onBooklistToggle}
            icon="book"
            text="List of books on this map"
          />
        </div>
        <a href="#" className="button" style={{position:'absolute',bottom:'10em',left:'10em'}}>
            <i className="fa fa-plane" aria-hidden="true"></i> Flight to {this.props.match.params.cityName} from $50
        </a>
      </div>
    );
  }
}
