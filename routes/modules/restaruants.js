const express = require("express")

const router = express.Router()

const Restaurant = require('../../models/restaurant')

//各餐廳詳細資料
router.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id)
        .lean()
        .then( restaurant => res.render('show',{ restaurant }))
        .catch(error => console.log(error))
})

//新增餐廳資料
router.post('/', (req, res) => {
    Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    
})

//刪除餐廳資料
router.delete('/:id', (req, res) => {
    Restaurant.findById(req.params.id)
        .then(rtr => rtr.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//編輯頁面
router.get('/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id)
        .lean()
        .then( restaurant => res.render('edit',{ restaurant }))
        .catch(error => console.log(error))
})

//編輯餐廳資料
router.put('/:id', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/restaurants/${req.params.id}`))
        .catch(error => console.log(error))
})

module.exports = router
