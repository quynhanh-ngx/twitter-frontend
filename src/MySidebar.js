import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const MySidebar = () => (
    <div className="MySideBar">
    <div className="ui vertical menu fluid">
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon name = 'home' size= 'large'/>
                Home
                    </div>
                </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon name = 'hashtag' size= 'large' />
                    Explore
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon  name = 'bell outline' size= 'large' />
                    Notifications
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon  name = 'mail outline' size= 'large' />
                    Messages
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon name = 'bookmark outline' size= 'large' />
                    Bookmarks
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon  name = 'list ul' size= 'large' />
                    Lists
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon  name = 'user outline' size= 'large' />
                    Profile
                </div>
            </h4>
        </a>
        <a className="item">
            <h4 className="ui header">
                <div>
                    <Icon name = 'ellipsis horizontal' size= 'large' />
                    More
                </div>
            </h4>
        </a>
    </div>
    </div>
)

export default MySidebar


