




var bookshelf = require('../db/db')
var director = require('./director')
var cast = require('./cast')


var people = bookshelf.Model.extend({
    tableName : 'people',
    director(){
        return this.hasMany(director , 'director_id')
    },
    cast(){
        this.hasMany(cast , 'actor')
    }
})

module.exports = people