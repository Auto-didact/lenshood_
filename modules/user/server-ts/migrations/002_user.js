exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users').then(function(exists) {
      if (!exists)
        knex.schema.createTable('user', table => {
          table.increments();
          table.string('username').unique();
          table.string('email').unique();
          table.string('password_hash');
          table.string('role').defaultTo('user');
          table.boolean('is_active').defaultTo(false);
          table.timestamps(false, true);
        });
    }),
    knex.schema.hasTable('user_profile').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('user_address').then(function(exists) {
      if (!exists)
        knex.schema.createTable('user_address', table => {
          table.increments();
          table.string('street_address1');
          table.string('street_address2');
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
        });
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
    knex.schema.hasTable('user_identification').then(function(exists) {
      if (!exists)
        knex.schema.createTable('user_identification', table => {
          table.increments();
          table.string('type');
          table.string('document_url');
          table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');

          // To Do Combine this into one
          table.boolean('is_verified').defaultTo(false);
          table
            .integer('admin_id')
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');
          table.timestamps(false, true);
        });
    }),
    knex.schema.hasTable('user_verification').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('user_driving_license').then(function(exists) {
      if (!exists)
        knex.schema.createTable('user_driving_license', table => {
          table.increments();
          table.string('transaction_id');
          table.string('driving_license_id');
          table.string('issue_date');
          table.string('name');
          table.string('father_or_husband');
          table.string('image_url');
          table.string('blood_group');
          table.string('dob');
          table.string('cov');
          table.string('address');
          table.string('validity_transport');
          table.string('validity_non_transport');

          table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');
          table.timestamps(false, true);
        });
    }),
    knex.schema.hasTable('user_mobile').then(function(exists) {
      if (!exists)
        knex.schema.createTable('user_mobile', table => {
          table.increments();
          table.string('mobile');
          table.integer('otp');
          table.boolean('is_verified').defaultTo(false);

          table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');
          table.timestamps(false, true);
        });
    }),
    knex.schema.hasTable('user_endorsement').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('user_follower').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('user_portfolio').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('user_remark').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('auth_certificate').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('auth_facebook').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('auth_google').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('auth_github').then(function(exists) {
      if (!exists)
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
        });
    }),
    knex.schema.hasTable('auth_github').then(function(exists) {
      if (!exists)
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
        });
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
    knex.schema.dropTable('user_remark'),
    knex.schema.dropTable('user_portfoio'),
    knex.schema.dropTable('user_follower'),
    knex.schema.dropTable('user_endorsement'),
    knex.schema.dropTable('user_verification'),
    knex.schema.dropTable('user_driving_license'),
    knex.schema.dropTable('user_mobile'),
    knex.schema.dropTable('user_identification'),
    knex.schema.dropTable('user_address'),
    knex.schema.dropTable('user_profile'),
    knex.schema.dropTable('user')
  ]);
};
