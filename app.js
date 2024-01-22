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
const fs = require('fs')

function useBrowserSync() {
  // browserSync (auto reload on changes)
  var browserSync = require('browser-sync')
  browserSync({
    proxy: `http://localhost:3000`, // my server port
    port: 3001, // browserSync's port (view)
    open: false, // don't reopen a tab
    notify: false, // disable notifications
    files: ['public/**/*.*'], // ** any directory, subdirectory, no none
  })
}

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

// Create Session Store to SQL database
const sessionMinutes = 600 // 10hrs
const expirationDuration = 1000 * 60 * sessionMinutes

let storeOption = {
  createDatabaseTable: true,
  clearExpired: true,
  checkExpirationInterval: 900000, //15mins
  expiration: expirationDuration,
  schema: {
    tableName: 'Sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
  // 代表在每次與使用者互動後，不會強制把 session 儲存，除非 session 有變動
  resave: false,
  saveUninitialized: false,
}
if (process.env.NODE_ENV !== 'production') {
  // local
  const db = config.development
  storeOption = {
    ...storeOption,
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database,
  }
} else {
  // heroku
  storeOption = {
    ...storeOption,
    host: process.env.JAWDB_HOST,
    user: process.env.JAWDB_USER,
    password: process.env.JAWDB_PASSWORD,
    database: process.env.JAWDB_DATABASE,
  }
}
const sessionStore = new MySQLStore(storeOption)

// Session cookie option
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
// Other middleware
app.use(
  express.static('public', {
    maxAge: 0,

    setHeaders: (res, filePath) => {
      // Set ETag based on the file's last modified timestamp
      const stat = fs.statSync(filePath)
      const lastModified = stat.mtime.toUTCString()
      const etag = `W/"${lastModified}"`

      res.setHeader('ETag', etag)
      res.setHeader('Last-Modified', lastModified)
    },
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
// store res.locals, use in the view
app.use((req, res, next) => {
  // passport (.locals pass to handlebars)
  res.locals.isAuthenticated = req.isAuthenticated()
  if (req.user) {
    const currentUser = req.user
    delete currentUser.password
    res.locals.currentUser = currentUser
  }
  res.locals.test = 'my test message'
  // flash
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use(routes)

app.listen(port, () => {
  console.info(`Server running on port ${port}`)
  // browserSync
  if (process.env.BROWSER_SYNC === 'sync') {
    useBrowserSync()
  }
})
