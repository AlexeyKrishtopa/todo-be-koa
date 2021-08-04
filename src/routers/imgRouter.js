const Router = require('koa-router')
const { reqLoggerMiddleware } = require('../middleware/reqLoggerMiddleware')
const { resLoggerMiddleware } = require('../middleware/resLoggerMiddleware')
const imgController = require('../images/imgController')

const imgRouter = new Router()

imgRouter
  .get(
    '/api/img/:id',
    reqLoggerMiddleware,
    imgController.getImg,
    resLoggerMiddleware
  )
  .post(
    '/api/img',
    reqLoggerMiddleware,
    imgController.createImg,
    resLoggerMiddleware
  )

module.exports = { imgRouter }
