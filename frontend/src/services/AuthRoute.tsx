import { Route, Redirect } from 'react-router-dom'

import {useAuthContext} from '../context/AuthContext'

function AuthRoute(props:any){
    let context = useAuthContext()
    
    if(context.signed){
        return (<Redirect to="/home"/>)
    }
    else{
        return (<Route {...props} />)
    }
}


export default AuthRoute