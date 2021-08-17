const Todo = require('./Todo')
const User = require('../users/User')

class TodoRepository {
  async getAllTodos(userId) {
    const todos = await Todo.find({ user: userId })
    return todos
  }
  async getOneTodo(id, userId) {
    const newTodo = await Todo.findOne({ _id: id, user: userId })
    if (!newTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }
    return newTodo
  }
  async createTodo(todo, userId) {
    console.log(userId)
    const newTodo = await Todo.create({
      description: todo.description,
      isCompleted: todo.isCompleted,
      sort: todo.sort,
      user: userId,
    })

    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: newTodo._id } },
      { new: true, useFindAndModify: false }
    )

    return newTodo
  }
  async updateTodo(id, todo, userId) {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        description: todo.description,
        isCompleted: todo.isCompleted,
        sort: todo.sort,
        user: userId,
      },
      {
        new: true,
      }
    )

    if (!updatedTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }
    return updatedTodo
  }
  async updateTodosCompleted(isCompleted, userId) {
    await Todo.updateMany({ user: userId }, { $set: { isCompleted } })

    const updatedTodos = await Todo.find({ user: userId })

    return updatedTodos
  }
  async deleteTodo(id, userId) {
    const deletedTodo = await Todo.findByIdAndDelete(id)

    await User.findByIdAndUpdate(
      userId,
      { $pull: { todos: id } },
      { new: true, useFindAndModify: true }
    )

    if (!deletedTodo) {
      throw new Error(`todo with id: ${id} dosn't exist`)
    }
    return deletedTodo
  }
  async deleteCompletedTodos(userId) {
    
    await Todo.deleteMany({ user: userId, isCompleted: true })
    const todos = await Todo.find({ user: userId })

    const todosIds = todos.map((todo) => todo._id)

    await User.findByIdAndUpdate(
      userId,
      { $set: { todos: todosIds } },
      { new: true, useFindAndModify: true }
    )
  }
}

module.exports = new TodoRepository()
