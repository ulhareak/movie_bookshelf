/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

   return knex.schema.createTable('movie' , (table)=>{
        table.increments('id').primary();
        table.integer('genre_id').references('genre.id').onDelete('SET NULL');
        table.string('title' , 20 ).notNullable().unique();
        table.float('duration');
        table.text('info');
        table.boolean('is_deleted').notNullable().defaultTo(false)

    })
    .createTable('cast' , (table)=>{
        table.increments('id').primary();
        table.integer('movie').references('movie.id').onDelete('CASCADE');
        table.integer('actor').references('people.id').onDelete('CASCADE');
    }).createTable('director', (table)=>{
        table.increments('id').primary();
        table.integer('movie').references('movie.id').onDelete('CASCADE');
        table.integer('director_id').references('people.id').onDelete('CASCADE');
    } )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.
    dropTable('cast').
    dropTable('director').
    dropTable('movie')
  
};
