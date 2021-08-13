const Router = require('koa-router')
const { reqLoggerMiddleware } = require('../middleware/reqLoggerMiddleware')
const { resLoggerMiddleware } = require('../middleware/resLoggerMiddleware')
const todoController = require('../todos/todoController')
const { authMiddleware } = require('../middleware/authMiddleware')

const todoRouter = new Router()

todoRouter
  .get(
    '/api/todos',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.getAllTodos,
    resLoggerMiddleware
  )
  .get(
    '/api/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.getOneTodo,
    resLoggerMiddleware
  )
  .post(
    '/api/todos',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.createTodo,
    resLoggerMiddleware
  )
  .put(
    '/api/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.updateTodo,
    resLoggerMiddleware
  )
  .put(
    '/api/todos/updateCompleted',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.updateTodosCompleted,
    resLoggerMiddleware
  )
  .delete(
    '/api/todos/:id',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.deleteTodo,
    resLoggerMiddleware
  )
  .delete(
    '/api/todos/clearCompleted',
    reqLoggerMiddleware,
    authMiddleware,
    todoController.deleteCompletedTodos,
    resLoggerMiddleware
  )

module.exports = { todoRouter }
