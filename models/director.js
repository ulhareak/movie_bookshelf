




var bookshelf = require('../db/db')


var director = bookshelf.Model.extend({
    tableName : 'director'
})

module.exports = director