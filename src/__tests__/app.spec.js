process.env.NODE_ENV = 'test'

require('dotenv').config()
const server = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')

const { clearDatabase } = require('../db')

let app = null

describe('todos', () => {
  beforeAll(async () => {
    app = await request(server)
    await mongoose.connect(process.env.TEST_DB_URL)
  })

  afterEach(async () => {
    await mongoose.disconnect()
    await clearDatabase()
    await mongoose.connect(process.env.TEST_DB_URL)
  })

  it('should return all todos with length = 5', async () => {
    const res = await app
      .get('/api/todos')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const body = JSON.parse(res.text)

    expect(body.payload.list.length).toBe(5)
  })

  it('input and output todo description should be equile', async () => {
    const res = await app
      .post('/api/todos')
      .send({ description: 'new test todo' })
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const body = JSON.parse(res.text)

    expect(body.payload.dto.description).toBe('new test todo')
  })

  it('length after removed should be 4', async () => {
    const firstRes = await app
      .get('/api/todos')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const todoToRemove = JSON.parse(firstRes.text).payload.list[0]

    await app
      .delete(`/api/todos/${todoToRemove._id}`)
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const secondRes = await app
      .get('/api/todos')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const body = JSON.parse(secondRes.text)

    expect(body.payload.list.length).toBe(4)
  })

  it('input todo should be equile updated todo', async () => {
    const firstRes = await app
      .get('/api/todos')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const todoToUpdate = JSON.parse(firstRes.text).payload.list[0]

    const res = await app
      .put(`/api/todos/${todoToUpdate._id}`)
      .send({ isCompleted: true })
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN_USER_1}` })
      .expect(200)

    const body = JSON.parse(res.text)

    expect(body.payload.dto.isCompleted).toBe(true)
  })
})
