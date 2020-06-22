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

    switch (props.speed) {
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

    return <div className={'cloud ' + cloudClasses.join(" ").trimRight()}><span className="shadow"></span></div>;
}

const API_ENDPOINT = 'http://localhost:8000/api';


// TODO: implement refresh tokens
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
    }

    resetState = () => {
        console.log('Checking if user is logged in');
        if (this.state.logged_in) {
            console.log('They are, fetching user name');
            fetch(API_ENDPOINT + '/current-user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({username: json.username});
                });
            console.log('Calling get tweets function');
            this.getTweets();
        }
        else{
            console.log("They aren't logged in");
        }
    };

    getTweets = () => {
        console.log('Fetching tweets');
        axios.get(API_ENDPOINT + '/tweet', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => this.setState({tweets: res.data}));

    }

    handle_login = (e, data) => {
        console.log('Logging in');
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
            })
            .then(() => this.resetState());
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
        this.setState({logged_in: false, username: ''});
    };

    handle_like = (tweetId) => {
        axios.post(API_ENDPOINT + '/like/', {tweet : tweetId},
        {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        let likedTweetIndex = -1;
        // Search for Tweet being liked
        for (let i = 0; i < this.state.tweets.length; i++) {
            let tweet = this.state.tweets[i];
            if(tweetId===tweet.id){
                likedTweetIndex = i;
                break;
            }
        }
        // If found, set liked status to true
        if (likedTweetIndex !== -1){
            this.state.tweets[likedTweetIndex].liked = true;
            this.state.tweets[likedTweetIndex].like_count++;
            this.setState({tweets: this.state.tweets});
        }
    }

    handle_dislike = (tweetId) => {
        axios.delete(API_ENDPOINT + '/like/' + tweetId + '/',
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
        let likedTweetIndex = -1;
        // Search for Tweet being liked
        for (let i = 0; i < this.state.tweets.length; i++) {
            let tweet = this.state.tweets[i];
            if(tweetId===tweet.id){
                likedTweetIndex = i;
                break;
            }
        }
        // If found, set liked status to true
        if (likedTweetIndex !== -1){
            this.state.tweets[likedTweetIndex].liked = false;
            this.state.tweets[likedTweetIndex].like_count--;
            this.setState({tweets: this.state.tweets});
        }
    }

    // Allow author to post tweets
    handle_tweet = (data) => {
        axios.post(API_ENDPOINT + '/tweet/', {message: data},
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(() => this.resetState())
    }


    handle_delete = (tweetId) => {
        axios.delete(API_ENDPOINT + '/tweet/' + tweetId + '/',
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }).then(() => this.resetState())
    }

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {

        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup}/>;
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
                        {this.state.logged_in ?
                            [
                                <MyTextArea handle_tweet={this.handle_tweet}/>,
                                <div className="sticky-top clouds">{clouds}</div>,
                                <MyFeed
                                    tweets={this.state.tweets}
                                    handle_like = {this.handle_like}
                                    handle_dislike = {this.handle_dislike}
                                    handle_delete = {this.handle_delete}
                                    current_user = {this.state.username}
                                />
                            ] : null}

                    </div>
                    {/*<MyListGroup/>*/}
                </div>
            </div>
        );
    }
}

export default App;
