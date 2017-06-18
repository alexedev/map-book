import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import CitiesList from './CitiesList';
import Header from './Header';
import { Route } from 'react-router-dom';
import Search from './Search';

const cities = [
  { name: 'London', country: 'UK', books: 6, places: 64 },
  { name: 'Paris', country: 'France', books: 4, places: 27 },
  { name: 'Prague', country: 'Czech Republic', books: 4, places: 41 },
  { name: 'Berlin', country: 'Germany', books: 1, places: 4 },
  { name: 'Rome', country: 'Italy', books: 6, places: 49 },
  { name: 'Barcelona', country: 'Spain', books: 2, places: 11 },
  { name: 'Lisbon', country: 'Portugal', books: 2, places: 14 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
  }
  handleSearch = e => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  componentWillMount() {
    this.setState({ query: null });
  }
  render() {
    const re = RegExp(this.state.query, 'i');

    return (
      <div className="App">
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>*/}
        <Route
          path="/"
          render={({ location }) => location.pathname === '/' && <Header />}
        />
        <Route
          exact
          path="/"
          render={() => <Search onSearch={this.handleSearch} />}
        />
        <CitiesList
          cities={
            this.state.query
              ? cities.filter(
                  city => city.name.match(re) || city.country.match(re),
                )
              : cities
          }
        />
      </div>
    );
  }
}

export default App;
