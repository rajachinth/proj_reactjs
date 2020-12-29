import React from 'react';
import { Fragment } from 'react';

const InputBoxChild = (props) => {
    console.log(props.data.dataObj);
    return (
        <Fragment>
            <form onSubmit = {props.addData} style={{border:'2px solid black', padding:'15px', width:'20%',marginLeft:'40%',marginTop:'10%'}}>
                <input type={'text'} placeholder={'enter your name'} /><br/>
                <button style={{color:'gray',margin:'10px 0'}}>ADD</button>
                <div>
                    {
                        props.data.dataObj.map(e => <li style={{listStyle:'none',fontWeight:'700'}}>{e.name}</li>)
                    }
                </div>
            </form>
        </Fragment>
    );
}

export default InputBoxChild;