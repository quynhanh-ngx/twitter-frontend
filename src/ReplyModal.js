import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {ChatQuote} from "react-bootstrap-icons";
import MyTextArea from "./MyTextArea";

class ReplyModal extends React.Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return (
            <Modal trigger={<a href='#' onClick={this.handleOpen}className="comment"><ChatQuote/> Reply</a>}
                   open={this.state.modalOpen}
                   onClose={this.handleClose}
                   centered={false}
            >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <MyTextArea replyingTo={this.props.replyingTo} getTweets = {this.props.getTweets} onTweetSubmit={this.handleClose} />
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