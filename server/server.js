require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('blog', (req, res) => {
  res.send('blog')
})

app.use(errorMiddleware)

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
    console.log('connected to MongoDB')
  }).catch((err) => {
    console.log(err)
  })