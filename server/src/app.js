const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const config = require('./config/config')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, '../public')))

require('./userPassport')
require('./routes')(app)

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
