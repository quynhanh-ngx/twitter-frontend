import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const MyNews = () => (
    <div className="MyNews">
        <div className="ui vertical menu fluid">
            <a className="item">
                <h4 className="ui header">News</h4>
                <p>COVID-19: Updates for the US</p>
            </a>
            <a className="item">
                <h4 className="ui header">Trending</h4>
                <p>Check out our collection of coupons</p>
            </a>
            <a className="item">
                <h4 className="ui header">Fun</h4>
                <p>#JusticeforToyin</p>
            </a>
        </div>
    </div>
        )
export default MyNews;
