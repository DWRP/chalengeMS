import { Route, Redirect } from 'react-router-dom'

import {useAuthContext} from '../context/AuthContext'

function PrivateRoute(props:any){
    let context = useAuthContext()
    
    if(context.signed){
        return (<Route {...props} />)
    }
    else{
        return (<Redirect to="/"/>)
    }
}


export default PrivateRoute