import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'user_address',
    'user_identification',
    'user_verification',
    'user_endorsement',
    'user_follower',
    'user_portfolio',
    'user_remark',
    'auth_certificate',
    'auth_facebook',
    'auth_github',
    'auth_linkedin'
  ]);

  const admin_id = await returnId(knex('user')).insert({
    username: 'admin',
    email: 'admin@example.com',
    password_hash: await bcrypt.hash('admin123', 12),
    role: 'admin',
    is_active: true
  });

  await returnId(
    knex('auth_certificate').insert({
      serial: 'admin-123',
      user_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_profile').insert({
      first_name: 'admin',
      last_name: 'lenshood',
      website: 'www.google.com',
      about: 'i am a super admin',
      designation: 'CEO',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      rating: '4',
      response_time: 'few seconds',
      acceptance_rate: '90%',
      mobile: '9876543211',
      flag: 'admin',
      user_id: admin_id[0],
      referrer_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_address').insert({
      street_address_1: 'stree_address_1',
      street_address_2: 'stree_address_1',
      city: 'city',
      state: 'state',
      pin_code: 'pin_code',
      user_id: admin_id[0]
    })
  );
  await returnId(
    knex('user_address').insert({
      street_address_1: 'stree_address_11',
      street_address_2: 'stree_address_11',
      city: 'city1',
      state: 'state1',
      pin_code: 'pin_code1',
      user_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_verification').insert({
      user_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_portfolio').insert({
      platform: 'google',
      portfolio_url: 'www.google.com',
      user_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_portfolio').insert({
      platform: 'yahoo',
      portfolio_url: 'www.yahoo.com',
      user_id: admin_id[0]
    })
  );

  const user_id = await returnId(knex('user')).insert({
    username: 'user',
    email: 'user@example.com',
    password_hash: await bcrypt.hash('user1234', 12),
    role: 'user',
    is_active: true
  });

  await returnId(
    knex('user_profile').insert({
      first_name: 'user',
      last_name: 'lenshood',
      website: 'www.google.com',
      about: 'i am a cool user',
      designation: 'CTO',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      rating: '3',
      response_time: 'few minutes',
      acceptance_rate: '80%',
      mobile: '3876543211',
      flag: 'user',
      user_id: user_id[0],
      referrer_id: admin_id[0]
    })
  );

  await returnId(
    knex('user_address').insert({
      street_address_1: 'stree_address_11',
      street_address_2: 'stree_address_11',
      city: 'city1',
      state: 'state1',
      pin_code: 'pin_code1',
      user_id: user_id[0]
    })
  );

  await returnId(
    knex('user_address').insert({
      street_address_1: 'stree_address_112',
      street_address_2: 'stree_address_112',
      city: 'city12',
      state: 'state12',
      pin_code: 'pin_code12',
      user_id: user_id[0]
    })
  );

  await returnId(
    knex('user_portfolio').insert({
      platform: 'google',
      portfolio_url: 'www.google.com',
      user_id: user_id[0]
    })
  );

  await returnId(
    knex('user_portfolio').insert({
      platform: 'yahoo',
      portfolio_url: 'www.yahoo.com',
      user_id: user_id[0]
    })
  );

  await returnId(
    knex('user_verification').insert({
      user_id: user_id[0]
    })
  );
}
