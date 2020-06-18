import React, {createRef} from 'react';
import logo from './logo.svg';
import { Header, Icon, Ref, Sticky} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MySidebar from "./MySidebar";
import MySearch from "./MySearch";
import MyFeed from "./MyFeed";
import MyTweetbox from "./MyTweetbox";
import MyNews from "./MyNews";
import MyNavbar from "./MyNavbar";
import MyListGroup from "./MyListGroup";
import MyTextArea from "./MyTextArea";
import Button from "react-bootstrap/Button";

let contextRef = createRef()

function App() {
    return (
        <div className="App">
            <MyNavbar/>
            <div className="container">
                <MyTextArea/>

                <MyFeed/>
                <MyListGroup/>
            </div>
        </div>
    );
}

export default App;
