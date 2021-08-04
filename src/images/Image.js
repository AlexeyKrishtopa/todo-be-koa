const mongoose = require('mongoose')

const Image = mongoose.Schema(
  {
    src: { type: String, required: true },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Image', Image)
