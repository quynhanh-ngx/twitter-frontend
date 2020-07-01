import React, {Component} from 'react'
import {Feed, Icon} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from "react-bootstrap/Image";
import {ChatQuote} from "react-bootstrap-icons";
import Gallery from 'react-grid-gallery';
import ReplyModal from "./ReplyModal";
import {MyTweet} from "./MyTweet";


// const source = _.times(100, () => ({
//     name: faker.name.firstName() + " " + faker.name.lastName(),
//     created_at: faker.date.recent(3),
//     message: faker.lorem.text(),
//     image: faker.internet.avatar(),
//     like_count: faker.random.number({ min: 0, max: 55 })
// }))



export default class MyFeed extends Component {

    render() {
        const items = [];
        this.props.tweets.forEach(value => {
            items.push(<MyTweet tweetData={value}
                                handle_like = {this.props.handle_like}
                                handle_dislike = {this.props.handle_dislike}
                                handle_delete = {this.props.handle_delete}
                                current_user = {this.props.current_user}
                                getTweets = {this.props.getTweets}
            />)
        });

        return (
            <Feed>
                {items}
            </Feed>
        )
    }
}

MyFeed.propTypes = {
    tweets: PropTypes.array,
    handle_like: PropTypes.func,
    handle_dislike: PropTypes.func
};