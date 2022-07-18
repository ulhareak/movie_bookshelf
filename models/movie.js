




var bookshelf = require('../db/db')

var director = require('./director').director
var cast = require('./cast').cast

var movie = bookshelf.Model.extend({
    tableName : 'movie',
    director(){
        return this.hasMany(director , 'movie')
    },
    cast(){
        return this.hasMany(cast , 'movie')
    }
})

module.exports = movie