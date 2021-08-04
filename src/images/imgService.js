const imgRepository = require('./imgRepository')

class ImgService {
  async getImg(img) {
    const todo = await imgRepository.getImg(img)

    return todo
  }
  async createImg(img) {
    const newTodo = await imgRepository.createImg(img)

    return newTodo
  }
}

module.exports = new ImgService()
