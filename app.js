const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Sets up enviroment variables for config
require('dotenv').config();

app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

// const router = require('./routes/routes.js')
// app.use(router)



app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: `Not found` } })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})


module.exports = app
