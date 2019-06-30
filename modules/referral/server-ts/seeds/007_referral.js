import { returnId, truncateTables } from "@gqlapp/database-server-ts";

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ["referral"]);

  await returnId(
    knex("referral").insert({
      user_id: 1,
      referred_id: 2,
      is_verified: false
    })
  );
  await returnId(
    knex("referral").insert({
      user_id: 1,
      referred_id: 3,
      is_verified: false
    })
  );
}
