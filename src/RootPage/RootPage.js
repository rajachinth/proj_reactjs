import React, {Component,lazy,Suspense} from 'react';
import WrapperHOC from '../HOC/WrapperHOC';
import {connect} from 'react-redux';
import * as actionCreator from '../ReduxStore/action_creators';
import RootContext from '../HOC/RootContext';
import {BrowserRouter,Switch,Route, Link,} from 'react-router-dom';
import { Fragment } from 'react';
import Loader from '../UI-Components/Loader/Loader';
import InputBoxParent from '../InpuBox/InputBox_Parent';

const LoginComponent = lazy(() => import('../LoginPage/LoginPage')); // Only Client Side Render

class RootPage extends Component
{
    
    render()
    {
       const rootContextProps = {
            loginSpinner:this.props.loginSpinner,
            loginstatus:this.props.loginstatus,
            loginError:this.props.loginError,
            loginErrorMessage:this.props.loginErrorMessage,
            userLoginRequest:this.props.userLoginRequest,
        }
        
        return <WrapperHOC>
                    <RootContext.Provider value={rootContextProps}>
                        <BrowserRouter basename = '/'>
                                <Switch>
                                    <Route path = '/login'
                                        exact = {true} 
                                        render = {() => <Suspense fallback = {<Loader />}>
                                                                <LoginComponent />
                                                        </Suspense>} 
                                    />
                                    <Route path = '/'
                                            exact = {true}
                                            component = {InputBoxParent}
                                            />
                                </Switch>
                        </BrowserRouter>
                    </RootContext.Provider>
               </WrapperHOC>
    }
}

const mapStateToProps = (state) => {
    return ({
        loginSpinner:state.LoginReducer.spinner,
        loginstatus:state.LoginReducer.loginstatus,
        loginError:state.LoginReducer.error,
        loginErrorMessage:state.LoginReducer.errormessage,
    });
}

const mapDispatchToProps = (dispatch) => {
    return({
        userLoginRequest:(data) => dispatch(actionCreator.loginRequest(data)),
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(RootPage);