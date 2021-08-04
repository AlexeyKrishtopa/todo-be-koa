const Router = require('koa-router')
const { reqLoggerMiddleware } = require('../middleware/reqLoggerMiddleware')
const { resLoggerMiddleware } = require('../middleware/resLoggerMiddleware')
const userController = require('../users/userController')

const userRouter = new Router()

userRouter
  .post(
    '/signin',
    reqLoggerMiddleware,
    userController.signin,
    resLoggerMiddleware
  )
  .post(
    '/signup',
    
    reqLoggerMiddleware,
    userController.signup,
    resLoggerMiddleware
  )
  .post(
    '/refresh-token',
    
    reqLoggerMiddleware,
    userController.refreshTokens,
    resLoggerMiddleware
  )
  .get(
    '/user',
    reqLoggerMiddleware,
    userController.getUser,
    resLoggerMiddleware
  )
  .put(
    '/user',
    reqLoggerMiddleware,
    userController.updateUser,
    resLoggerMiddleware
  )

module.exports = { userRouter }
