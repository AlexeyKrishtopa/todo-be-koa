const RefreshToken = require('./RefreshToken')
const User = require('../users/User')

class RefreshTokenRepository {
  async appendToken(userId, refreshToken) {
    const appendedRefreshToken = await RefreshToken.create({
      refreshToken,
      user: userId,
    })

    await User.findByIdAndUpdate(
      userId,
      { $push: { refreshTokens: appendedRefreshToken._id } },
      { new: true, useFindAndModify: false }
    )
  }

  async removeTokens(userId) {
    await RefreshToken.deleteMany({ user: userId })
    await User.findByIdAndUpdate(userId, { $set: { refreshTokens: [] } })
  }

  async isValidToken(userId, refreshToken) {
    const token = await RefreshToken.findOne({ refreshToken, user: userId })

    return token ? true : false
  }

  async replaceToken(userId, oldRefreshToken, newRefreshToken) {
    const oldToken = await RefreshToken.findOneAndDelete({
      refreshToken: oldRefreshToken,
      user: userId,
    })

    await User.findByIdAndUpdate(
      userId,
      { $pull: { tokens: oldToken._id } },
      { new: true, useFindAndModify: true }
    )

    const newToken = RefreshToken.create({
      refreshToken: newRefreshToken,
      user: userId,
    })

    await User.findByIdAndUpdate(
      userId,
      { $push: { refreshTokens: newToken._id } },
      { new: true, useFindAndModify: false }
    )
  }
}

module.exports = new RefreshTokenRepository()
