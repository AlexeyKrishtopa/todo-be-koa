const todoRepository = require('./todoRepository')

class TodoService {
  async getAllTodos(userId) {
    const todos = await todoRepository.getAllTodos(userId)
    return todos
  }
  async getOneTodo(todoId) {
    const todo = await todoRepository.getOneTodo(todoId)
    return todo
  }
  async createTodo(todo) {
    const newTodo = await todoRepository.createTodo(todo)
    return newTodo
  }
  async updateTodo(todoId, todo) {
    const updatedTodo = await todoRepository.updateTodo(todoId, todo)
    return updatedTodo
  }
  async deleteTodo(todoId) {
    const deletedTodo = await todoRepository.deleteTodo(todoId)
    return deletedTodo
  }
}

module.exports = new TodoService()
