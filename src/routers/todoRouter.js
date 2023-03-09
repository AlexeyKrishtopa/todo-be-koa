const Router = require('koa-router')
const todoController = require('../todos/todoController')
const { authMiddleware } = require('../middleware/authMiddleware')

const todoRouter = new Router()

todoRouter
  .get('/', async ctx => {
    ctx.body = 'pass!'
  })
  .get('/api/todos', todoController.getAllTodos)
  .get('/api/todos/:id', todoController.getOneTodo)
  .post('/api/todos', todoController.createTodo)
  .put('/api/todos/:id', todoController.updateTodo)
  .put('/api/updateTodosCompleted', todoController.updateTodosCompleted)
  .delete('/api/todos/:id', todoController.deleteTodo)
  .delete('/api/clearCompletedTodos', todoController.deleteCompletedTodos)

module.exports = { todoRouter }
