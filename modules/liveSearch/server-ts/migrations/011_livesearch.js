exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('live_search', table => {
      table.increments('id');
      table.string('gear_category');
      table.string('query_item');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('live_search_user', table => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('search_id')
        .unsigned()
        .references('id')
        .inTable('live_search')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('live_search'), knex.schema.dropTable('live_search_user')]);
};
