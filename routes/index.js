const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaruants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router