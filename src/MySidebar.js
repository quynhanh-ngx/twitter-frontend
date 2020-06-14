import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const MySidebar = () => (
    <div className="ui vertical menu fluid">
        <a className="item">
            <h4 className="ui header">Promotions</h4>
            <p>Check out our new promotions</p>
        </a>
        <a className="item">
            <h4 className="ui header">Coupons</h4>
            <p>Check out our collection of coupons</p>
        </a>
        <a className="item">
            <h4 className="ui header">Rebates</h4>
            <p>Visit our rebate forum for information on claiming rebates</p>
        </a>
    </div>
)

export default MySidebar
