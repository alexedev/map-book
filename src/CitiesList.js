import React, { Component } from 'react';
import City from './City';
import { Link, Route } from 'react-router-dom';
import Map from './Map';
import BookList from './BooksList';

const books = [
  { name: 'Book1', author: 'Author 1' },
  { name: 'Book2', author: 'Author 2 Long NAme' },
  { name: 'Book3', author: 'Author 3 Long NAme Long' },
  { name: 'Book4 nameee ndnfad', author: 'Author 4 Long NAme Long' },
  { name: 'Book5nameeeeeeeeeeee', author: 'Author 5 Long NAme Long' },
  { name: 'Book6', author: 'Author 6' },
];

class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBooklist: false,
    };
  }
  handleBooklistToggle = e => {
    e.preventDefault();
    this.setState({ isBooklist: !this.state.isBooklist }, () => {});
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
              {this.state.isBooklist
                ? <BookList
                    books={books}
                    onBooklistToggle={this.handleBooklistToggle}
                  />
                : <Map
                    match={match}
                    onBooklistToggle={this.handleBooklistToggle}
                  />}

            </div>
          )}
        />
      </div>
    );
  }
}

export default CitiesList;
