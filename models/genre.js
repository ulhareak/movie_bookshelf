

var bookshelf = require('../db/db')


var genre = bookshelf.Model.extend({
    tableName : 'genre'
})

module.exports = genre