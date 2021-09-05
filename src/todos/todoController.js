const todoService = require('./todoService')

class TodoController {
  async getAllTodos(ctx) {
    try {
      // ctx.throw(400, { message: 'GG', status: 400 })

      const userId = ctx.payload.userId

      const todos = await todoService.getAllTodos(userId)

      ctx.body = JSON.stringify({
        payload: {
          list: todos,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
  async getOneTodo(ctx) {
    try {
      const todoId = ctx.params.id
      const userId = ctx.payload.userId

      const todo = await todoService.getOneTodo(todoId, userId)

      ctx.body = JSON.stringify({
        paylaod: {
          dto: todo,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
  async createTodo(ctx) {
    try {
      const reqBody = ctx.request.body
      const userId = ctx.payload.userId

      // ctx.throw(400, { message: 'GG', status: 400 })

      const todo = await todoService.createTodo(reqBody.description, userId)

      ctx.body = JSON.stringify({
        payload: {
          dto: todo,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
  async updateTodo(ctx) {
    try {
      const reqBody = ctx.request.body
      const todoId = ctx.params.id
      const userId = ctx.payload.userId

      // ctx.throw(400, { message: 'GG', status: 400 })

      const todo = await todoService.updateTodo(todoId, reqBody, userId)

      ctx.body = JSON.stringify({
        payload: {
          dto: todo,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
  async updateTodosCompleted(ctx) {
    try {
      const reqBody = ctx.request.body
      const userId = ctx.payload.userId

      const todos = await todoService.updateTodosCompleted(
        reqBody.isCompleted,
        userId
      )

      ctx.body = JSON.stringify({
        payload: {
          list: todos,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async deleteTodo(ctx) {
    try {
      const todoId = ctx.params.id
      const userId = ctx.payload.userId

      const todo = await todoService.deleteTodo(todoId, userId)

      ctx.body = JSON.stringify({
        payload: {
          dto: todo,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async deleteCompletedTodos(ctx) {
    try {
      const userId = ctx.payload.userId

      await todoService.deleteCompletedTodos(userId)

      ctx.body = JSON.stringify({
        message: 'completed was removed',
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
}

module.exports = new TodoController()
