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
import SharedDashboard from './components/sharedDashboard';

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
      userId: 'John Smith',
      shareApplications: false,
      shareKey: ''
    }
    this.watchSharing = this.watchSharing.bind(this);
    this.toggleSharing = this.toggleSharing.bind(this);
  }

  componentDidMount() {
    this.watchSharing();  
  }

  watchSharing() {
    const sharingRef = firebase.database().ref(`users/${this.state.userId}/sharing`);
    sharingRef.on('value', (snapshot) => {
      const sharingObject = snapshot.val();
      if (sharingObject != null) {
        // Unwrap the object containing the key, save the key to state
        // Turn on the sharing toggle
        for (let key in sharingObject) {
          this.setState({
            shareApplications: true,
            shareKey: key
          });
        }
      }
      else {
        // Turn off the sharing toggle, clear out old keys
        this.setState({
          shareApplications: false,
          shareKey: ''
        });
      }
    });
  }

  toggleSharing() {
    const sharingRef = firebase.database().ref(`users/${this.state.userId}/sharing`)
    if (this.state.shareApplications) {
      sharingRef.remove();
    } else {
      sharingRef.push('sharing enabled');
    }
  }

  render() {
    return (
      <Router>
        <div>
          <MainHeader shareApplications={this.state.shareApplications} toggleSharing={this.toggleSharing} />

          {this.state.isLoggedIn
            // Routes for logged in users
            ? <Switch>
                <Route exact path='/' render={(routeProps) => {
                  return <Dashboard {...routeProps} userId={this.state.userId} />
                }} />
                <Route exact path='/new' render={(routeProps) => {
                  return <NewApplication {...routeProps} userId={this.state.userId} />
                }} />
                <Route exact path='/application/:application_id' render={(routeProps) => {
                    return <SingleApplication {...routeProps} userId={this.state.userId} />
                }} />
                {/* If no paths match, display an error message */}
                <Route render={() => (
                  <div>
                    <h2>404 Not Found</h2>
                    <p>Oops, that page doesn&apos;t exist!</p>
                  </div>
                )} />
              </Switch>
              // Routes if the user is logged out
            : <Switch>
                {/* If no paths match, display an error message */}
                <Route exact path='/' component={Home} />
                <Route render={() => (
                  <div>
                    <h2>404 Not Found</h2>
                    <p>Oops, that page doesn&apos;t exist!</p>
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
