const todoService = require('./todoService')

class TodoController {
  async getAllTodos(ctx, next) {
    try {
      const userId = ctx.payload.userId
      ctx.body = await todoService.getAllTodos(userId)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async getOneTodo(ctx, next) {
    try {
      const todoId = ctx.params.id
      ctx.body = await todoService.getOneTodo(todoId)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async createTodo(ctx, next) {
    try {
      const reqBody = ctx.request.body
      ctx.body = await todoService.createTodo(reqBody)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async updateTodo(ctx, next) {
    try {
      const reqBody = ctx.request.body
      const todoId = ctx.params.id
      ctx.body = await todoService.updateTodo(todoId, reqBody)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async deleteTodo(ctx, next) {
    try {
      const todoId = ctx.params.id
      ctx.body = await todoService.deleteTodo(todoId)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }
      
      return next()
    }
  }
}

module.exports = new TodoController()
