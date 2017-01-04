
exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference_type', function(table){
    table.increments();
    table.text('type').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('preference_type');
};
