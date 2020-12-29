import {of, pipe,from,throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators'
import {ofType} from 'redux-observable';

const  userEpic = (action$,state$,{axios}) =>
    action$
    .pipe(
        ofType('LOGINREQUEST'),
        switchMap((data) => { 
             return axios.post('/authentication/login',data.payload)
             .then((responseData)=>{
                return {type:'LOGINDATA',payload:{username:'dummy',businessname:'dummy'}};
             })
             .catch((errorStatus)=>{
                 console.log(errorStatus);
                 let errorMessage = '';
                 if(errorStatus === 400) errorMessage = 'invalid username/password';
                 else errorMessage = 'unknown server error'
                 return {type:'LOGINERROR',payload:{error:true,errormessage: errorMessage}};
             })                                                           
        }),
        map((data) => {console.log(data);return data })
    )

export {userEpic};

