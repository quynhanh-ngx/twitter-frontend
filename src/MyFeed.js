import _ from 'lodash'
import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import faker from "faker";

const source = _.times(100, () => ({
    name: faker.name.firstName() + " " + faker.name.lastName(),
    date: faker.date.recent(3),
    text: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    likes: faker.random.number({ min: 0, max: 55 })
}))

export default class MyFeed extends Component {

    render() {
        const items = [];

        for (const [index, value] of source.entries()) {
            items.push(<Feed.Event>
                <Feed.Label image={value.image}/>
                <Feed.Content>
                    <Feed.Summary>
                        <a>{ value.name }</a> posted on his page
                        <Feed.Date> {value.date.toDateString()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {value.text}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name='like'/>{value.likes} Likes
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>)
        }

        return (
            <Feed>
                { items }
            </Feed>
        )
    }
}
