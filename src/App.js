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
            tweets: [],
            pictures: [],
            picturePreviews: [],
            video: null,
            videoPreview: null
        };
        this.onDrop = this.onDrop.bind(this);
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

    // TODO: Pagination
    getTweets = () => {
        console.log('Fetching tweets');
        axios.get(API_ENDPOINT + '/tweet', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => this.setState({tweets: res.data.results}));

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
            let tweets = this.state.tweets;
            let tweet = tweets[likedTweetIndex];
            tweet.liked = true;
            tweet.like_count++;
            this.setState({tweets: tweets});
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
            let tweets = this.state.tweets;
            let tweet = tweets[likedTweetIndex];
            tweet.liked = false;
            tweet.like_count--;
            this.setState({tweets: tweets});
        }
    }

    // Add files to state
    handle_files = (files) => {
        const ALLOWED_VIDEO_TYPES = ['video/mp4'];
        const pictures = [];
        const errors = [];
        let video = null;
        let displayedAlertMessage = false;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.type.startsWith('image')){
                pictures.push(file);
            } else if(file.type.startsWith('video') ) {
                if(!ALLOWED_VIDEO_TYPES.includes(file.type)) {
                    errors.push(`Video type "${file.type}" is unsupported`);
                    continue
                }
                if (video != null && !displayedAlertMessage) {
                    errors.push("Only ONE video is allowed");
                    displayedAlertMessage = true;
                }
                video = file;
            } else {
                errors.push('Unsupported file type!!!!!!!!!!')
            }
        }
        if (errors.length !== 0) alert(errors.join(' \n '));



        /* Map each file to a promise that resolves to an array of image URI's */
        Promise.all(pictures.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
            .then(images => {
                console.log(images);
                const imageToImagePreview = (image) => {
                    return {
                        src: image,
                        thumbnail: image,
                        thumbnailWidth: 100,
                        thumbnailHeight: 100,
                        isSelected: false,
                        customOverlay: <div>
                           <button> delete </button>
                        </div>
                    }
                }
                /* Once all promises are resolved, update state with image URI array */
                this.setState({picturePreviews: images.map(imageToImagePreview)})

            }
            , error => {
                console.error(error);
            })
        this.setState({pictures: pictures, video: video, videoPreview: video ? window.URL.createObjectURL(video): null});

    }

    handle_tweetbox_picture_preview_click = (index, event) => {
        var pictures = this.state.pictures.slice();
        var picturePreviews = this.state.picturePreviews.slice();
        pictures.splice(index, 1);
        picturePreviews.splice(index, 1);
        this.setState({
            pictures: pictures,
            picturePreviews: picturePreviews
        });
    }


    // Allow author to post tweets
    handle_tweet = (e, message) => {
        e.preventDefault();
        const video = this.state.video;
        const images = this.state.pictures;
        var myHeaders = new Headers();
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);


        var formData = new FormData();
        formData.append("message", message);
        if (video != null) {
            // console.log("video is not null")
            formData.append("video", video);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append('image_' + i,  images[i]);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        fetch(API_ENDPOINT + "/tweet/", requestOptions)
            .then(response => response.text())
            .then(() => this.resetState())
            .then(() => {window.URL.revokeObjectURL(this.state.videoPreview)})
            .then(() => this.setState({video: null, pictures: [], videoPreview: null, picturePreviews: []}))
            .catch(error => console.log('error', error));
    }

    handle_delete = (tweetId) => {
        axios.delete(API_ENDPOINT + '/tweet/' + tweetId + '/',
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }).then(() => this.resetState())
    }

    handle_reply = (tweetId) => {
        axios.get(API_ENDPOINT + '/tweet/',
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

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }


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

        const cloudCount = 1;
        let clouds = [];
        for (let i = 0; i < cloudCount; i++) {
            let speed = Math.floor(Math.random() * 3);
            let size = Math.floor(Math.random() * 3);
            let delay = Math.floor(Math.random() * 7);
            clouds.push(<Cloud speed={speed} key={i} size={size} delay={delay}/>);
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
                                <MyTextArea
                                    handle_tweet={this.handle_tweet}
                                    handle_files ={this.handle_files}
                                    handle_tweetbox_picture_preview_click = {this.handle_tweetbox_picture_preview_click}
                                    picturePreviews = {this.state.picturePreviews}
                                    pictures = {this.state.pictures}
                                    video = {this.state.video}
                                    videoPreview = {this.state.videoPreview}
                                    key = {1}
                                />,
                                <div className="sticky-top clouds" key = {2}>{clouds}</div>,
                                <MyFeed
                                    tweets={this.state.tweets}
                                    handle_like = {this.handle_like}
                                    handle_dislike = {this.handle_dislike}
                                    handle_delete = {this.handle_delete}
                                    current_user = {this.state.username}
                                    handle_reply = {this.handle_reply}
                                    key = {3}
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
