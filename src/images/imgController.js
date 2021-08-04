const todoService = require('./imgService')

class ImgController {
  async getImg(ctx, next) {
    try {
      const imgId = ctx.params.id
      ctx.body = await todoService.getImg(imgId)

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async createImg(ctx, next) {
    try {
      const reqBody = ctx.request.body

      ctx.body = await todoService.createImg(JSON.parse(reqBody))

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
}

module.exports = new ImgController()
