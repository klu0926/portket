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

function useBrowserSync() {
  // browserSync (auto reload on changes)
  var browserSync = require('browser-sync')
  browserSync({
    proxy: `http://localhost:3000`, // my server port
    port: 3001, // browserSync's port (view)
    open: false, // don't reopen a tab
    files: ['views/**/*.hbs'], // ** any directory, subdirectory, no none
  })
}

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  useBrowserSync()
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
  storeOption = {
    host: process.env.JAWDB_HOST,
    user: process.env.JAWDB_USER,
    password: process.env.JAWDB_PASSWORD,
    database: process.env.JAWDB_DATABASE,
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
// store res.locals, use in the view
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
