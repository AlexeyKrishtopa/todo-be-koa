const Todo = require('./Todo')
// const User = require('../users/User')

class TodoRepository {
  async getAllTodos(userId) {
    const todos = await Todo.find({ user: userId })
    return todos
  }
  async getOneTodo(todoId) {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      throw new Error(`todo with id: ${todoId} does not exist`)
    }
    return todo
  }
  async createTodo(todo) {
    const newTodo = await Todo.create(todo)
    return newTodo
  }
  async updateTodo(todoId, todo) {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo)
    if (!updatedTodo) {
      throw new Error(`todo with id: ${todoId} does not exist`)
    }
    return updatedTodo
  }
  async deleteTodo(todoId) {
    const deletedTodo = await Todo.findByIdAndDelete(todoId)
    if (!deletedTodo) {
      throw new Error(`todo with id: ${todoId} does not exist`)
    }
    return deletedTodo
  }
}

module.exports = new TodoRepository()
