const usersService = require('./userService')
const refreshTokenService = require('../refreshTokens/refreshTokenService')
const {
  genereteAccessToken,
  genereteRefreshToken,
  refreshTokens,
} = require('../utils/jwtHelper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokens = require('../constants/tokens')

class UsersController {
  async signup(ctx) {
    try {
      let reqBody = ctx.request.body
      const { login, password } = reqBody

      if (!(login && password)) {
        throw new Error('incorect register data')
      }

      const hashPassword = bcrypt.hashSync(password, 5)

      const newUser = await usersService.signup({
        login: login,
        password: hashPassword,
      })

      ctx.body = JSON.stringify({
        payload: {
          newUser,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async signin(ctx) {
    try {
      let reqBody = ctx.request.body
      const { login, password } = reqBody

      const authenticatedUser = await usersService.signin({
        login: login,
      })

      if (!bcrypt.compareSync(password, authenticatedUser.password)) {
        throw new Error('wrong login or password')
      }

      const accessToken = genereteAccessToken(authenticatedUser._id)
      const refreshToken = genereteRefreshToken(authenticatedUser._id)

      await refreshTokenService.appendToken(authenticatedUser._id, refreshToken)

      ctx.body = JSON.stringify({
        payload: {
          accessToken,
          refreshToken,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async signout(ctx) {
    try {
      const userId = ctx.payload.userId

      await refreshTokenService.removeTokens(userId)

      ctx.body = JSON.stringify({ message: 'tokens removed', status: 200 })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async updateUser(ctx) {
    try {
      const reqBody = ctx.request.body
      const userId = ctx.payload.userId

      const updatedUser = await usersService.updateUser(userId, reqBody)

      ctx.body = JSON.stringify({
        payload: {
          dto: updatedUser,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async refreshTokens(ctx) {
    try {
      let reqBody = ctx.request.body
      const { refreshToken } = reqBody

      if (!refreshToken) {
        throw new Error('Refresh token was not provided')
      }

      const payload = jwt.verify(refreshToken, tokens.secret)

      if (payload.type !== tokens.refresh.type) {
        throw new Error('Must be refresh jwt, but was received other')
      }

      const isValidToken = await refreshTokenService.isValidToken(
        payload.userId,
        refreshToken
      )

      if (!isValidToken) {
        const error = new Error('Invalid refreshToken')
        error.status = 401
        throw error
      }

      const refreshedTokens = refreshTokens(payload.userId)

      await refreshTokenService.replaceToken(
        payload.userId,
        refreshToken,
        refreshedTokens.refreshToken
      )

      ctx.body = JSON.stringify({
        payload: {
          ...refreshedTokens,
        },
        status: 200,
      })
    } catch (error) {
      if (error.message === 'jwt expired') {
        error.status = 401
      }
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
  async getUser(ctx) {
    try {
      const userId = ctx.payload.userId
      const user = await usersService.getUser(userId)

      ctx.body = JSON.stringify({
        payload: {
          dto: user,
        },
        status: 200,
      })
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: error.status || 400 })
      )
    }
  }
}

module.exports = new UsersController()
