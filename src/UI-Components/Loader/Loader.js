import React from 'react';
import { Fragment } from 'react';
import SpinnerComponent from '../Spinner/Spinner';

const Loader = () => {
    return (
        <Fragment>
            <div style={{width:'100px', height:'100vh'}}>
                <div style={{position:'absolute', left:'50%', top:'50%', transform:'translateY(-50%)', transform:'translateX(-50%)'}}>
                    <SpinnerComponent size = 'm'/>
                </div>
            </div>
        </Fragment>
    )
}

export default Loader;