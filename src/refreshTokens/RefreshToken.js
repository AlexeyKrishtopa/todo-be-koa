const mongoose = require('mongoose')

const RefreshToken = mongoose.Schema(
  {
    refreshToken: { type: String, required: true, uniqe: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false }
)

module.exports = mongoose.model('RefreshToken', RefreshToken)
