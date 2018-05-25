import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';

class App extends Component {

  constructor(props) {
    super(props);

    /* our state */
    this.state = {

      // show or hide dashboard
      dashboard: 'hidden',

      //Data received from Twitter API
      verifiedStatus: false,
      followersTotal: 0, 
      followingTotal: 0,
      tweetTotal: 0,
      retweetArr: [], 
      retweetTotal: 0,
      favArr: [],
      favTotal: 0,

      //Data sent to server
      username: ''

    }
  };


  onSubmit = (e, username) => {

    // Prevent default behaviour
    e.preventDefault();

    // create an object to send to server
    let twitterHandle = {
      username: username
    }
    
    // make post request to our server
    axios.post('http://localhost:8080/username', twitterHandle)

      .then(results => {

        // when we have results back save them to state
        this.setState({
          verifiedStatus: results.data.user.verified,
          followersTotal: results.data.user.followers_count, 
          followingTotal: results.data.user.friends_count,
          tweetTotal: results.data.user.statuses_count,
          retweetArr: results.data.retweet_count, 
          retweetTotal: results.data.total_retweets,
          favArr: results.data.favorite_count,
          favTotal: results.data.total_favs,
          username: this.refs.twitterHandle.value,
          dashboard: 'visible'
        });

      })
      .catch(error => {
        console.log(error);
      }) 
  }

  render() {

      // Put a empty state message on screen if no user name is in state
      let emptyStateMessage = ''
      if (this.state.username === '') {
        emptyStateMessage = 'Try entering a twitter handle above.'
      }

      return (
        <div className="App">

          <div className="wrapper">
            
            {/* Top section */}
            <section className="form">
              <img src="/graph_animated.svg" className="logo" />
              <h1 className="site-title">
                Twitter Sitter
              </h1>
              <form>
                  <span>@</span>
                  <input type="text" ref="twitterHandle" className="input" placeholder="Enter a valid Twitter handle." required />  
                  <button className="btn" onClick={(e) => this.onSubmit(e, this.refs.twitterHandle.value) }> 
                    <i className="fas fa-arrow-circle-right"></i>
                  </button> 
              </form>
            </section>

            {/* Message if dashboard not in view */}
            <section className="empty-message">
              { emptyStateMessage }
            </section>

            {/* Dashboard section */}
            <div className={'dashboard ' + this.state.dashboard }>
            <Dashboard verifiedStatus={this.state.verifiedStatus} 
                        followersTotal={this.state.followersTotal} 
                        followingTotal={this.state.followingTotal} 
                        tweetTotal={this.state.tweetTotal} 
                        retweetArr={this.state.retweetArr} 
                        retweetTotal={this.state.retweetTotal} 
                        favArr={this.state.favArr} 
                        favTotal={this.state.favTotal} 
                        username={this.state.username} />
              </div>

          </div>

        </div>
      );
    }
}

export default App;
