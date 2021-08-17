const Router = require('koa-router')
const { authMiddleware } = require('../middleware/authMiddleware')
const userController = require('../users/userController')

const userRouter = new Router()

userRouter
  .post(
    '/api/user/signin',
    userController.signin
  )
  .post(
    '/api/user/signup',
    userController.signup
  )
  .post(
    '/api/user/refresh-token',
    userController.refreshTokens
  )
  .get(
    '/api/user',
    authMiddleware,
    userController.getUser
  )
  .put(
    '/api/user',
    authMiddleware,
    userController.updateUser
  )

module.exports = { userRouter }
