import { camelizeKeys } from 'humps';
import { knex } from '@gqlapp/database-server-ts';

// interface ListingDetail {
//   condition: string;
//   repair_history: string;
//   age: string;
// }
// interface ListingDamage {
//   image_url: string;
//   damage_detail: string;
// }
// interface ListingRental {
//   per_day: number;
//   per_week: number;
//   per_month: number;
//   replacement_value: number;
// }
// interface ListingContent {
//   gear: string;
//   brand: string;
//   model: string;
//   serial: string;
// }
export interface Listing {
  gear_category: string;
  gear_subcategory: string;
  description: string;
  // listing_images: [string];
  // listing_detail: ListingDetail;
  // listing_damage: [ListingDamage];
  // listing_rental: ListingRental;
  // listing_content: [ListingContent];
}

export interface Identifier {
  id: number;
}
export default class ListingDAO {
  private listingFields = [
    'l.id',
    'l.gear_category',
    'l.gear_subcategory',
    'l.description',
    'li.image_url as listing_image'
  ];

  public async listingsPagination(limit: number, after: number) {
    return camelizeKeys(
      await knex
        .select(this.listingFields)
        .from('listing as l')
        .leftJoin('listing_image AS li', 'li.listing_id', 'l.id')
        .orderBy('l.id', 'desc')
        .limit(limit)
        .offset(after)
    );
  }

  public getTotal() {
    return knex('listing')
      .countDistinct('id as count')
      .first();
  }
}
