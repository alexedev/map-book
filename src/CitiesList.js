import React, { Component } from 'react';
import City from './City';
import { Link, Route } from 'react-router-dom';
import Map from './Map';
import BookList from './BooksList';

const books = [
  {
    "cover":"https://images.gr-assets.com/books/1344922523l/1953.jpg",
    "author":"Charles Dickens",
    "name":"A Tale of Two Cities"
  },
  {
    "cover":"https://images.gr-assets.com/books/1327868529l/18254.jpg",
    "author":"Charles Dickens",
    "name":"Oliver Twist"
  },
  {
    "cover":"https://images.gr-assets.com/books/1397245675l/14935.jpg",
    "author":"Jane Austen",
    "name":"Sense and Sensibility"
  },
  {
    "cover":"https://images.gr-assets.com/books/1327920219l/2623.jpg",
    "author":"Charles Dickens",
    "name":"Great Expectations"
  },
  {
    "cover":"https://images.gr-assets.com/books/1424596966l/5297.jpg",
    "author":"Oscar Wilde",
    "name":"The Picture of Dorian Gray"
  },
  {
    "cover":"https://images.gr-assets.com/books/1355929358l/8921.jpg",
    "author":"Arthur Conan Doyle",
    "name":"The Hound of the Baskervilles (Sherlock Holmes #5)"
  },
  {
    "cover":"https://images.gr-assets.com/books/1318116526l/51496.jpg",
    "author":"Robert Louis Stevenson",
    "name":"The Strange Case of Dr. Jekyll and Mr. Hyde"
  }
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
                ? <BookList books={books} />
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
