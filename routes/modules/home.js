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
            //將與關鍵字相符的資料放入keyword中
            let keyword = []
            const arr = ['name', 'name_en', 'category']
            arr.forEach(each => {
                keyword.push(...(restaurants.filter(
                    rtr => rtr[each].toLowerCase().includes(req.query.keyword.toLowerCase()))))
            })
            //移除重複的資料
            const filteredSearchResults = keyword.filter((item,index,arr)=>{
                return arr.indexOf(item) === index
            })
            //根據排序方式渲染
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
