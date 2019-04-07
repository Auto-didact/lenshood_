import { camelizeKeys, decamelizeKeys } from 'humps';
import { Model } from 'objection';
import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';

// Give the knex object to objection.
Model.knex(knex);

interface ListingImage {
  imageUrl: string;
}
interface ListingDetail {
  condition: string;
  repairHistory: string;
  age: string;
  damages: ListingDamage[];
}
interface ListingDamage {
  imageUrl: string;
  damage_detail: string;
}
interface ListingRental {
  perDay: number;
  perWeek: number;
  perMonth: number;
  replacementValue: number;
}
interface ListingContent {
  gear: string;
  brand: string;
  model: string;
  serial: string;
}
export interface Listing {
  gearCategory: string;
  gearSubcategory: string;
  description: string;
  listingImages: ListingImage[];
  listingDetail: ListingDetail;
  listingDamage: ListingDamage[];
  listingRental: ListingRental;
  listingContent: ListingContent[];
}

export interface ListingReview {
  listingId: number;
  rating: string;
  comment: string;
}

export interface Identifier {
  id: number;
}
export default class ListingDAO extends Model {
  static get tableName() {
    return 'listing';
  }

  static get relationMappings() {
    return {
      listing_images: {
        relation: Model.HasManyRelation,
        modelClass: ListingImage,
        join: {
          from: 'listing.id',
          to: 'listing_image.listing_id'
        }
      },
      listing_detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDetail,
        join: {
          from: 'listing.id',
          to: 'listing_detail.listing_id'
        }
      },
      listing_rental: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingRental,
        join: {
          from: 'listing.id',
          to: 'listing_rental.listing_id'
        }
      },
      listing_content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingContent,
        join: {
          from: 'listing.id',
          to: 'listing_content.listing_id'
        }
      }
    };
  }

  public async listingsPagination(limit: number, after: number) {
    const eager = '[listing_images, listing_detail, listing_detail.damages, listing_rental, listing_content]';
    const res = camelizeKeys(
      await ListingDAO.query()
        .eager(eager)
        .orderBy('id', 'desc')
        .limit(limit)
        .offset(after)
    );
    // console.log(query[0]);
    return res;
  }

  public async getReviewsForListingIds(listingIds: number[]) {
    const res = camelizeKeys(
      await ListingReviewDAO.query()
        .whereIn('listing_id', listingIds)
        .orderBy('id', 'desc')
    );
    return orderedFor(res, listingIds, 'listing_id', false);
  }

  public getTotal() {
    return knex('listing')
      .countDistinct('id as count')
      .first();
  }

  public async listing(id: number) {
    const eager = '[listing_images, listing_detail, listing_detail.damages, listing_rental, listing_content]';
    const res = camelizeKeys(
      await ListingDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async addListing(params: Listing) {
    const res = await ListingDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  public deleteListing(id: number) {
    return knex('listing')
      .where('id', '=', id)
      .del();
  }

  public async editListing(params: Listing & Identifier) {
    const res = await ListingDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public addListingReviewDAO({ comment, rating, listingId }: ListingReviewDAO) {
    return returnId(knex('listing_review')).insert({ comment, rating, listing_id: listingId });
  }

  public getListingReviewDAO(id: number) {
    return knex
      .select('id', 'comment', 'rating')
      .from('listing_review')
      .where('id', '=', id)
      .first();
  }

  public deleteListingReviewDAO(id: number) {
    return knex('listing_review')
      .where('id', '=', id)
      .del();
  }

  public editListingReviewDAO({ id, comment, rating }: ListingReviewDAO & Identifier) {
    return knex('listing_review')
      .where('id', '=', id)
      .update({
        comment,
        rating
      });
  }
}

// ListingImage model.
class ListingImage extends Model {
  static get tableName() {
    return 'listing_image';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_image.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingDetail model.
class ListingDetail extends Model {
  static get tableName() {
    return 'listing_detail';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_detail.listing_id',
          to: 'listing.id'
        }
      },
      damages: {
        relation: Model.HasManyRelation,
        modelClass: ListingDamage,
        join: {
          from: 'listing_detail.id',
          to: 'listing_damage.listing_detail_id'
        }
      }
    };
  }
}

// ListingDamage model.
class ListingDamage extends Model {
  static get tableName() {
    return 'listing_damage';
  }

  static get relationMappings() {
    return {
      listing_detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDetail,
        join: {
          from: 'listing_damage.listing_detail_id',
          to: 'listing_detail.id'
        }
      }
    };
  }
}

// ListingRental model.
class ListingRental extends Model {
  static get tableName() {
    return 'listing_rental';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_rental.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingContent model.
class ListingContent extends Model {
  static get tableName() {
    return 'listing_content';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_content.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingReviewDAO model.
class ListingReviewDAO extends Model {
  static get tableName() {
    return 'listing_review';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_review.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}
