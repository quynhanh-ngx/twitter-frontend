import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyFeed from "./MyFeed";
import MyNavbar from "./MyNavbar";
import MyTextArea from "./MyTextArea";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import axios from "axios";


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

const API_ENDPOINT = 'http://localhost:8000/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: '',
            tweets: []
        };
    }

    componentDidMount() {
        this.resetState();
        if (this.state.logged_in) {
            fetch(API_ENDPOINT + '/current-user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({ username: json.username });
                });
        }
    }

    resetState = () =>{
        this.getTweets();
    };

    getTweets = () => {
        axios.get(API_ENDPOINT + '/tweet', {headers : {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }}).then(res => this.setState({tweets : res.data}));
       
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch(API_ENDPOINT + '/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username
                });
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch(API_ENDPOINT + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {

        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup} />;
                break;
            default:
                form = null;
        }

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
                <MyNavbar
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                <div className="container">
                    {this.state.logged_in
                        ? `Hello, ${this.state.username}`
                        : 'Please Log In'}
                    {form}
                    <div id="feed-wrapper">
                        {this.state.logged_in ? <MyTextArea/> : null}
                        <div className="sticky-top clouds">
                            { clouds }
                        </div>
                        <MyFeed
                            tweets= {this.state.tweets}
                        />
                    </div>
                    {/*<MyListGroup/>*/}
                </div>
            </div>
        );
    }
}

export default App;
