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
        console.log(this.props.tweets)

        this.props.tweets.forEach(value => {
            items.push(<Feed.Event>
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
                        <Feed.Like>
                            <Icon name='like'/>{value.like_count} Likes
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