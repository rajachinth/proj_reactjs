import React from 'react';

const RootContext=React.createContext({
    loginSpinner:false,
    userLoginDispatch:() => {},
});
    
export default RootContext;