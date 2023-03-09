const Todo = require('./Todo')
const User = require('../users/User')

class TodoRepository {
  async getAllTodos () {
    const todos = await Todo.find()

    return todos
  }
  async getOneTodo (id) {
    const newTodo = await Todo.findOne({ _id: id })

    if (!newTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }

    return newTodo
  }
  async createTodo (todo) {
    const newTodo = await Todo.create(todo)

    return newTodo
  }
  async updateTodo (id, todo) {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        description: todo.description,
        isCompleted: todo.isCompleted,
        sort: todo.sort
      },
      {
        new: true
      }
    )

    if (!updatedTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }
    return updatedTodo
  }
  async updateTodosCompleted (isCompleted) {
    await Todo.updateMany({}, { $set: { isCompleted } })

    const updatedTodos = await Todo.find()

    return updatedTodos
  }
  async deleteTodo (id) {
    const deletedTodo = await Todo.findByIdAndDelete(id)

    if (!deletedTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }
    return deletedTodo
  }
  async deleteCompletedTodos () {
    await Todo.deleteMany({ isCompleted: true })

    const restTodos = await Todo.find()

    return restTodos
  }
}

module.exports = new TodoRepository()
