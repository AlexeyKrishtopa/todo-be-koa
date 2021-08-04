const usersRepository = require('./userRepository')

class UsersService {
  async signup(user) {
    const newUser = await usersRepository.signup(user)
    return newUser
  }
  async signin(user) {
    const authenticatedUser = usersRepository.signin(user)
    return authenticatedUser
  }
  async updateUser(userId, user) {
    const updatedUser = usersRepository.updateUser(userId, user)
    return updatedUser
  }
  async getUser(userId) {
    const user = usersRepository.getUser(userId)
    return user
  }
}

module.exports = new UsersService()
