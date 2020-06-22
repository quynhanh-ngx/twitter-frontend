import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class MyTextArea extends React.Component {
    render() {
        return (
            <Form id="tweetbox" onSubmit={(e) => {
                this.props.handle_tweet(e.target.elements[0].value);
                e.target.elements[0].value="";
            }}>
                <Form.Group controlId="exampleForm.ControlTextarea1" name='tweetbox_text'>
                    {/*<Form.Label>Example textarea</Form.Label>*/}
                    <Form.Control as="textarea" rows="3" placeholder="Whassup???"/>
                </Form.Group>
                <Button variant="outline-warning" id="tweetbox-submit" type={"submit"}>Submit</Button>{' '}
            </Form>
        );
    }
}

export default MyTextArea
