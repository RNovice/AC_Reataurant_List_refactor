const express = require('express')
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurants')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.aruzh.mongodb.net/restauramt_list_CRUD?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongobd error')
})

db.once('open', () => { 
    console.log('mongodb connected')
})

app.engine('handlebars', exhbs.engine({ defaultLayout : 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {

    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id)
        .lean()
        .then( restaurant => res.render('show',{ restaurant }))
        .catch(error => console.log(error))
})

app.get('/search', (req, res)  => {
    const sort = {}
    sort[req.query.sort] = 'asc'
    if (req.query.ADe){
        sort[req.query.sort] = `${req.query.ADe}`
    }
    Restaurant.find()
        .lean()
        .sort(sort)
        .then(restaurants => {
            const keyword = [
                ...(restaurants.filter( 
                    rtr => rtr.name.toLowerCase().includes(req.query.keyword.toLowerCase()))),
                ...(restaurants.filter( 
                    rtr => rtr.name_en.toLocaleLowerCase().includes(req.query.keyword.toLowerCase()))),
                ...(restaurants.filter( 
                    rtr => rtr.category.includes(req.query.keyword)))
            ]

            const filteredSearchResults = keyword.filter((item,index,arr)=>{
                return arr.indexOf(item) === index
            })

            res.render('index', { restaurants : filteredSearchResults, 
                keyword : req.query.keyword, 
                sort : req.query.sort,
                ADe : req.query.ADe !== 'asc' })            
        })
        .catch(error => console.error(error))

})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/restaurants', (req, res) => {
    Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    
})

app.delete('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id)
        .then(rtr => rtr.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id)
        .lean()
        .then( restaurant => res.render('edit',{ restaurant }))
        .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/restaurants/${req.params.id}`))
        .catch(error => console.log(error))
})

app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})
