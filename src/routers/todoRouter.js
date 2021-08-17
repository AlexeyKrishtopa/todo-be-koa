const Router = require('koa-router')
const todoController = require('../todos/todoController')
const { authMiddleware } = require('../middleware/authMiddleware')

const todoRouter = new Router()

todoRouter
  .get(
    '/api/todos',
    authMiddleware,
    todoController.getAllTodos
  )
  .get(
    '/api/todos/:id',
    authMiddleware,
    todoController.getOneTodo
  )
  .post(
    '/api/todos',
    authMiddleware,
    todoController.createTodo
  )
  .put(
    '/api/todos/:id',
    authMiddleware,
    todoController.updateTodo
  )
  .put(
    '/api/todos/updateCompleted',
    authMiddleware,
    todoController.updateTodosCompleted
  )
  .delete(
    '/api/todos/:id',
    authMiddleware,
    todoController.deleteTodo
  )
  .delete(
    '/api/todos/clearCompleted',
    authMiddleware,
    todoController.deleteCompletedTodos
  )

module.exports = { todoRouter }
