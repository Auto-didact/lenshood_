import bcrypt from "bcryptjs";
import { returnId, truncateTables } from "@gqlapp/database-server-ts";
// import { TimeoutError } from 'rxjs';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, [
    "user",
    "user_profile",
    "user_address",
    "user_identification",
    "user_verification",
    "user_endorsement",
    "user_follower",
    "user_portfolio",
    "user_remark",
    "auth_certificate",
    "auth_facebook",
    "auth_github",
    "auth_linkedin"
  ]);

  // admin user
  const admin_id = await returnId(knex("user")).insert({
    username: "admin",
    email: "admin@example.com",
    password_hash: await bcrypt.hash("admin123", 12),
    role: "admin",
    is_active: true
  });

  // admin certificate
  await returnId(
    knex("auth_certificate").insert({
      serial: "admin-123",
      user_id: admin_id[0]
    })
  );

  // admin profile
  await returnId(
    knex("user_profile").insert({
      first_name: "admin",
      last_name: "lenshood",
      website: "www.google.com",
      about: "i am a super admin",
      designation: "CEO",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      rating: "4",
      response_time: "few seconds",
      acceptance_rate: "90%",
      mobile: "9876543211",
      flag: "admin",
      user_id: admin_id[0],
      is_verified: true,
      referrer_id: admin_id[0]
    })
  );

  // admin addresses
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_1",
      street_address2: "stree_address_1",
      city: "city",
      state: "state",
      pin_code: "pin_code",
      user_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_11",
      street_address2: "stree_address_11",
      city: "city1",
      state: "state1",
      pin_code: "pin_code1",
      user_id: admin_id[0]
    })
  );

  // admin verification
  await returnId(
    knex("user_verification").insert({
      user_id: admin_id[0]
    })
  );

  // admin portfolios
  await returnId(
    knex("user_portfolio").insert({
      platform: "google",
      portfolio_url: "www.google.com",
      user_id: admin_id[0]
    })
  );

  // admin identification
  await returnId(
    knex("user_identification").insert({
      type: "aadhar",
      document_url: "www.yahoo.com",
      is_verified: true
    })
  );

  // Users
  // 20 Listings = 5*4 Users, 1 Admin
  // users
  const user_id1 = await returnId(knex("user")).insert({
    username: "user1",
    email: "user1@example.com",
    password_hash: await bcrypt.hash("user1234", 12),
    role: "user",
    is_active: true
  });
  const user_id2 = await returnId(knex("user")).insert({
    username: "user2",
    email: "user2@example.com",
    password_hash: await bcrypt.hash("user1234", 12),
    role: "user",
    is_active: true
  });
  const user_id3 = await returnId(knex("user")).insert({
    username: "user3",
    email: "user3@example.com",
    password_hash: await bcrypt.hash("user1234", 12),
    role: "user",
    is_active: true
  });
  const user_id4 = await returnId(knex("user")).insert({
    username: "user4",
    email: "user4@example.com",
    password_hash: await bcrypt.hash("user1234", 12),
    role: "user",
    is_active: true
  });

  // users profiles
  await returnId(
    knex("user_profile").insert({
      first_name: "user",
      last_name: "lenshood",
      website: "www.google.com",
      about: "i am a cool user",
      designation: "CTO",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      rating: "3",
      response_time: "few minutes",
      acceptance_rate: "80%",
      mobile: "3876543211",
      flag: "user",
      user_id: user_id1[0],
      referrer_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_profile").insert({
      first_name: "user",
      last_name: "lenshood",
      website: "www.google.com",
      about: "i am a cool user",
      designation: "CTO",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      rating: "3",
      response_time: "few minutes",
      acceptance_rate: "80%",
      mobile: "3876543211",
      flag: "user",
      user_id: user_id2[0],
      referrer_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_profile").insert({
      first_name: "user",
      last_name: "lenshood",
      website: "www.google.com",
      about: "i am a cool user",
      designation: "CTO",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      rating: "3",
      response_time: "few minutes",
      acceptance_rate: "80%",
      mobile: "3876543211",
      flag: "user",
      user_id: user_id3[0],
      referrer_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_profile").insert({
      first_name: "user",
      last_name: "lenshood",
      website: "www.google.com",
      about: "i am a cool user",
      designation: "CTO",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      rating: "3",
      response_time: "few minutes",
      acceptance_rate: "80%",
      mobile: "3876543211",
      flag: "user",
      user_id: user_id4[0],
      referrer_id: admin_id[0]
    })
  );

  // users addresses
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_11",
      street_address2: "stree_address_11",
      city: "city1",
      state: "state1",
      pin_code: "pin_code1",
      user_id: user_id1[0]
    })
  );
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_112",
      street_address2: "stree_address_112",
      city: "city12",
      state: "state12",
      pin_code: "pin_code12",
      user_id: user_id1[0]
    })
  );

  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_11",
      street_address2: "stree_address_11",
      city: "city1",
      state: "state1",
      pin_code: "pin_code1",
      user_id: user_id2[0]
    })
  );
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_112",
      street_address2: "stree_address_112",
      city: "city12",
      state: "state12",
      pin_code: "pin_code12",
      user_id: user_id2[0]
    })
  );

  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_11",
      street_address2: "stree_address_11",
      city: "city1",
      state: "state1",
      pin_code: "pin_code1",
      user_id: user_id3[0]
    })
  );
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_112",
      street_address2: "stree_address_112",
      city: "city12",
      state: "state12",
      pin_code: "pin_code12",
      user_id: user_id3[0]
    })
  );

  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_11",
      street_address2: "stree_address_11",
      city: "city1",
      state: "state1",
      pin_code: "pin_code1",
      user_id: user_id4[0]
    })
  );
  await returnId(
    knex("user_address").insert({
      street_address1: "stree_address_112",
      street_address2: "stree_address_112",
      city: "city12",
      state: "state12",
      pin_code: "pin_code12",
      user_id: user_id4[0]
    })
  );

  // users portfolios
  await returnId(
    knex("user_portfolio").insert({
      platform: "google",
      portfolio_url: "www.google.com",
      user_id: user_id1[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "yahoo",
      portfolio_url: "www.yahoo.com",
      user_id: user_id1[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "google",
      portfolio_url: "www.google.com",
      user_id: user_id2[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "yahoo",
      portfolio_url: "www.yahoo.com",
      user_id: user_id2[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "google",
      portfolio_url: "www.google.com",
      user_id: user_id3[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "yahoo",
      portfolio_url: "www.yahoo.com",
      user_id: user_id3[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "google",
      portfolio_url: "www.google.com",
      user_id: user_id4[0]
    })
  );

  await returnId(
    knex("user_portfolio").insert({
      platform: "yahoo",
      portfolio_url: "www.yahoo.com",
      user_id: user_id4[0]
    })
  );

  // users verification
  // verified user: can order
  await returnId(
    knex("user_verification").insert({
      user_id: user_id1[0],
      is_email_verified: true,
      is_mobile_verified: true,
      is_id_verified: true,
      is_referred: true,
      is_address_verified: true
    })
  );
  // verification awaiting user
  await returnId(
    knex("user_verification").insert({
      user_id: user_id2[0],
      is_email_verified: true,
      is_mobile_verified: true,
      is_referred: true
    })
  );
  // verified email and phone user
  await returnId(
    knex("user_verification").insert({
      user_id: user_id3[0],
      is_email_verified: true,
      is_mobile_verified: true
    })
  );
  // no verification done user
  await returnId(
    knex("user_verification").insert({
      user_id: user_id4[0]
    })
  );

  // user identification
  await returnId(
    knex("user_identification").insert({
      type: "aadhar",
      document_url: "www.yahoo.com",

      // To Do Combine this
      is_verified: true,
      admin_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_identification").insert({
      type: "aadhar",
      document_url: "www.yahoo.com"
    })
  );

  // user and admin followers
  // admin followers
  await returnId(
    knex("user_follower").insert({
      follower_id: user_id2[0],
      followee_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_follower").insert({
      follower_id: user_id1[0],
      followee_id: admin_id[0]
    })
  );

  // user1,2 followers
  await returnId(
    knex("user_follower").insert({
      follower_id: user_id1[0],
      followee_id: user_id2[0]
    })
  );
  await returnId(
    knex("user_follower").insert({
      follower_id: user_id2[0],
      followee_id: user_id3[0]
    })
  );

  // user and admin endorsements
  await returnId(
    knex("user_endorsement").insert({
      endorser_id: user_id2[0],
      endorsee_id: admin_id[0]
    })
  );
  await returnId(
    knex("user_endorsement").insert({
      endorser_id: user_id1[0],
      endorsee_id: admin_id[0]
    })
  );

  await returnId(
    knex("user_endorsement").insert({
      endorser_id: admin_id[0],
      endorsee_id: user_id1[0]
    })
  );
  await returnId(
    knex("user_endorsement").insert({
      endorser_id: user_id2[0],
      endorsee_id: user_id1[0]
    })
  );

  // admin remarks
  await returnId(
    knex("user_remark").insert({
      user_id: user_id1[0],
      admin_id: admin_id[0],
      type: "profile",
      remark: "this is a good user!"
    })
  );
  await returnId(
    knex("user_remark").insert({
      user_id: user_id2[0],
      admin_id: admin_id[0],
      type: "profile",
      remark: "Someone verify this users document!"
    })
  );
}
