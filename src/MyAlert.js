import React, {useState} from 'react';
import Alert from "react-bootstrap/Alert";

export class MyAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    componentDidMount() {
        this.setState({show: true})
    }

    render() {
        if (this.state.show) {
            return (
                <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
                    <p>
                        { this.props.message }
                    </p>
                </Alert>
            );
        }
        return null;
    }
}