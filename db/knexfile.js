// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dotenv = require('dotenv')
const envs = dotenv.config()
// console.log(envs);
// console.log(typeof(process.env.DATABASE));
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database:  'movie' , // process.env.DATABASE, // 'movie',  
      user: 'avdhut' , // process.env.USER  , //'avdhut',
      password:  'avdhut' //process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
