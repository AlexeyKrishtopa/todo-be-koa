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
  async createTodo(description, userId) {
    const todos = await todoRepository.getAllTodos(userId)

    const todo = {
      isCompleted: false,
      description,
      sort: todos.length
        ? todos.sort((a, b) => a.sort - b.sort)[todos.length - 1].sort + 1
        : 1,
      user: userId,
    }

    const newTodo = await todoRepository.createTodo(todo)
    return newTodo
  }
  async updateTodo(todoId, todo, userId) {
    const updatedTodo = await todoRepository.updateTodo(todoId, todo, userId)
    return updatedTodo
  }
  async updateTodosCompleted(isCompleted, userId) {
    const updatedTodos = await todoRepository.updateTodosCompleted(
      isCompleted,
      userId
    )
    return updatedTodos
  }
  async deleteTodo(todoId, userId) {
    const deletedTodo = await todoRepository.deleteTodo(todoId, userId)
    return deletedTodo
  }
  async deleteCompletedTodos(userId) {
    await todoRepository.deleteCompletedTodos(userId)
  }
}

module.exports = new TodoService()
