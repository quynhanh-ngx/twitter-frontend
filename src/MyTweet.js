import Image from "react-bootstrap/Image";
import {Dropdown, Feed, Icon, Menu} from "semantic-ui-react";
import Gallery from "react-grid-gallery";
import {confirmAlert} from "react-confirm-alert";
import ReplyModal from "./ReplyModal";
import React, {Component} from "react";
import PropTypes from "prop-types";

class AlertOptionCustomUI extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }
    render() {
        return <div className='react-confirm-alert-body'>
            {this.props.title && <h1>{this.props.title}</h1>}
            {this.props.message}
            <div className='react-confirm-alert-button-group'>
                {this.props.buttons.map((button, i) => (
                    <button key={i} onClick={() => {
                        button.onClick();
                        this.props.onClose();
                    }} className={button.className}>
                        {button.label}
                    </button>
                ))}
            </div>
        </div>;
    }
}

AlertOptionCustomUI.propTypes = {
    title: PropTypes.any,
    message: PropTypes.any,
    buttons: PropTypes.any,
    onClick: PropTypes.func
};


export class MyTweet extends React.Component {
    render() {
        const images = [];
        this.props.tweetData.images.forEach(imageData => {
            images.push({
                src: imageData.image,
                thumbnail: imageData.image,
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                isSelected: false,
                caption: this.props.tweetData.message
            });
        })

        const alertOptions = {
            title: 'Delete tweet',
            message: 'Y\'all sure about that?',
            buttons: [
                {
                    label: 'Yassss',
                    onClick: () => this.props.handle_delete(this.props.tweetData.id)
                },
                {
                    label: 'Nahhh',
                    onClick: () => {
                    }
                }
            ],
            childrenElement: () => <div/>,
            customUI: ({ title, message, buttons, onClose }) => {
                return (
                    <AlertOptionCustomUI title={title} message={message}
                                         buttons={buttons} onClose={onClose}/>
                );
            },
            closeOnEscape: true,
            closeOnClickOutside: true,

        };

        const options = [
            { key: 1, text: 'Retweet', value: 1, onClick: () =>
                    (this.props.handle_retweet(this.props.tweetData.id)) },
            { key: 2, text: this.props.excludeReplyButton ? null : <ReplyModal
                        handle_like = {this.props.handle_like}
                        handle_dislike = {this.props.handle_dislike}
                        handle_delete = {this.props.handle_delete}
                        replyingTo={this.props.tweetData}
                        isRetweet = {true}
                        getTweets={this.props.getTweets}/>
                , value: 2 },
        ]
        return <div className="event" key={this.props.tweetData.id} id={'tweet-' + this.props.tweetData.id}>
            <Image src={this.props.tweetData.author_picture} roundedCircle height='50px' width='50px'/>
            <Feed.Content>
                <Feed.Summary>
                    <a href={"#user-" + this.props.tweetData.author} >{this.props.tweetData.author_name}</a> posted on their page
                    <Feed.Date> {this.props.tweetData.created_at}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {this.props.tweetData.replying_to ?
                        <p>Replying to @{this.props.tweetData.replying_to}</p> : null}
                    {this.props.tweetData.message}
                    <br/>
                    {/*TODO: delete that br lol*/}
                    {this.props.tweetData.video ? <video width="auto" height="auto" controls>
                        <source src={this.props.tweetData.video} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video> : null}
                    {images ? <Gallery images={images} enableImageSelection={false} backdropClosesModal={true} /> : null}
                </Feed.Extra>
                <Feed.Meta>
                    {this.props.handle_like ? <Feed.Like className={this.props.tweetData.liked ? 'liked' : ''}
                               onClick={() => this.props.tweetData.liked ? this.props.handle_dislike(this.props.tweetData.id) : this.props.handle_like(this.props.tweetData.id)}>
                        <Icon name='like'/>{this.props.tweetData.like_count} {this.props.tweetData.like_count === 1 ? 'Like' : 'Likes'}
                    </Feed.Like> : null}
                    {this.props.handle_delete && this.props.current_user === this.props.tweetData.author ?
                        <a href={"#delete-" + this.props.tweetData.id} className="delete" onClick={() => confirmAlert(alertOptions)}>
                            <i aria-hidden="true" className="delete icon"></i>Delete
                        </a> : null}
                    {this.props.handle_retweet ? <a href={"#retweet-" + this.props.tweetData.id} className="comment"
                                                    onClick={() =>
                                                        (this.props.handle_retweet(this.props.tweetData.id))}>
                    <Menu compact>
                        <Dropdown inline trigger={ <span><i aria-hidden="true" className="retweet icon"></i> Retweet</span>} options={options}/>
                    </Menu>
                    </a> : null}
                    {this.props.excludeReplyButton ? null : <ReplyModal
                        handle_like = {this.props.handle_like}
                        handle_dislike = {this.props.handle_dislike}
                        handle_delete = {this.props.handle_delete}
                        replyingTo={this.props.tweetData}
                        getTweets={this.props.getTweets}/>
                    }
                </Feed.Meta>
            </Feed.Content>
        </div>;
    }
}
