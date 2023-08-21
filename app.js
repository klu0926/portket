const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const usePassport = require('./config/passport')
const config = require('./config/config.json')

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// view engine
const { engine } = require('express-handlebars')
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// session store
let storeOption = {
  expiration: 1000 * 60 * 60, // 1 hours
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

// middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // 10 mins
    },
  })
)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
// store res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// routes
app.use(routes)

app.listen(port, () => {
  console.info(`Server running on port ${port}`)
})

console.log(process.env.MESSAGE)
