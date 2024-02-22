const express = require('express')
const app = express.Router()

require('./endpoints/Testauth')(app)
require('./endpoints/BookingId')(app)
require('./endpoints/post')(app)
require('./endpoints/movies')(app)
require('./endpoints/company')(app)
require('./endpoints/cinema')(app)
require('./endpoints/location')(app)

module.exports = app;