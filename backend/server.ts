import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'
import errorHandler from './src/errors/handler'

import './src/database/connection'

const app = express()

app.use(cors())

app.use(express.json())
app.use(routes)

app.use(errorHandler)

app.listen(process.env.PORT || 3333)