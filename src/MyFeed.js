import React, {Component} from 'react'
import {Feed, Icon} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from "react-bootstrap/Image";
import {ChatQuote} from "react-bootstrap-icons";
import Gallery from 'react-grid-gallery';


// const source = _.times(100, () => ({
//     name: faker.name.firstName() + " " + faker.name.lastName(),
//     created_at: faker.date.recent(3),
//     message: faker.lorem.text(),
//     image: faker.internet.avatar(),
//     like_count: faker.random.number({ min: 0, max: 55 })
// }))


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
export default class MyFeed extends Component {

    render() {
        const items = [];
        this.props.tweets.forEach(value => {
            const images = [];
            value.images.forEach(imageData => {
                images.push({
                    src: imageData.image,
                    thumbnail: imageData.image,
                    thumbnailWidth: 320,
                    thumbnailHeight: 174,
                    isSelected: false,
                    caption: value.message
                });
            })

            const alertOptions = {
                title: 'Delete tweet',
                message: 'Y\'all sure about that?',
                buttons: [
                    {
                        label: 'Yassss',
                        onClick: () => this.props.handle_delete(value.id)
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
                // willUnmount: () => {},
                // afterClose: () => {},
                // onClickOutside: () => {},
                // onKeypressEscape: () => {}
            };
            items.push(
                <div className="event" key={value.id} id={'tweet-' + value.id}>
                <Image src={value.author_picture} roundedCircle height='50px' width='50px'/>
                <Feed.Content>
                    <Feed.Summary>
                        <a href={"#user-" + value.author} >{value.author_name}</a> posted on their page
                        <Feed.Date> {value.created_at}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {value.message}
                        <br/>
                        {/*TODO: delete that br lol*/}
                        {value.video ? <video width="auto" height="auto" controls>
                            <source src={value.video} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video> : null}
                        {images ? <Gallery images={images} enableImageSelection={false} backdropClosesModal={true} /> : null}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like className={value.liked ? 'liked' : ''}
                                   onClick={() => value.liked ? this.props.handle_dislike(value.id) : this.props.handle_like(value.id)}>
                            <Icon name='like'/>{value.like_count} {value.like_count === 1 ? 'Like' : 'Likes'}
                        </Feed.Like>
                        {this.props.current_user === value.author ?
                            <a href={"#delete-" + value.id} className="delete" onClick={() => confirmAlert(alertOptions)}>
                                <i aria-hidden="true" className="delete icon"></i>Delete
                            </a> : null}
                        <a href={"#retweet-" + value.id} className="comment" onClick={(this.props.handle_reply)}>
                            <i aria-hidden="true" className="retweet icon"></i>Retweet
                        </a>
                        <a href={"#reply-" + value.id} className="comment" onClick={(this.props.handle_reply)}>
                            <ChatQuote/> Reply
                        </a>
                    </Feed.Meta>
                </Feed.Content>
            </div>)
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