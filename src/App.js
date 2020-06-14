import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Header} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import MySidebar from "./MySidebar";
import MySearch from "./MySearch";
import MyFeed from "./MyFeed";
import MyTweetbox from "./MyTweetbox";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <div className="logo">
            <Header as='h1' color = 'blue'>Twiiter</Header>
        </div>
        <div className="tweetbox">
          <MyTweetbox/>
        </div>
        <div className="news">Yoooooo</div>
        <div className="search"><MySearch/></div>
        <div className="messages"><MyFeed/></div>
    <div className="sidebar"><MySidebar/>
        </div>
        <div className="submit-area">
          <div className="submit-box">
              <Button inverted color='blue'>
                  Submit
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
