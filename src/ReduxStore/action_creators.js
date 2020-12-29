export const LOGINDATA = 'LOGINDATA';
export const LOGINSPINNER = 'LOGINSPINNER';
export const LOGINREQUEST = 'LOGINREQUEST';
export const LOGINERROR = 'LOGINERROR';

export const loginRequest = (userdata) => {
    return (dispatch,getState) => {
        console.log(getState().LoginReducer.error)
        if(getState().LoginReducer.error) 
        {
            dispatch({type:LOGINERROR, payload:{error:false,errormessage:''}});
        }
        return dispatch({ type:LOGINREQUEST,payload:userdata }); 
    }
}

export const loginData = (userdata) => {
    return (dispatch,getState) => {
            return dispatch({type:LOGINDATA, payload: userdata});
        }
}

export const loginSpinner = (userdata) => {
    return { type:LOGINSPINNER,  payload: userdata };
}

export const loginError = (userdata) => {
    return { type:LOGINERROR,payload:userdata }
}