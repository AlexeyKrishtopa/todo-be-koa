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
  async signup(ctx, next) {
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

      ctx.body = {
        payload: {
          newUser,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.throw(
        error.status || 400,
        JSON.stringify({ message: error.message, status: 400 })
      )
    }
  }
  async signin(ctx, next) {
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

      // RefreshTokenService.appendToken(authenticatedUser._id, refreshToken)
      await refreshTokenService.appendToken(authenticatedUser._id, refreshToken)

      ctx.body = {
        payload: {
          accessToken,
          refreshToken,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: error.status || 404 }

      return next()
    }
  }
  // async signout(ctx, next) {}
  async updateUser(ctx, next) {
    try {
      let reqBody = ctx.request.body
      const userId = ctx.payload.userId

      const updatedUser = await usersService.updateUser(
        userId,
        JSON.parse(reqBody)
      )

      ctx.body = updatedUser

      return next()
    } catch (error) {
      ctx.body = { message: error.message, status: 400 }

      return next()
    }
  }
  async refreshTokens(ctx, next) {
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

      ctx.body = {
        payload: {
          refreshedTokens,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
  async getUser(ctx, next) {
    try {
      const userId = ctx.payload.userId
      const user = await usersService.getUser(userId)

      ctx.body = {
        payload: {
          dto: user,
        },
        status: 200,
      }

      return next()
    } catch (error) {
      ctx.throw(400, JSON.stringify({ message: error.message, status: 400 }))
    }
  }
}

module.exports = new UsersController()
