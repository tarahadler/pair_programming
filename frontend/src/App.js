import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';


//STATE
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  e.preventDefault();
  let twitterHandle = {
    username: username
  }
  
  axios.post('http://localhost:8080/username', twitterHandle)
       .then(results => {
         this.setState({
          verifiedStatus: results.data.user.verified,
          followersTotal: results.data.user.followers_count, 
          followingTotal: results.data.user.friends_count,
          tweetTotal: results.data.user.statuses_count,
          retweetArr: results.data.retweet_count, 
          retweetTotal: results.data.total_retweets,
          favArr: results.data.favorite_count,
          favTotal: results.data.total_favs,
          username: this.refs.twitterHandle.value
         });
       })
       .catch(error => {
         console.log(error);
       }) 
}







  render() {
    return (
      <div className="App">
        <h1>Twitter Dashboard</h1>
        <form>
          <input type="text" ref="twitterHandle" placeholder="Enter a valid Twitter handle." required />  
          <button onClick={(e) => this.onSubmit(e, this.refs.twitterHandle.value) }> 
              Submit name 
          </button> 
        </form>
        <Route 
          path='/dashboard' 
          render={()=> <Dashboard 
            verifiedStatus={this.state.verifiedStatus}
            followersTotal={this.state.followersTotal} 
            followingTotal={this.state.followingTotal}
            tweetTotal={this.state.tweetTotal} 
            retweetArr={this.state.retweetArr}
            retweetTotal={this.state.retweetTotal}
            favArr={this.state.favArr}
            favTotal={this.state.favTotal}
            username={this.state.username}
            />} 
          />
    
      </div>
    );
  }
}

export default App;
