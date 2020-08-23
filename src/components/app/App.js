import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/* Components */
import Auth from '../auth/Auth';
import Sidebar from '../sidebar';

export default class App extends Component {
  state = { 
    login: false,
  }
  onLogin = (login, password) => {
    if (!login && password) {
      this.setState({login: true})
    } else {
      console.log('Not');
    }
  };
  render() {
    return (
      <Router>
        <Auth/>
        {/* <Route path="/" exact render={() => <Auth onLogin={this.onLogin} />} /> */}
        {/* <Route
          path="/sidebar"
          render={() => <Sidebar login = {this.state.login} />}
        ></Route> */}
      </Router>
    );
  }
}
