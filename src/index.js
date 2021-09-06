/* eslint-disable no-undef */
const Koa = require('koa')
const mongoose = require('mongoose')
const json = require('koa-json')
const logger = require('koa-logger')
const { todoRouter } = require('./routers/todoRouter')
const { userRouter } = require('./routers/userRouter')
const cors = require('@koa/cors')
const bodyParser = require('koa-body-parser')
const dotenv = require('dotenv')
const http = require('http')
const socket = require('socket.io')
const { isAuthSocket } = require('./utils/isAuthSocket')
const todoService = require('./todos/todoService')
const userService = require('./users/userService')

dotenv.config()

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
})

app.use(logger())
app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(todoRouter.routes()).use(todoRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

io.use((socket, next) => {
  const { accessToken } = socket.handshake.auth

  if (isAuthSocket(accessToken)) {
    const payload = accessToken.split('.')[1]

    const decodedPayload = Buffer.from(payload, 'base64')

    socket.payload = JSON.parse(decodedPayload)

    next()
  } else {
    next(new Error('unauthorized event'))
  }
})

io.on('connection', (socket) => {
  socket.on('error', (err) => {
    if (err) {
      socket.disconnect()
    }
  })

  socket.join(socket.payload.userId)

  socket.on('addTodo', async (description) => {
    const todo = await todoService.createTodo(
      description,
      socket.payload.userId
    )
    io.to(socket.payload.userId).emit('todoAdded', todo)
  })

  socket.on('removeTodo', async (todoId) => {
    const todo = await todoService.deleteTodo(todoId, socket.payload.userId)
    io.to(socket.payload.userId).emit('todoRemoved', todo)
  })

  socket.on('updateTodo', async (todo) => {
    const newTodo = await todoService.updateTodo(
      todo._id,
      todo,
      socket.payload.userId
    )
    io.to(socket.payload.userId).emit('todoUpdated', newTodo)
  })

  socket.on('toggleTodos', async (isCompleted) => {
    const updatedTodos = await todoService.updateTodosCompleted(
      isCompleted,
      socket.payload.userId
    )
    io.to(socket.payload.userId).emit('todosToggled', updatedTodos)
  })

  socket.on('clearTodos', async () => {
    const restTodos = await todoService.deleteCompletedTodos(
      socket.payload.userId
    )

    io.to(socket.payload.userId).emit('todosCleared', restTodos)
  })

  socket.on('dragTodo', async (todo) => {
    await todoRepoistory.updateTodo(todo._id, todo, socket.payload.userId)

    io.to(socket.payload.userId).emit('todoDragged')
  })

  socket.on('updateProfile', async (user) => {
    const newUser = await userService.updateUser(socket.payload.userId, user)

    socket.emit('profileUpdated', newUser)
  })
})

io.on('connect_error', (error) => {
  console.log(error.message)
})

const startApp = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log(`connected to mongoDb: ${process.env.DB_URL}`)
      }
    )
    server.listen(process.env.PORT, () => {
      console.log(`server is working on PORT: ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
