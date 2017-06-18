/*global google*/

import React, { Component } from 'react';
import './Cities.css';
import { API_KEY } from './config';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Map from './Map';
import Topic from './Topic';

class CityPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
    };
  }
  componentDidMount() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.city.name}&key=${API_KEY}`,
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
          const service = new google.maps.places.PlacesService(this.refs.city);
          service.nearbySearch(
            {
              location,
              radius: '500',
              type: ['cities'],
            },
            (results, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results[0].photos[0].getUrl({ maxWidth: 400 }));
                this.setState({
                  photoUrl: results[0].photos[0].getUrl({ maxWidth: 1000 }),
                });
              }
            },
          );
        });
      }
    });
  }
  render() {
    const styleForImage = {
      backgroundImage: `url(${this.state.photoUrl})`,
    };
    const { fullView } = this.props;
    return (
      <div
        className={`block--city ${fullView ? 'block--city_bigger' : ''}`}
        style={{ backgroundImage: `url(${this.state.photoUrl})` }}
      >
        {fullView &&
          <div className="block--header block--header_transparent">
            <div className="block--header_title">BookTourist</div>
            <Link to="/">
              <a href="#" className="button--back">
                <i className="fa fa-chevron-left" aria-hidden="true" />
                {' '}
                Back to cities
              </a>
            </Link>

          </div>}
        <div className="block--city_name">
          <h2 className="header">
            {this.props.city.name}, {this.props.city.country}
          </h2>
          <div ref="city" />
          <div className="subheader">
            <i className="fa fa-map-marker" aria-hidden="true" />
            {' '} {this.props.city.places} places from {this.props.city.books} books
          </div>
          {!fullView &&
            <i
              className="block--city_chevron fa fa-chevron-right"
              aria-hidden="true"
            />}
        </div>
      </div>
    );
  }
}

export default CityPreview;
