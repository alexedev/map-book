import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import CitiesList from './CitiesList';
import Header from './Header';
import { Route } from 'react-router-dom';
import Search from './Search';

const cities = [
  { name: 'London', country: 'UK' },
  { name: 'Paris', country: 'France' },
  { name: 'Prague', country: 'Czech Republic' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Rome', country: 'Italy' },
  { name: 'Barcelona', country: 'Spain' },
  { name: 'Lisbon', country: 'Portugal' },
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
