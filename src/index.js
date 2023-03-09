const server = require('./app')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log(`connected to mongoDb: ${process.env.DB_URL}`)
  }
)

server.listen(process.env.PORT || 3000, () => {
  console.log(`server is working on PORT: ${process.env.PORT}`)
})
