exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', table => {
      table.increments();
      table.string('username').unique();
      table.string('email').unique();
      table.string('password_hash');
      table.string('role').defaultTo('user');
      table.boolean('is_active').defaultTo(false);
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_profile', table => {
      table.increments();
      table.string('first_name');
      table.string('last_name');

      table.boolean('is_verified').defaultTo(false);
      table.boolean('is_available').defaultTo(true);
      table.string('website');
      table.string('about');
      table.string('designation');
      table.string('avatar');
      table.string('rating');
      table.string('response_time');
      table.string('acceptance_rate');
      table.string('mobile');
      table.string('flag');

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('referrer_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_address', table => {
      table.increments();
      table.string('street_address_1');
      table.string('street_address_2');
      table.string('city');
      table.string('state');
      table.string('pin_code');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    // // knex.schema.createTable('user_payment', table => {
    // //   table.increments();
    // //   table
    // //     .integer('address_id')
    // //     .unsigned()
    // //     .references('id')
    // //     .inTable('user_address')
    // //     .onDelete('CASCADE');
    // //   table.timestamps(false, true);
    // //   table
    // //     .integer('user_id')
    // //     .unsigned()
    // //     .references('id')
    // //     .inTable('user')
    // //     .onDelete('CASCADE');
    // //   table.timestamps(false, true);
    // }),
    knex.schema.createTable('user_identification', table => {
      table.increments();
      table.string('type');
      table.string('document_url');
      table.boolean('is_verified').defaultTo(false);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_verification', table => {
      table.increments();
      table.boolean('is_email_verified').defaultTo(false);
      table.boolean('is_mobile_verified').defaultTo(false);
      table.boolean('is_address_verified').defaultTo(false);
      table.boolean('is_id_verified').defaultTo(false);
      table.boolean('is_referred').defaultTo(false);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_endorsement', table => {
      table.increments();
      table
        .integer('endorser_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('endorsee_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_follower', table => {
      table.increments();
      table
        .integer('follower_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('followee_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');

      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_portfolio', table => {
      table.increments();
      table.string('platform');
      table.string('portfolio_url');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('user_remark', table => {
      table.increments();
      table.string('remark');
      table.string('type'); // type will be used to know where the comment was made
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('auth_certificate', table => {
      table.increments();
      table.string('serial').unique();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('auth_facebook', table => {
      table.increments();
      table.string('fb_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('auth_google', table => {
      table.increments();
      table.string('google_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('auth_github', table => {
      table.increments();
      table.string('gh_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('auth_linkedin', table => {
      table.increments();
      table.string('ln_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auth_certificate'),
    knex.schema.dropTable('auth_facebook'),
    knex.schema.dropTable('auth_google'),
    knex.schema.dropTable('auth_github'),
    knex.schema.dropTable('auth_linkedin'),
    knex.schema.dropTable('user_profile'),
    knex.schema.dropTable('user')
  ]);
};
