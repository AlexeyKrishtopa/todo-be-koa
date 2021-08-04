const Image = require('./Image')

class ImgRepository {
  async getImg(imgId) {
    const img = await Image.findById(imgId)

    if (!img) {
      throw new Error(`img with id: ${imgId} does not exist`)
    }

    return img
  }
  async createImg(img) {
    console.log(img)
    const newImg = await Image.create(img)

    return newImg
  }
}

module.exports = new ImgRepository()
