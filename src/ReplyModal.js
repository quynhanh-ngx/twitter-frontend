import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {ChatQuote} from "react-bootstrap-icons";
import MyTextArea from "./MyTextArea";
import {MyTweet} from "./MyTweet";

class ReplyModal extends React.Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return (
            <Modal trigger={this.props.isRetweet ? <span onClick={this.handleOpen}>Retweet with a comment</span> :
                <a href='#' onClick={this.handleOpen} className="comment"><ChatQuote/> Reply</a>}
                   open={this.state.modalOpen}
                   onClose={this.handleClose}
                   centered={false}
            >
                <Modal.Header>{this.props.isRetweet ? "Retweet with a comment" : "Reply" }</Modal.Header>
                <Modal.Content image>
                    <MyTweet tweetData={this.props.replyingTo}
                             handle_like = {this.props.handle_like}
                             handle_dislike = {this.props.handle_dislike}
                             handle_delete = {this.props.handle_delete}
                             handle_retweet = {this.props.handle_retweet}
                             handle_undo_retweet ={this.props.handle_undo_retweet}
                             current_user = {this.props.current_user}
                             isRetweet = {this.props.isRetweet}
                             excludeReplyButton = {true}
                    />
                    {/* TODO : Remove "br" thing later */}
                    <br/>
                    <MyTextArea
                        replyingTo={this.props.replyingTo}
                        getTweets = {this.props.getTweets}
                        onTweetSubmit={this.handleClose}
                        isRetweet = {this.props.isRetweet}
                    />
                    {/*<Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png'/>*/}
                    {/*<Modal.Description>*/}
                    {/*    <Header>Default Profile Image</Header>*/}
                    {/*    <p>*/}
                    {/*        We've found the following gravatar image associated with your e-mail*/}
                    {/*        address.*/}
                    {/*    </p>*/}
                    {/*    <p>Is it okay to use this photo?</p>*/}
                    {/*</Modal.Description>*/}
                </Modal.Content>
            </Modal>
        );
    }
}

export default ReplyModal