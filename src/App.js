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

function Cloud(props) {
    var speedClass;
    var sizeClass;
    var delayClass;

    switch(props.speed){
        case 2:
            speedClass = "fast";
            break;
        case 1:
            speedClass = "medium";
            break;
        default:
            speedClass = "slow";
            break;
    }

    switch (props.size) {
        case 2:
            sizeClass = "is-large";
            break;
        case 1:
            sizeClass = "is-medium";
            break;
        default:
            sizeClass = "is-small";
            break;
    }

    delayClass = "delay-" + Math.min(props.delay, 6);
    let cloudClasses = [speedClass, sizeClass, delayClass];

    return <div className={'cloud ' + cloudClasses.join(" ").trimRight()} ><span className="shadow"></span></div>;
}

class App extends React.Component {
    render() {
        const cloudCount = 20;
        let clouds = [];
        for (let i = 0; i < cloudCount; i++) {
            let speed = Math.floor(Math.random() * 3);
            let size = Math.floor(Math.random() * 3);
            let delay = Math.floor(Math.random() * 7);
            clouds.push(<Cloud speed={speed} size={size} delay={delay}/>);
        }
        return (
            <div className="App">
                <MyNavbar/>
                <div className="container">
                    <div id="feed-wrapper">
                        <MyTextArea/>
                        <div className="sticky-top clouds">
                            { clouds }
                            {/*<div className='cloud is-large slow'><span className="shadow"></span></div>*/}
                            {/*<div className='cloud is-medium medium delay'><span className="shadow"></span></div>*/}
                            {/*<div className='cloud is-large slow delay'><span className="shadow"></span></div>*/}
                            {/*<div className='cloud is-medium medium'><span className="shadow"></span></div>*/}
                            {/*<div className='cloud is-small fast'><span className="shadow"></span></div>*/}
                        </div>
                        <MyFeed/>
                    </div>
                    {/*<MyListGroup/>*/}
                </div>
            </div>
        );
    }
}

export default App;
