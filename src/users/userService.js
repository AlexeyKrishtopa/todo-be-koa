/* eslint-disable no-undef */
const usersRepository = require('./userRepository')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const path = require('path')

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
    const imgFile = Buffer.from(
      user.imgSrc.replace('data:image/png;base64,', ''),
      'base64'
    )
    const fileName = uuid() + '.jpg'
    const filePath = path.resolve('static', fileName)

    fs.writeFileSync(filePath, imgFile)

    const updatedUser = await usersRepository.updateUser(userId, user, filePath)

    const newImgFile = fs.readFileSync(updatedUser.imgSrc, {
      encoding: 'base64',
    })

    updatedUser.imgSrc = 'data:image/png;base64,' + newImgFile

    const { firstName, secondName, age, mail, phone, imgSrc } = updatedUser

    return { firstName, secondName, age, mail, phone, imgSrc }
  }
  async getUser(userId) {
    const user = usersRepository.getUser(userId)
    return user
  }
}

module.exports = new UsersService()
