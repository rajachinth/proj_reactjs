import React, {Fragment, useState,useEffect} from 'react';
import Radium from 'radium';
import styleClass from './LoginPage.module.css';
import WrapperHOC from '../HOC/WrapperHOC';
import Alert from 'react-bootstrap/Alert';

const LoginForm = (props) => {

    let errorElement=null;
    const [stateValue, setStateValue] = useState({
        isInvalid:false
    });

     /**************Styles RADIUM****************/
    
     let labelStyle = {
         fontWeight:'500',
     }

     let alertSyle = {
         padding:'0',
         textAlign:'center',
         fontSize:'14px'
     }

    /*******************************************/

    let HTMLElement = null;
    let defaultStyle = [];
    (props.elementValid) ?
                        defaultStyle.push(styleClass.elementDefaultStyle) :
                        defaultStyle.push(styleClass.elementErrorStyle);

    useEffect(()=>{
        if(!(stateValue.isInvalid === props.elementValid))
            setStateValue(
                (prevState,currentProps)=>({isInvalid:props.elementValid})
            );
        return (()=>{/*cleanup function*/})
    },[props.elementValid]);

    useEffect(()=>{
        //do something in future
    });

    switch(props.elementName)
    {
        case('Input'):
            HTMLElement = <Fragment>
                <label style={labelStyle}>{props.label}</label>
                <input onChange = {props.UserInputEvent}
                                    {...props.configProperties}
                                    value = {props.elementValue}
                                    className = {defaultStyle.join()}
                                    />
                {errorElement = (!stateValue.isInvalid) ? 
                                    <Alert variant='danger' style={alertSyle}>{props.errorMSG}</Alert>
                                    : null}
            </Fragment>
            break;
        default:
            HTMLElement = alert(`No Handler for type "${props.elementName}"`);
    }

    return (
        <WrapperHOC>
            {HTMLElement}
        </WrapperHOC>
    )
}


export default React.memo(Radium(LoginForm));