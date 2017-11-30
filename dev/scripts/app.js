import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link, Switch
} from 'react-router-dom';

// components
import MainHeader from './components/header.js'
import MainFooter from './components/footer.js'
import Dashboard from './components/dashboard.js'
import SingleApplication from './components/jobApplication';
import Home from './components/home';
import NewApplication from './components/newApplication.js'

// firebase config
var config = {
  apiKey: "AIzaSyA1qK4MCT9BNUPRKbz6Wy1OeKEFLYswWW8",
  authDomain: "job-seekers-16fc9.firebaseapp.com",
  databaseURL: "https://job-seekers-16fc9.firebaseio.com",
  projectId: "job-seekers-16fc9",
  storageBucket: "job-seekers-16fc9.appspot.com",
  messagingSenderId: "658056882007"
};
firebase.initializeApp(config);

// global flow
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      userId: 'John Smith'
    }
  }
  render() {
    return (
      <Router>
        <div>
          <MainHeader />
            {this.state.isLoggedIn
              // Routes if the user is logged in
              ? <Switch>
                  <Route exact path='/' render={(routeProps) => {
                    return <Dashboard {...routeProps} userId={this.state.userId} />
                  }} />
                  <Route exact path='/new' component={NewApplication} />
                  <Route exact path='/application/:application_id' render={(routeProps) => {
                      return <SingleApplication {...routeProps} userId={this.state.userId} />
                  }} />
                  {/* If no paths match, display an error message */}
                  <Route render={() => (
                    <div>
                      <h2>404 Not Found</h2>
                      <p>Oops, that page doesn't exist!</p>
                    </div>
                  )} />
                </Switch>
                // Routes if the user is logged out
              : <Switch>
                  <Route exact path='/' component={Home} />
                  {/* If no paths match, display an error message */}
                  <Route render={() => (
                    <div>
                      <h2>404 Not Found</h2>
                      <p>Oops, that page doesn't exist!</p>
                    </div>
                  )} />
                </Switch>
            }
          <MainFooter />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
