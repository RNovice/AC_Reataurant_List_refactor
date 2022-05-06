const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const port = 3000
const app = express()

app.engine('handlebars', exhbs.engine({ defaultLayout : 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})
