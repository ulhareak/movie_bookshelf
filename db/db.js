
const dotenv = require('dotenv')
const envs = dotenv.config()
var  knex  = require("knex");

const knexfile = require('./knexfile')

knex = knex(knexfile.development)

var  bookshelf = require('bookshelf')(knex)
bookshelf.plugin(require('bookshelf-bulk-save'));
bookshelf.plugin('registry');

module.exports = bookshelf