const express = require("express")

const router = express.Router()

const Restaurant = require('../../models/restaurant')

//根目錄
router.get('/', (req, res) => {

    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

//搜尋功能
router.get('/search', (req, res)  => {
    Restaurant.find()
        .lean()
        .sort({[req.query.sort]:`${req.query.ADe}`})
        .then(restaurants => {
            const keyword = req.query.keyword
            const filteredSearchResults = restaurants.filter(rtr => {
                return rtr.name.toLowerCase().includes(keyword) || rtr.name_en.toLowerCase().includes(keyword) || rtr.category.toLowerCase().includes(keyword)
            })
            
            res.render('index', { restaurants : filteredSearchResults, 
                keyword : req.query.keyword, 
                sort : req.query.sort,
                ADe : req.query.ADe !== 'asc' })            
        })
        .catch(error => console.error(error))

})

//新增頁面
router.get('/add', (req, res) => {
    res.render('add')
})

module.exports = router
