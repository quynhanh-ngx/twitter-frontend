import React, {createRef} from 'react';
import logo from './logo.svg';
import {Button, Header, Icon, Ref, Sticky} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MySidebar from "./MySidebar";
import MySearch from "./MySearch";
import MyFeed from "./MyFeed";
import MyTweetbox from "./MyTweetbox";
import MyNews from "./MyNews";

let contextRef = createRef()

function App() {
    return (
        <div className="App">
            <Ref innerRef={contextRef}>
            <div className="ui stackable three column grid">

                <div className="row grid-center-top">
                    <div className="four wide column grid-logo"><Header as='h1' color='white'>
                        <Icon name = 'paw' size= 'huge'/>Twitter
                    </Header></div>
                    <div className="eight wide column grid-title">Home</div>
                    <div className="four wide column">
                        <Sticky context= {contextRef}>
                        <MySearch/>
                        </Sticky>
                    </div>
                </div>
                <div className="row grid-center-bottom">
                    <div className="four wide column">
                        <Sticky context={contextRef}>
                        <MySidebar/>
                        </Sticky>
                    </div>
                    <div className="eight wide column right aligned grid-center">
                        <div className="row grid-tweetbox-area"><MyTweetbox/></div>
                        <div className="row grid-submit-area">
                            <Button className="no-margin" inverted color='yellow'>
                                Submit
                            </Button>
                        </div>
                        <div className="row"><MyFeed/></div>
                    </div>
                    <div className="four wide column">
                        <Sticky context={contextRef}>
                            <MyNews/>
                        </Sticky>
                        </div>
                </div>
            </div>
            </Ref>
        </div>
    );
}

export default App;
