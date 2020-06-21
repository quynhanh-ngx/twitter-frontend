import _ from 'lodash'
import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import faker from "faker";
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";

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
            items.push(<Feed.Event id={'tweet-' + value.id}>
                <Feed.Label image={value.author_picture}/>
                <Feed.Content>
                    <Feed.Summary>
                        <a>{ value.author_name }</a> posted on their page
                        <Feed.Date> {value.created_at}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {value.message}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like onClick={(e) => this.props.handle_like(value.id)}>
                            <Icon name='like'/>{value.like_count} {value.like_count === 1 ? 'Like' : 'Likes'}
                        </Feed.Like>
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
    tweets: PropTypes.array
};