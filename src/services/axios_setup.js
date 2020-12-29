import axios from 'axios';
import * as actionCreator from '../ReduxStore/action_creators';
import {STORE} from './store_setup';


/************AXIOS SETUP***************/

axios.defaults.baseURL='http://localhost:4000';

axios.interceptors.request.use((request)=>{
  switch (request.url) {
    case ('/authentication/login'):
      STORE.dispatch(actionCreator.loginSpinner(true));
      console.log(request);
      break;
    default:
      console.log('no dispatch logged');
      break;
  }
  return request;
},(error)=>{
  STORE.dispatch(actionCreator.loginSpinner(false));
  console.log(error.status);
  return Promise.reject(error)
});

axios.interceptors.response.use((response)=>{
  console.log(response);
  switch (response.config.url) {
    case ('/authentication/login'):
      STORE.dispatch(actionCreator.loginSpinner(false));
      break;
    default:
      console.log('no dispatch logged');
      break;
  }
  return response;
},(error)=>{
  console.log(JSON.stringify(error));

  let errorStatus = 0;
  if(error.message.includes('status code 400')) errorStatus = 400;
  else errorStatus = 500;

  STORE.dispatch(actionCreator.loginSpinner(false));
  return Promise.reject(errorStatus);
});

/**************************************/

export default axios;