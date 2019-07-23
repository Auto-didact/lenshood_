import { returnId, truncateTables } from '@gqlapp/database-server-ts';

let gearCategory = ['Cameras', 'Lenses', 'Tripods and Support', 'Lighting', 'Studio Space'],
  gearSubcategory = {
    Cameras: ["DSLR's", 'Point and Shoot cameras', 'Mirrorless cameras', 'Action cams', 'Cinema Cameras'],
    Lenses: ['DSLR Lenses', 'Mirrorless Lenses', 'Cinema Lenses'],
    Lighting: ['Photography Lighting', 'Video Lighting', 'Lighting Accesories'],
    'Tripods and Support': ['Tripods/Monopods', 'Gimbals/Stabilizers', 'Rigs/Sliders']
  },
  gearSubSubcategory = {
    'DSLR Lenses': ['Standard/Zoom Lens', 'Wide angle/Fish eye Lens', 'Fixed/Prime Lens'],
    'Mirrorless Lenses': ['Standard/Zoom Lens', 'Wide angle/Fish eye Lens', 'Fixed/Prime Lens']
  };

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, [
    'listing',
    'listing_image',
    'listing_detail',
    'listing_damage',
    'listing_rental',
    'listing_content',
    'listing_review',
    'user_reviews_likes'
  ]);

  await Promise.all(
    [...Array(20).keys()].map(async ii => {
      let gc = gearCategory[Math.floor(Math.random() * gearCategory.length)];
      let gsc = gearSubcategory[gc]
        ? gearSubcategory[gc][Math.floor(Math.random() * gearSubcategory[gc].length)]
        : 'none';
      let gssc = gearSubSubcategory[gsc]
        ? gearSubSubcategory[gsc][Math.floor(Math.random() * gearSubSubcategory[gsc].length)]
        : null;

      const listing = await returnId(knex('listing')).insert({
        user_id: 1,
        gear_category: gc,
        gear_subcategory: gsc,
        gear_sub_subcategory: gssc,
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
            rating: jj + 2,
            reviewer_id: Math.floor(Math.random() * 5) + 1
          });
        })
      );
    })
  );
}
