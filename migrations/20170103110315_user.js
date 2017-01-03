
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table){
    table.increments(),
    table.text('first_name');
    table.text('last_name');
    table.text('username').notNullable().unique();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.datetime('joined').notNullable();
    ;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
