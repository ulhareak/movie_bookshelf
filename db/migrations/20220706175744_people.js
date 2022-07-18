/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('people', (table)=>{
        table.increments('id').primary();
        table.string('name' , 10).notNullable().unique();
        // table.string('lname' , 10 ).notNullable();
        // table.string('gender' , 5 ).notNullable();
        // table.integer('age')
        table.boolean('is_deleted').notNullable().defaultTo(false)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema.dropTable('people')
  
};
