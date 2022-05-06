const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.aruzh.mongodb.net/restauramt_list_CRUD?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongobd error')
})

db.once('open', () => { 
    console.log('mongodb connected')
})

module.exports = db