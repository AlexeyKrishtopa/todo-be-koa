const tokens = require('../constants/tokens')
const jwt = require('jsonwebtoken')

const authMiddleware = (ctx, next) => {
  try {
    const headerAuth = ctx.headers.authorization

    if (!headerAuth) {
      throw new Error('Authorization access token was not provided')
    }

    const accessToken = headerAuth.split(' ')[1]

    const payload = jwt.verify(accessToken, tokens.secret)

    if (payload.type !== tokens.access.type) {
      throw new Error('Must be access jwt, but was received other')
    }

    ctx.payload = payload

    return next()
  } catch (error) {
    ctx.body = { message: `${error}`, statusCode: 401 }
  }
}

module.exports = { authMiddleware }
