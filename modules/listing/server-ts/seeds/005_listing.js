import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, [
    'listing',
    'listing_image',
    'listing_detail',
    'listing_damage',
    'listing_rental',
    'listing_content',
    'listing_review'
  ]);

  await Promise.all(
    [...Array(20).keys()].map(async ii => {
      const listing = await returnId(knex('listing')).insert({
        gear_category: `Listing gear_category ${ii + 1}`,
        gear_subcategory: `Listing gear_subcategory ${ii + 1}`,
        description: `Listing description ${ii + 1}`
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('listing_image')).insert({
            listing_id: listing[0],
            image_url: `https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
          });
        })
      );
      await returnId(knex('listing_detail')).insert({
        listing_id: listing[0],
        condition: `Listing Condition ${ii + 1}`,
        repair_history: `Listing repair_history ${ii + 1}`,
        age: `Listing age ${ii + 1}`
      });
      await returnId(knex('listing_damage')).insert({
        listing_detail_id: listing[0],
        damage_detail: `Listing damage_detail ${ii + 1}`,
        image_url: `https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/12/2017/06/Damage-to-your-camera.jpg`
      });
      await returnId(knex('listing_rental')).insert({
        listing_id: listing[0],
        per_day: ii * 10,
        per_week: ii * 100,
        per_month: ii * 1000,
        replacement_value: ii * 10000
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('listing_content')).insert({
            listing_id: listing[0],
            gear: `Listing gear ${ii + 1}`,
            brand: `Listing brand ${ii + 1}`,
            model: `Listing model ${ii + 1}`,
            serial: `Listing serial ${ii + 1}`
          });
        })
      );
      await Promise.all(
        [...Array(3).keys()].map(async jj => {
          return returnId(knex('listing_review')).insert({
            listing_id: listing[0],
            comment: `Review title ${jj + 1} for Listing ${listing[0]}`,
            rating: jj + 2
          });
        })
      );
    })
  );
}
