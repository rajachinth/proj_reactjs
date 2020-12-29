import React, { Component } from 'react'
import InputBoxChild from './InpuBox_Child.js';

class InputBoxParent extends Component
{
    state = {
        dataObj : [  {name:'JOHN'},{name:'KEVIN'},{name:'ABRAHAM'}  ]
    }
    addUser = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        if (event.target[0].value.trim() !== '')
        {
            this.setState((prevstate, props) => {
                let newArray = prevstate.dataObj.map(e => e)
                console.log(newArray.concat([{name:event.target[0].value}]));
                return {
                    dataObj : newArray.concat([{name:event.target[0].value}])
                }
            });    
        }
    }
    render()
    {
        return <InputBoxChild addData={this.addUser} data={this.state}/>
    }
}

export default InputBoxParent;