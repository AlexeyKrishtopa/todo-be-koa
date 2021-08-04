const User = require('./User')

class UsersRepository {
  async signup(user) {
    const existUser = await User.findOne({ login: user.login })

    if (existUser) {
      throw new Error('User alredy exist')
    }

    const newUser = await User.create(user)

    return newUser
  }
  async signin(user) {
    const authenticatedUser = await User.findOne(user)

    if (!authenticatedUser) {
      throw new Error('wrong login or password')
    }

    return authenticatedUser
  }
  async updateUser(userId, user) {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    })

    if (!updatedUser) {
      throw new Error(`user with id: ${userId} dosn't exist`)
    }

    return updatedUser
  }
  async getUser(userId) {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error(`user with id: ${userId} dosn't exist`)
    }

    return user
  }
}

module.exports = new UsersRepository()