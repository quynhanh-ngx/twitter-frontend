import React, {createRef} from 'react';
import logo from './logo.svg';
import {Button, Header, Ref, Sticky} from "semantic-ui-react";
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

                <div className="row">
                    <div className="four wide column"><Header as='h1' color='blue'>Twiiter</Header></div>
                    <div className="eight wide column">Home</div>
                    <div className="four wide column">
                        <Sticky context= {contextRef}>
                        <MySearch/>
                        </Sticky>
                    </div>
                </div>
                <div className="row">
                    <div className="four wide column">
                        <Sticky context={contextRef}>
                        <MySidebar/>
                    </Sticky>
                    </div>
                    <div className="eight wide column right aligned">
                        <div className="row"><MyTweetbox/></div>
                        <div className="row">
                            <Button className="no-margin" inverted color='teal'>
                                Submit
                            </Button>
                        </div>
                        <div className="row"><MyFeed/></div>
                    </div>
                    <div className="four wide column"><MyNews/></div>
                </div>
            </div>
            </Ref>
        </div>
    );
}

export default App;
