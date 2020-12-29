import React,{Component} from 'react';
import Radium from 'radium';
import styleClass from './LoginPage.module.css';
import WrapperHOC from '../HOC/WrapperHOC';
import LoginForm from './LoginForm';
import SpinnerComponent from '../UI-Components/Spinner/Spinner';
import RootContext from '../HOC/RootContext';

class LoginPage extends Component
{
    state = {
        loginForm: {
            username: {
                configurations: {
                    type:'text',
                    placeholder:'enter your 6 digit uniqueID',  
                },
                validations: {
                    required:true,
                    regExp:false,
                },
                properties: {
                    name:'Input',
                    label:'UserID',
                    touched:false,
                    valid:true,
                    value:'',
                    errorMSG:'',
                },
            },
            password: {
                configurations: {
                    type:'password',
                    placeholder:'enter your password',
                },
                validations: {
                    required:true,
                    regExp: true,
                },
                properties: {
                    touched:false,
                    name:'Input',
                    label:'Password',
                    valid:true,
                    value:'',
                    errorMSG:'',
                },
            }
        },
        formValid:false,
    }

    /******************Context values******************/

    static contextType=RootContext; // creates 'context' property
    
    /**************************************************/

    userInputValidation(inputData,inputKey)
    {
        let validationRules=inputData[inputKey].validations;
        let isValid=true;
        let errorMSG=null;
        if(validationRules.required && isValid)
        {
            if (inputData[inputKey].properties.value.trim() !== '') isValid=true
            else isValid=false;
            errorMSG = (!isValid) ? 'user should enter this field mandatorily' : null;
        }
        if(validationRules.regExp && isValid)
        {
            const regExp = /\S+@\S+\.\S+/;
            if (regExp.test(inputData[inputKey].properties.value)) isValid = true;
            else isValid=false;
            errorMSG = (!isValid) ? `user should enter invalid email format` : null;
        }
        return {isValid,errorMSG};
    }

    userInputData(event, inputKey)
    {
         let duplicateState={...this.state.loginForm};
         let duplicateSubStateOne={...duplicateState[inputKey]};
         let duplicateSubStateTwo={...duplicateSubStateOne.properties};
         duplicateSubStateTwo.value=event.target.value;
         duplicateSubStateOne.properties=duplicateSubStateTwo;
         duplicateState[inputKey]=duplicateSubStateOne;
        
         const {isValid,errorMSG} = this.userInputValidation(duplicateState,inputKey);
         duplicateSubStateTwo.valid=isValid;
         duplicateSubStateTwo.errorMSG=errorMSG;
         duplicateSubStateTwo.touched=true;
         duplicateSubStateOne.properties=duplicateSubStateTwo;
         duplicateState[inputKey]=duplicateSubStateOne;

         let isFormValid=true; //optimistic approach

         for (let KEY in duplicateState)
         {
             if (isFormValid && duplicateState[KEY].properties.valid && duplicateState[KEY].properties.touched)
                isFormValid = true;
             else isFormValid = false;
         }

         this.setState((prevstate, props)=>{
             return {
                loginForm:duplicateState,
                formValid:isFormValid
             }
         })
    }

    submitData = (event) =>
    {
        event.preventDefault();
        const loginData = {uniqueID:this.state.loginForm.username.properties.value,
                           password:this.state.loginForm.password.properties.value};

        this.context.userLoginRequest(loginData);

    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    /**************Styles RADIUM****************/
    
    formStyle = {
        width:'20%',
        marginLeft:'40%',
        paddingTop:'20px',
    }
    buttonStyle = {
        textAlign: 'center',
        left: '50%',
        width:'25%',
        transform: 'translateX(-50%)',
        padding: '5px',
        position:'relative',
        borderRadius: '20px',
        marginTop: '5%',
        backgroundColor: 'lightgrey',
        border: '2px solid lightgrey',
        ':disabled': {
            cursor: 'not-allowed',
        }
    }
    errorStyle = {
        textAlign:'center',
        color:'red',
        fontWeight:'700',
        paddingTop:'10px',
        fontSize:'14px',
    
    }
    /*******************************************/

    /********************HOOKS******************/

    componentDidMount()
    {
        console.log(`Login status(componentdidmount): ${this.context.loginstatus}`)
    }
    shouldComponentUpdate(nextProps,nextState)
    {
        console.log(`Login status(shouldcomponentupdate): ${this.context.loginstatus}`)
        return true;
    }
    getSnapshotBeforeUpdate(nextProps,nextState)
    {
        return nextProps;
    }
    componentDidUpdate(props,state,snapshot)
    {
        console.log(`Login status(componentdidupdate): ${this.context.loginstatus}`)

    }
    componentWillUnmount()
    {
        console.log('component unwounted');
    }

    /*******************************************/

    render()
    {
        let formArray = [];
        let buttonelement = null;
        let errorelement = null;

        for (let KEY in this.state.loginForm)
        {
            formArray.push(
                {
                    id:KEY,
                    config:this.state.loginForm[KEY].configurations,
                    properties:this.state.loginForm[KEY].properties,
                }
            );
        }
        return <WrapperHOC>
                    <div className={styleClass.mainDiv}>
                    <div style={{textAlign:"center",
                                textTransform:"uppercase",
                                paddingTop:"10%",
                                fontWeight:'500',
                                width: '20%',
                                marginLeft : '40%',
                                fontSize:"20px"}}> Login
                    </div>
                        <form style = {this.formStyle} onSubmit = {this.submitData} >
                            {
                                formArray.map(element => (
                                    <LoginForm elementName = {element.properties.name}
                                            key = {element.id}
                                            configProperties = {element.config}
                                            elementValid = {element.properties.valid}
                                            elementValue = {element.properties.value}
                                            errorMSG = {element.properties.errorMSG}
                                            label = {element.properties.label}
                                            UserInputEvent = {(event) => {this.userInputData(event,element.id)}}
                                    />
                                ))
                            }   
                           <RootContext.Consumer>
                               {
                                   value =>  {
                                        return  buttonelement = (value.loginSpinner) ?
                                                    <button disabled={true} style={this.buttonStyle}><SpinnerComponent size = 'sm' /></button> :
                                                    <button disabled={!this.state.formValid} style={this.buttonStyle}>SignIn</button>
                                 }
                               }
                           </RootContext.Consumer>
                           <RootContext.Consumer>
                               {
                                   value => {
                                       return  errorelement = (value.loginError) ?
                                                <p style={this.errorStyle}>{value.loginErrorMessage}</p> :
                                                null
                                   }
                               }
                           </RootContext.Consumer>
                        </form>
                    </div>
               </WrapperHOC> 
    }
}

export default Radium(LoginPage);