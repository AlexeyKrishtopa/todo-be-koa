const jwt = require('jsonwebtoken')
const tokens = require('../constants/tokens')

const genereteAccessToken = (userId) => {
  const payload = {
    userId: userId,
    type: tokens.access.type,
  }
  const options = { expiresIn: tokens.access.expiresIn }

  return jwt.sign(payload, tokens.secret, options)
}
const genereteRefreshToken = (userId) => {
  const payload = {
    userId: userId,
    type: tokens.refresh.type,
  }
  const options = { expiresIn: tokens.refresh.expiresIn }

  return jwt.sign(payload, tokens.secret, options)
}
const refreshTokens = (userId) => {
  const accessToken = genereteAccessToken(userId)
  const refreshToken = genereteRefreshToken(userId)

  return {
    accessToken,
    refreshToken,
  }
}

module.exports = {
  genereteAccessToken,
  genereteRefreshToken,
  refreshTokens,
}
