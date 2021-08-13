const todoService = require('./todoService')

class TodoController {
  async getAllTodos(ctx, next) {
    try {
      const userId = ctx.payload.userId

      const todos = await todoService.getAllTodos(userId)

      ctx.body = JSON.stringify({
        payload: {
          list: todos,
        },
        status: 200,
      })

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async getOneTodo(ctx, next) {
    try {
      const todoId = ctx.params.id
      const userId = ctx.payload.userId

      const todo = await todoService.getOneTodo(todoId, userId)

      ctx.body = {
        paylaod: {
          dto: todo,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async createTodo(ctx, next) {
    try {
      const reqBody = ctx.request.body
      const userId = ctx.payload.userId

      const todo = await todoService.createTodo(JSON.parse(reqBody), userId)

      ctx.body = {
        payload: {
          dto: todo,
        },
        status: 200,
      }

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
      const userId = ctx.payload.userId

      const todo = await todoService.updateTodo(
        todoId,
        JSON.parse(reqBody),
        userId
      )

      ctx.body = {
        payload: {
          dto: todo,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async updateTodosCompleted(ctx, next) {
    try {
      const reqBody = JSON.parse(ctx.request.body)
      const userId = ctx.payload.userId

      const todos = await todoService.updateTodosCompleted(reqBody.isCompleted, userId)

      ctx.body = {
        payload: {
          list: todos,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async deleteTodo(ctx, next) {
    try {
      const todoId = ctx.params.id
      const userId = ctx.payload.userId

      const todo = await todoService.deleteTodo(todoId, userId)

      ctx.body = {
        payload: {
          dto: todo,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
}

module.exports = new TodoController()
