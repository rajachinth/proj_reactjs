import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = (props) => {
    return ( <Spinner animation='border' size={props.size} /> )
}

export default SpinnerComponent;