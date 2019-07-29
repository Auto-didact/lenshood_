import { STALE } from '../constants/order_states';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order', table => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.string('state').defaultTo(STALE);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(false, true);
    }),

    // Order Details
    knex.schema.createTable('order_detail', table => {
      table.increments('id');
      table
        .integer('listing_id')
        .unsigned()
        .references('id')
        .inTable('listing')
        .onDelete('CASCADE');
      table.integer('days');
      table.string('start_date');
      table.string('end_date');
      table.integer('total_rent');
      table.integer('refundable_deposit');
      table.integer('service_fee');
      table.integer('rent_per_day');
      table.integer('rent_per_week');

      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(false, true);
    }),

    // payment table
    knex.schema.createTable('order_payment', table => {
      table.increments('id');
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE');
      table.string('rp_transaction_id');
      table.string('rp_transaction_amount');

      table.timestamps(false, true);
    }),

    // pickup/drop delivery table
    knex.schema.createTable('order_delivery', table => {
      table.increments('id');
      table
        .integer('hustler_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE');
      table.string('source');
      table.string('destination');
      table.string('type');
      table.string('delivery_date_time');

      table.boolean('is_active').defaultTo(true);
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order'),
    knex.schema.dropTable('order_detail'),
    knex.schema.dropTable('order_payment'),
    knex.schema.dropTable('order_delivery')
  ]);
};
