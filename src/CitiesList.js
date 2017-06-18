import React, { Component } from 'react';
import City from './City';
import { Link, Route } from 'react-router-dom';
import Map from './Map';

class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBooklist: false,
    };
  }
  handleBooklistToggle = e => {
    e.preventDefault();
    this.setState({ showBooklist: !this.state.showBooklist }, () => {
      console.log(this.state.showBooklist);
    });
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              {this.props.cities.map(city => (
                <Link to={`/city/${city.name}`} key={city.name + city.country}>
                  <City key={city.name + city.country} city={city} />
                </Link>
              ))}
            </div>
          )}
        />
        <Route
          path={`/city/:cityName`}
          render={({ match }) => (
            <div>
              <City
                fullView
                city={this.props.cities.find(
                  city => city.name === match.params.cityName,
                )}
              />
              <Map match={match} onBooklistToggle={this.handleBooklistToggle} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default CitiesList;
