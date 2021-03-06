require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.DB_PORT
const bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/images', express.static('./images'))

// routes
const api = require('./src/routes/index')
app.use('/api', api)

app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))
