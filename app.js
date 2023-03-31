var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { conect } = require('./db/conect')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accessRouter = require('./routes/access')
var cuponesRouter = require('./routes/cuponesRoute')

var app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave:true,
    saveUninitialized: true
}))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/apibe', accessRouter)
app.use('/cupon', cuponesRouter)

conect()

module.exports = app;
