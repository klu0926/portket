const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const routes = require("./routes")

// view engine
const handlebars = require("express-handlebars")
app.engine('hbs', handlebars({defaultLayout: 'main', extends: '.hbs'}))
app.set('view engine', 'hbs')

// use
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// routes
app.use(routes)

app.listen(port, () => {
  console.info(`Server running on port ${port}`)
})