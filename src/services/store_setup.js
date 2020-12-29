
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';  
import {LoginReducer} from '../ReduxStore/login_reducer';
import {combineEpics,createEpicMiddleware} from 'redux-observable';
import {userEpic} from './user_service';
import axios from './axios_setup';

/********REDUX-OBSERVABLE SETUP*********/

const rootEpic = combineEpics(userEpic);
const rootEpicMiddleware = createEpicMiddleware({dependencies:{ axios:axios }});

/***************************************/

/********REDUX STORE SETUP************/

const REDUCER = combineReducers({ LoginReducer:LoginReducer });
console.log(process.env.NODE_ENV)
const composeEnhancers = (process.env.NODE_ENV === 'development') ?
                            (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
                            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
                          : null;

const STORE = createStore(REDUCER, composeEnhancers(applyMiddleware(thunk,rootEpicMiddleware)));

/****************redux-observable********************/

rootEpicMiddleware.run(rootEpic);

/****************************************************/

export {STORE}




