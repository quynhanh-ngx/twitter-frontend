import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const MyTextArea = () =>(
<Form id="tweetbox">
    <Form.Group  controlId="exampleForm.ControlTextarea1">
        {/*<Form.Label>Example textarea</Form.Label>*/}
        <Form.Control  as="textarea" rows="3" placeholder = "Whassup???"/>
    </Form.Group>
    <Button variant="outline-warning" id="tweetbox-submit">Submit</Button>{' '}
</Form>
)
export default MyTextArea