/* eslint-disable no-undef */
require('dotenv').config()
const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const { todoRouter } = require('./routers/todoRouter')
const { userRouter } = require('./routers/userRouter')
const cors = require('@koa/cors')
const bodyParser = require('koa-body-parser')
const http = require('http')

const app = new Koa()
const server = http.createServer(app.callback())

app.use(logger())
app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(todoRouter.routes()).use(todoRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

module.exports = server
