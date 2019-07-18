import { returnId, truncateTables } from "@gqlapp/database-server-ts";

let gearCategory = [
  "Cameras",
  "Lenses",
  "Tripods and Support",
  "Lighting",
  "Studio Space"
];

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ["live_search", "live_search_user"]);

  await Promise.all(
    [...Array(10).keys()].map(async i => {
      let gc = gearCategory[Math.floor(Math.random() * gearCategory.length)];
      return returnId(knex("live_search")).insert({
        gear_category: gc,
        query_item: `Item ${i + 1}`
      });
    })
  );

  await Promise.all(
    [...Array(10).keys()].map(async i => {
      return returnId(knex("live_search_user")).insert({
        user_id: Math.floor(Math.random() * 5) + 1,
        search_id: i + 1
      });
    })
  );

  await Promise.all(
    [...Array(10).keys()].map(async i => {
      return returnId(knex("live_search_user")).insert({
        user_id: Math.floor(Math.random() * 5) + 1,
        search_id: Math.floor(Math.random() * 10) + 1
      });
    })
  );
}
