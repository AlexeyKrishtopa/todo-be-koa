const server = require('./app')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(
      `connected to mongoDb: ${
        process.env.NODE_ENV === 'test'
          ? process.env.TEST_DB_URL
          : process.env.DB_URL
      }`
    )
  }
)

server.listen(process.env.PORT, () => {
  console.log(`server is working on PORT: ${process.env.PORT}`)
})
