const refreshTokenRepository = require('./refreshTokenRepository')

class RefreshTokenService {
  async appendToken(userId, refreshToken) {
    await refreshTokenRepository.appendToken(userId, refreshToken)
  }

  async removeTokens(userId) {
    await refreshTokenRepository.removeTokens(userId)
  }

  async isValidToken(userId, refreshToken) {
    const isValidToken = await refreshTokenRepository.isValidToken(
      userId,
      refreshToken
    )

    return isValidToken
  }

  async replaceToken(userId, oldRefreshToken, newRefreshToken) {
    await refreshTokenRepository.replaceToken(userId, oldRefreshToken, newRefreshToken)
  }
}

module.exports = new RefreshTokenService()
