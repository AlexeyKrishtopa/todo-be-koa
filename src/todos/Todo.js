const mongoose = require('mongoose')

const Todo = mongoose.Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, require: true },
    sort: { type: Number, requre: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Todo', Todo)
