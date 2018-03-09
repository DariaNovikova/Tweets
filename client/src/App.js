import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTweets } from './Actions.js';
import CircularProgress from 'material-ui/CircularProgress';

import Tweet from './Tweet.js';
import './App.css';

function Tweets(props) {
  if (!props.tweets)
    return '';

  return props.tweets.map(tweet => {
    return <div className={props.className} key={`${props.className}${tweet.tweetId}`}>
      <Tweet data={tweet} />
    </div>
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.searchInput = '';

  }

  formSubmit(event) {
    event.preventDefault();
    this.props.searchTweets(this.state.searchText);
  }

  inputChange() {
    this.setState({ searchText: this.searchInput.value });
  }

  render() {


    return (
      <div className="app">
        <div className="search">
          <form className="search__container" onSubmit={this.formSubmit}>
            <input type="text" className="search__input" ref={input => this.searchInput = input} onChange={this.inputChange} />
            <button className="search__button" onClick={() => this.props.searchTweets(this.state.searchText)}>SEARCH</button>
          </form>
        </div>
        {this.props.load ?
          <div className="loader">
            <CircularProgress size={200} thickness={7} />
          </div>
          :
          <div className="content">
            <div className="timeline">
              <Tweets tweets={this.props.tweets} className="timeline__container" />
            </div>
            <div className="grid">
              <Tweets tweets={this.props.tweets} className="grid__container" />
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    load: state.load
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchTweets: bindActionCreators(searchTweets, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
