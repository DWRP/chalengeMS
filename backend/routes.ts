import express from 'express'
import ServerController from './src/controllers/ServerController'
import AuthController from './src/auth/auth'
import UserController from './src/controllers/UserController'

const routes = express.Router()

routes.get('/', ServerController.index)
routes.get('/status', ServerController.status)

routes.post('/login', UserController.show)
routes.post('/register', UserController.create)


routes.use(AuthController.AuthCheck)

routes.post('/reauth', async(req,res)=>res.json({auth:true}))

routes.get('/users', UserController.index)

export default routes