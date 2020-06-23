import _ from 'lodash'
import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import faker from "faker";
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from "react-bootstrap/Image";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                        onClick: () => {}
                    }
                ],
                childrenElement: () => <div />,
                // customUI: ({ onClose }) => <div>Custom UI</div>,
                closeOnEscape: true,
                closeOnClickOutside: true,
                // willUnmount: () => {},
                // afterClose: () => {},
                // onClickOutside: () => {},
                // onKeypressEscape: () => {}
            };
            items.push(<Feed.Event id={'tweet-' + value.id}>
                <Image src={value.author_picture} roundedCircle height='50px' width='50px' />
                <Feed.Content>
                    <Feed.Summary>
                        <a>{ value.author_name }</a> posted on their page
                        <Feed.Date> {value.created_at}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {value.message}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like className={value.liked ? 'liked' : ''} onClick={() => value.liked ? this.props.handle_dislike(value.id) : this.props.handle_like(value.id)}>
                            <Icon name='like'/>{value.like_count} {value.like_count === 1 ? 'Like' : 'Likes'}
                        </Feed.Like>
                        {this.props.current_user === value.author ? <a className="delete" onClick={() => confirmAlert(alertOptions)}>
                            <i aria-hidden="true" className="delete icon"></i>Delete
                        </a> : null}
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>)
        });

        return (
            <Feed>
                { items }
            </Feed>
        )
    }
}

MyFeed.propTypes = {
    tweets: PropTypes.array,
    handle_like: PropTypes.func,
    handle_dislike: PropTypes.func
};