const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Sets up enviroment variables for config
require('dotenv').config();

app.disable('x-powered-by')
app.use(cors({ exposedHeaders: 'Auth' }))
app.use(morgan('dev'))
app.use(bodyParser.json())
// app.use(bodyParser.json({ limit: ‘50mb’ }));

const routes = require('./routes');


app.use('/auth', routes.auth);
app.use('/api/users', routes.users);
app.use('/api/flights', routes.flights);
app.use('/api/trips', routes.trips);


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
