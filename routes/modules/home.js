const express = require("express")

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {

    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

router.get('/search', (req, res)  => {
    Restaurant.find()
        .lean()
        .sort({[req.query.sort]:`${req.query.ADe}`})
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

router.get('/add', (req, res) => {
    res.render('add')
})

module.exports = router