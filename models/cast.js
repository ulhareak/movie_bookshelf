

var bookshelf = require('../db/db')


var cast = bookshelf.Model.extend({
    tableName : 'cast'
})

module.exports = cast