const todoRepository = require('./todoRepository')

class TodoService {
  async getAllTodos () {
    const todos = await todoRepository.getAllTodos()
    return todos
  }
  async getOneTodo (todoId) {
    const todo = await todoRepository.getOneTodo(todoId)
    return todo
  }
  async createTodo (description) {
    const todos = await todoRepository.getAllTodos()

    const todo = {
      isCompleted: false,
      description,
      sort: todos.length
        ? todos.sort((a, b) => a.sort - b.sort)[todos.length - 1].sort + 1
        : 1
    }

    const newTodo = await todoRepository.createTodo(todo)
    return newTodo
  }
  async updateTodo (todoId, todo) {
    const updatedTodo = await todoRepository.updateTodo(todoId, todo)
    return updatedTodo
  }
  async updateTodosCompleted (isCompleted) {
    const updatedTodos = await todoRepository.updateTodosCompleted(isCompleted)
    return updatedTodos
  }
  async deleteTodo (todoId) {
    const deletedTodo = await todoRepository.deleteTodo(todoId)
    return deletedTodo
  }
  async deleteCompletedTodos () {
    const restTodos = await todoRepository.deleteCompletedTodos()

    return restTodos
  }
}

module.exports = new TodoService()
