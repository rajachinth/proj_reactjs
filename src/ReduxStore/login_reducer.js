import * as rootStore from './application_state';
import * as actionCreators from './action_creators';

export const LoginReducer = (state=rootStore.LoginState,action) => {
    switch(action.type)
    {
        case(actionCreators.LOGINREQUEST):
            return state;

        case(actionCreators.LOGINDATA):
            const loginData = {loginstatus:true };
            return Object.assign({},state,loginData);

        case(actionCreators.LOGINSPINNER):
            return Object.assign({},state,{spinner:action.payload});
        
        case(actionCreators.LOGINERROR):
            return Object.assign({},state,{error:action.payload.error,errormessage:action.payload.errormessage });
        
        default:
            return state;
    }
}