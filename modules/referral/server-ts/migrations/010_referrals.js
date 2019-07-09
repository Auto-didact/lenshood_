exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('referral', table => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.boolean('is_verified').defaultTo(false);
      table
        .integer('referred_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('referrals')]);
};
