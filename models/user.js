


var bookshelf = require('../db/db')

var user = bookshelf.Model.extend({
    tableName : 'user' , 
})

module.exports = user