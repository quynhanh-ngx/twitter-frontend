import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {EmojiSunglasses, Images} from "react-bootstrap-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Gallery from "react-grid-gallery";



class MyTextArea extends React.Component {

    render() {
        const controlId = "tweetBox.ControlTextarea1";
        const onEmojiClick = (event, emojiObject) => {
            document.getElementById(controlId).value += emojiObject.emoji;
        }

        const videoElements = [];
        for (const videoKey in this.props.videos) {
            videoElements.push(<p>{this.props.videos[videoKey].name}</p>);
        }



        return (
            <Form id="tweetbox" onSubmit={(e) => {
                console.log(e.target.elements);
                this.props.handle_tweet(e.target.elements[0].value);
                e.target.elements[0].value = "";
            }}>
                <Form.Group controlId={controlId} name='tweetbox_text'>
                    {/*<Form.Label>Example textarea</Form.Label>*/}
                    <Form.Control as="textarea" rows="3" placeholder="Whassup???"/>
                    {this.props.picturePreviews ? <Gallery images={this.props.picturePreviews}
                                                           enableImageSelection={false}
                                                           onClickThumbnail={this.props.handle_tweetbox_preview_click}
                    /> : null}
                    {videoElements}
                    <ButtonToolbar className='float-right' aria-label="Toolbar with button groups">
                        <ButtonGroup className="mr-2" aria-label="First group">
                            <DropdownButton as={ButtonGroup} title={<EmojiSunglasses/>} id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1">
                                    <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} skinTone={SKIN_TONE_MEDIUM_DARK} groupNames={{smileys_people:"PEOPLE"}}/>
                                </Dropdown.Item>
                            </DropdownButton>
                            <Button className='file-upload'>
                                    {/*<label htmlFor="image_uploads">Choose images to upload (PNG, JPG)</label>*/}
                                    <label className="custom-file-upload">
                                        <input type="file"
                                               onChange={(e) => this.props.handle_files(e.target.files)}
                                               multiple
                                               accept="image/*, video/*"
                                        />
                                        <Images/>
                                    </label>
                                </Button>
                            <Button>4</Button>
                        </ButtonGroup>
                        <ButtonGroup className="mr-2" aria-label="Second group">
                            <Button>5</Button> <Button>6</Button> <Button>7</Button>
                        </ButtonGroup>
                        <ButtonGroup aria-label="Third group">
                            <Button variant="outline-warning" id="tweetbox-submit" type={"submit"}>Submit</Button>{' '}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        );
    }
}


export default MyTextArea
