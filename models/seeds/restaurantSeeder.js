const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

const db = require('../../config/mongoose')

db.once('open', () => {

    restaurantList.results.forEach(info => {
        Restaurant.create(info)
    } )

    console.log('done')
})