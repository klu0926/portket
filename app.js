const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const usePassport = require('./config/passport')
const config = require('./config/config.json')
const flash = require('connect-flash')
const handlebarHelper = require('./handlebar-helper')

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// view engine
const { engine } = require('express-handlebars')
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: handlebarHelper,
  })
)
app.set('view engine', 'hbs')

// Session store
const sessionMinutes = 600 // 10hrs
let storeOption = {
  expiration: 1000 * 60 * sessionMinutes,
  createDatabaseTable: true,
  schema: {
    tableName: 'Sessions',
  },
}
if (process.env.NODE_ENV !== 'production') {
  // local
  const db = config.development
  storeOption = {
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database,
  }
} else {
  // heroku
  const db = new URL(config.production.use_env_variable)
  storeOption = {
    host: db.hostname,
    user: db.username,
    password: db.password,
    database: db.pathname.substring(1),
  }
}
const sessionStore = new MySQLStore(storeOption)

// Middleware
const COOKIE_HOUR = 24
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * COOKIE_HOUR,
    },
  })
)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
// store res.locals
app.use((req, res, next) => {
  // passport
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.currentUser = req.user
  res.locals.test = 'test message'
  // flash
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use(routes)

app.listen(port, () => {
  console.info(`Server running on port ${port}`)
})