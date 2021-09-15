const mongoose = require('mongoose')
const Todo = require('../todos/Todo')
const User = require('../users/User')
require('dotenv').config()
const bcrypt = require('bcrypt')
const todoService = require('../todos/todoService')

const fillDatabase = async () => {
  await mongoose.connect(process.env.TEST_DB_URL)

  const hashPassword = bcrypt.hashSync('user', 5)

  const users = [
    { login: 'user1', password: hashPassword },
    { login: 'user2', password: hashPassword },
  ]

  await User.insertMany(users)

  const firstUser = await User.find({ login: 'user1' })
  const secondUser = await User.find({ login: 'user2' })

  const firstUserId = firstUser._id
  const secondUserId = secondUser._id

  for (let i = 0; i < 5; i++) {
    await todoService.createTodo(`user 1 todo ${i}`, firstUserId)
  }

  for (let i = 0; i < 5; i++) {
    await todoService.createTodo(`user 2 todo ${i}`, secondUserId)
  }

  await mongoose.disconnect()
}

const clearDatabase = async () => {
  await mongoose.connect(process.env.TEST_DB_URL)

  await Todo.deleteMany()

  const firstUser = await User.findOne({ login: 'user1' })
  const secondUser = await User.findOne({ login: 'user2' })

  const firstUserId = firstUser._id
  const secondUserId = secondUser._id

  for (let i = 0; i < 5; i++) {
    await todoService.createTodo(`user 1 todo ${i}`, firstUserId)
  }

  for (let i = 0; i < 5; i++) {
    await todoService.createTodo(`user 2 todo ${i}`, secondUserId)
  }

  await mongoose.disconnect()
}

module.exports = { clearDatabase, fillDatabase }
