const Router = require('koa-router')
const { reqLoggerMiddleware } = require('../middleware/reqLoggerMiddleware')
const { resLoggerMiddleware } = require('../middleware/resLoggerMiddleware')
const todoController = require('../todos/todoController')
const { authMiddleware } = require('../middleware/authMiddleware')

const todoRouter = new Router()

todoRouter
  .get(
    '/todos',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.getAllTodos,
    resLoggerMiddleware
  )
  .get(
    '/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.getOneTodo,
    resLoggerMiddleware
  )
  .post(
    '/todos',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.createTodo,
    resLoggerMiddleware
  )
  .put(
    '/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.updateTodo,
    resLoggerMiddleware
  )
  .delete(
    '/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.deleteTodo,
    resLoggerMiddleware
  )

module.exports = { todoRouter }
