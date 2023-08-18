const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const routes = require("./routes")
const session = require('express-session')
const usePassport = require('./config/passport')

// dotenv
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// view engine
const { engine } = require("express-handlebars")
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// use
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // 10 mins
    },
  })
);
usePassport(app)
// store res.locals
app.use((req, res, next)=> {
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