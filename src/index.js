/* eslint-disable no-undef */
const Koa = require('koa')
const mongoose = require('mongoose')
const { todoRouter } = require('./routers/todoRouter')
const { userRouter } = require('./routers/userRouter')
const { imgRouter } = require('./routers/imgRouter')
const cors = require('@koa/cors')
const bodyParser = require('koa-body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(todoRouter.routes()).use(todoRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(imgRouter.routes()).use(imgRouter.allowedMethods())

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
    app.listen(process.env.PORT, () => {
      console.log(`server is working on PORT: ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
