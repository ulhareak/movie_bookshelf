/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', ( table)=>{
        table.increments('id').primary();
        table.string('first_name' , 10).notNullable();
        table.string('last_name' , 10 ).notNullable();
        table.string('email' , 20 ).notNullable().unique();
        table.string('mobile').notNullable().unique() ;
        table.string('password').notNullable(); 
        table.boolean('is_admin').notNullable() //defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('last_seen').defaultTo(knex.fn.now())
        table.boolean('is_deleted').notNullable().defaultTo(false)
    }).
    createTable('user_tokens' , (table)=>{
        table.integer('user_id').notNullable().primary()
        table.string('token').unique()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('user')
    .dropTable('user_tokens')
  
};
