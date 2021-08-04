const todoRepository = require('./todoRepository')

class TodoService {
  async getAllTodos(userId) {
    const todos = await todoRepository.getAllTodos(userId)
    return todos
  }
  async getOneTodo(todoId, userId) {
    const todo = await todoRepository.getOneTodo(todoId, userId)
    return todo
  }
  async createTodo(todo, userId) {
    const newTodo = await todoRepository.createTodo(todo, userId)
    return newTodo
  }
  async updateTodo(todoId, todo, userId) {
    const updatedTodo = await todoRepository.updateTodo(todoId, todo, userId)
    return updatedTodo
  }
  async deleteTodo(todoId, userId) {
    const deletedTodo = await todoRepository.deleteTodo(todoId, userId)
    return deletedTodo
  }
}

module.exports = new TodoService()
