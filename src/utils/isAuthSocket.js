const tokens = require('../constants/tokens')
const jwt = require('jsonwebtoken')

const isAuthSocket = (token) => {
  try {
    const payload = jwt.verify(token, tokens.secret)
    if (payload.type !== tokens.access.type) {
      Error('Must be access jwt, but was received other')
    }

    return true
  } catch (error) {
    return false
  }
}

module.exports = { isAuthSocket }
