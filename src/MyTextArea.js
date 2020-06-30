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


// TODO: Move the setting 
const API_ENDPOINT = 'http://localhost:8000/api';


class MyTextArea extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            picturePreviews: [],
            video: null,
            videoPreview: null
        }
        this.onDrop = this.onDrop.bind(this);
    }

    // todo: is this needed?
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    // Add files to state
    handle_files = (files) => {
        const ALLOWED_VIDEO_TYPES = ['video/mp4'];
        const pictures = [];
        const errors = [];
        let video = null;
        let displayedAlertMessage = false;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.type.startsWith('image')){
                pictures.push(file);
            } else if(file.type.startsWith('video') ) {
                if(!ALLOWED_VIDEO_TYPES.includes(file.type)) {
                    errors.push(`Video type "${file.type}" is unsupported`);
                    continue
                }
                if (video != null && !displayedAlertMessage) {
                    errors.push("Only ONE video is allowed");
                    displayedAlertMessage = true;
                }
                video = file;
            } else {
                errors.push('Unsupported file type!!!!!!!!!!')
            }
        }
        if (errors.length !== 0) alert(errors.join(' \n '));



        /* Map each file to a promise that resolves to an array of image URI's */
        Promise.all(pictures.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
            .then(images => {
                    console.log(images);
                    const imageToImagePreview = (image) => {
                        return {
                            src: image,
                            thumbnail: image,
                            thumbnailWidth: 100,
                            thumbnailHeight: 100,
                            isSelected: false,
                            customOverlay: <div>
                                <button> delete </button>
                            </div>
                        }
                    }
                    /* Once all promises are resolved, update state with image URI array */
                    this.setState({picturePreviews: images.map(imageToImagePreview)})

                }
                , error => {
                    console.error(error);
                })
        this.setState({pictures: pictures, video: video, videoPreview: video ? window.URL.createObjectURL(video): null});

    }

    handle_tweetbox_picture_preview_click = (index, event) => {
        var pictures = this.state.pictures.slice();
        var picturePreviews = this.state.picturePreviews.slice();
        pictures.splice(index, 1);
        picturePreviews.splice(index, 1);
        this.setState({
            pictures: pictures,
            picturePreviews: picturePreviews
        });
    }


    // Allow author to post tweets
    handle_tweet = (e, message) => {
        e.preventDefault();
        const video = this.state.video;
        const images = this.state.pictures;
        var myHeaders = new Headers();
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);


        var formData = new FormData();
        formData.append("message", message);
        if (video != null) {
            // console.log("video is not null")
            formData.append("video", video);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append('image_' + i,  images[i]);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        fetch(API_ENDPOINT + "/tweet/", requestOptions)
            .then(response => response.text())
            .then(() => {window.URL.revokeObjectURL(this.state.videoPreview)})
            .then(() => this.setState({video: null, pictures: [], videoPreview: null, picturePreviews: []}))
            // TODO refresh tweets (maybe call function provided by parent?)
            .then(this.props.getTweets)
            .catch(error => console.log('error', error));
    }

    render() {
        const controlId = "tweetBox.ControlTextarea1";
        const onEmojiClick = (event, emojiObject) => {
            document.getElementById(controlId).value += emojiObject.emoji;
        }

       
        return (
            <Form id="tweetbox" onSubmit={(e) => {
                console.log(e.target.elements);
                this.handle_tweet(e, e.target.elements[0].value);
                e.target.elements[0].value = "";
            }}>
                <Form.Group controlId={controlId} name='tweetbox_text'>
                    {/*<Form.Label>Example textarea</Form.Label>*/}
                    <Form.Control as="textarea" rows="3" placeholder="Whassup???"/>
                    {this.state.picturePreviews ? <Gallery images={this.state.picturePreviews}
                                                           enableImageSelection={false}
                                                           onClickThumbnail={this.handle_tweetbox_picture_preview_click}
                                                           enableLightbox={false}
                    /> : null}
                    {this.state.videoPreview ? <video className="video" width="50%" height="auto" controls>
                        <source src={this.state.videoPreview} type = {this.state.video.type}/>
                        Your browser does not support the video tag.
                    </video>: null}
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
                                               onChange={(e) => this.handle_files(e.target.files)}
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
