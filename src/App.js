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
            <div className="ui stackable three column grid">
                <div className="row">
                    <div className="four wide column"><Header as='h1' color='blue'>Twiiter</Header></div>
                    <div className="eight wide column">Home</div>
                    <div className="four wide column"><MySearch/></div>
                </div>
                <div className="row">
                    <div className="four wide column"><MySidebar/></div>
                    <div className="eight wide column">
                        <div className="row"><MyTweetbox/></div>
                        <div className="row">
                            <Button inverted color='blue'>
                                Submit
                            </Button>
                        </div>
                        <div className="row"><MyFeed/></div>
                    </div>
                    <div className="four wide column">News</div>
                </div>
            </div>

        </div>
    );
}

export default App;
