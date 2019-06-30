exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('listing', table => {
        table.increments('id');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('gear_category');
        table.string('gear_subcategory');
        table.string('description');
        table.string('status').defaultTo('Idle');
        table.boolean('is_active').defaultTo(true);
        table.boolean('is_featured').defaultTo(false);
        table.timestamps(false, true);
      })
      .createTable('listing_image', table => {
        table.increments('id');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.string('image_url');
        table.timestamps(false, true);
      })
      .createTable('listing_detail', table => {
        table.increments('id');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.string('condition');
        table.string('age');
        table.timestamps(false, true);
      })
      .createTable('listing_damage', table => {
        table.increments('id');
        table
          .integer('listing_detail_id')
          .unsigned()
          .references('id')
          .inTable('listing_detail')
          .onDelete('CASCADE');
        table.string('image_url');
        table.string('damage_detail');
        table.timestamps(false, true);
      })
      .createTable('listing_rental', table => {
        table.increments('id');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.integer('per_day');
        table.integer('per_week');
        table.integer('per_month');
        table.integer('replacement_value');
        table.timestamps(false, true);
      })
      .createTable('listing_content', table => {
        table.increments('id');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.string('gear');
        table.string('brand');
        table.string('model');
        table.string('serial');
        table.timestamps(false, true);
      })
      .createTable('listing_review', table => {
        table.increments('id');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table
          .integer('reviewer_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('comment');
        table.string('rating');
        table.timestamps(false, true);
      })
      .createTable('watchlist', table => {
        table.increments('id');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.string('should_notify').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('listing'),
    knex.schema.dropTable('listing_image'),
    knex.schema.dropTable('listing_detail'),
    knex.schema.dropTable('listing_damage'),
    knex.schema.dropTable('listing_rental'),
    knex.schema.dropTable('listing_content'),
    knex.schema.dropTable('review')
  ]);
};
