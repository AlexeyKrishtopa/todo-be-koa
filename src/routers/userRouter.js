const Router = require('koa-router')
const { reqLoggerMiddleware } = require('../middleware/reqLoggerMiddleware')
const { resLoggerMiddleware } = require('../middleware/resLoggerMiddleware')
const { authMiddleware } = require('../middleware/authMiddleware')
const userController = require('../users/userController')

const userRouter = new Router()

userRouter
  .post(
    '/api/user/signin',
    reqLoggerMiddleware,
    userController.signin,
    resLoggerMiddleware
  )
  .post(
    '/api/user/signup',
    reqLoggerMiddleware,
    userController.signup,
    resLoggerMiddleware
  )
  .post(
    '/api/user/refresh-token',
    reqLoggerMiddleware,
    userController.refreshTokens,
    resLoggerMiddleware
  )
  .get(
    '/api/user',
    reqLoggerMiddleware,
    authMiddleware,
    userController.getUser,
    resLoggerMiddleware
  )
  .put(
    '/api/user',
    reqLoggerMiddleware,
    authMiddleware,
    userController.updateUser,
    resLoggerMiddleware
  )

module.exports = { userRouter }
