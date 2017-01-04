
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_preference', function(table){
    table.increments();
    table.text('name').notNullable();
    table.integer('user_id').references('user.id').onDelete('CASCADE');
    table.integer('pref_type_id').references('preference_type.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_preference');
};
