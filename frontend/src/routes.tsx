import { BrowserRouter, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PrivateRoute from './services/PrivateRoute'
import NotFound from './pages/NotFound'
import AuthRoute from './services/AuthRoute'


function Routes() {

    return(
        <BrowserRouter>
            <Switch>
                <AuthRoute exact path="/" component={Login}/>
                <AuthRoute path="/register" component={Register}/>
                <PrivateRoute path="/home" component={Home} />
                <AuthRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes