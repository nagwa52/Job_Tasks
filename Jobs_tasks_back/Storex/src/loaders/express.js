const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const Sentry = require("@sentry/node")
const multer = require('multer');
const helmet = require("helmet")
const xss = require("xss-clean")
const upload = multer();
const app = express()



// Sentry.init({})
app.use(cors())
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.errorHandler());
app.use(helmet())

app.use(xss())

app.use( bodyParser.json({limit: '10mb'}) );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 

app.use('/public', express.static('public'));
require('../routes')({app})

module.exports = app