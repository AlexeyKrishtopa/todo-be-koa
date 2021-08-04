const mongoose = require('mongoose')
const User = mongoose.Schema(
  {
    login: { type: String, required: true, uniqe: true },
    password: { type: String, require: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    firstName: { type: String, default: '' },
    secondName: { type: String, default: '' },
    age: { type: String, default: '' },
    phone: { type: String, default: '' },
    mail: { type: String, default: '' },
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', User)
