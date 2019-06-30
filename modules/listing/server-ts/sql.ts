import { camelizeKeys, decamelizeKeys } from 'humps';
import { Model } from 'objection';
import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';
import { User, UserProfile } from '@gqlapp/user-server-ts/sql';

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
  userId: number;
  gearCategory: string;
  gearSubcategory: string;
  description: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
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
  reviewerId: number;
}

export interface Identifier {
  id: number;
}

const eager = '[user.[profile], listing_images, listing_detail.damages, listing_rental, listing_content, watch_list]';
export default class ListingDAO extends Model {
  private id: any;

  static get tableName() {
    return 'listing';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'listing.user_id',
          to: 'user.id'
        }
      },
      listing_images: {
        relation: Model.HasManyRelation,
        modelClass: ListingImage,
        join: {
          from: 'listing.id',
          to: 'listing_image.listing_id'
        }
      },
      listing_detail: {
        relation: Model.HasOneRelation,
        modelClass: ListingDetail,
        join: {
          from: 'listing.id',
          to: 'listing_detail.listing_id'
        }
      },
      listing_rental: {
        relation: Model.HasOneRelation,
        modelClass: ListingRental,
        join: {
          from: 'listing.id',
          to: 'listing_rental.listing_id'
        }
      },
      listing_content: {
        relation: Model.HasManyRelation,
        modelClass: ListingContent,
        join: {
          from: 'listing.id',
          to: 'listing_content.listing_id'
        }
      },
      listing_review: {
        relation: Model.HasManyRelation,
        modelClass: ListingReviewDAO,
        join: {
          from: 'listing.id',
          to: 'listing_review.listing_id'
        }
      },
      watch_list: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingWatchListDAO,
        join: {
          from: 'listing.id',
          to: 'watchlist.listing_id'
        }
      }
    };
  }

  public async listingsPagination(limit: number, after: number) {
    const res = camelizeKeys(
      await ListingDAO.query()
        .eager(eager)
        .orderBy('id', 'desc')
        .limit(limit)
        .offset(after)
    );
    // console.log(res);
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
    const res = camelizeKeys(
      await ListingDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async userListings(userId: number) {
    const res = camelizeKeys(
      await ListingDAO.query()
        .where('user_id', userId)
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

  public async addListingReviewDAO({ rating, comment, reviewerId, listingId }: ListingReview) {
    const listingAdd = await returnId(knex('listing_review')).insert({
      comment,
      rating,
      reviewer_id: reviewerId,
      listing_id: listingId
    });
    if (listingAdd) {
      await this.updateUserProfile(listingId);
    }
    return listingAdd;
  }

  public async getListingReviewDAO(id: number) {
    return ListingReviewDAO.query()
      .eager('reviewer')
      .where('id', '=', id)
      .first();
  }

  public async deleteListingReviewDAO(id: number) {
    let listing = await this.getListingReviewDAO(id);
    await ListingReviewDAO.query()
      .eager('reviewer')
      .where('id', '=', id)
      .del();
    if (listing && listing.hasOwnProperty('listing_id')) {
      await this.updateUserProfile(listing.listing_id);
    } else {
      listing = null;
    }
    return listing;
  }

  public async editListingReviewDAO({ id, comment, rating }: ListingReview & Identifier) {
    await ListingReviewDAO.query()
      .eager('reviewer')
      .where('id', '=', id)
      .update({
        comment,
        rating
      });
    let listing = await this.getListingReviewDAO(id);
    if (listing && listing.hasOwnProperty('listing_id')) {
      await this.updateUserProfile(listing.listing_id);
    } else {
      listing = null;
    }
    return listing;
  }

  public async patchListing(id, params) {
    const listing = await ListingDAO.query()
      .patch(params)
      .findById(id);

    return camelizeKeys(listing);
  }

  public async toggleIsFeatured(id: number, isFeatured: boolean) {
    return knex('listing')
      .where({ id })
      .update({ is_featured: isFeatured });
  }

  public async addOrRemoveWatchList(input: { user_id: number; listing_id: number; should_notify: boolean }) {
    const status = await this.watchStatus(input.listing_id, input.user_id);
    if (status) {
      await knex('watchlist')
        .where('listing_id', '=', input.listing_id)
        .andWhere('user_id', '=', input.user_id)
        .del();
      return 'Removed SuccessFully';
    } else {
      await returnId(knex('watchlist')).insert(input);
      return 'Added SuccessFully';
    }
  }

  public async watchlist(userId: number) {
    const res = camelizeKeys(
      await ListingWatchListDAO.query()
        .where('user_id', userId)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async watchStatus(listingId: number, userId: number) {
    const count = camelizeKeys(
      await knex
        .count('wl.id')
        .from('watchlist as wl')
        .where('wl.user_id', '=', userId)
        .andWhere('wl.listing_id', '=', listingId)
        .first()
    )['count(`wl`.`id`)'];
    let wStatus = false;
    if (count > 0) {
      wStatus = true;
    }
    return wStatus;
  }

  public async featuredListings() {
    const res = camelizeKeys(
      await ListingDAO.query()
        .where('is_featured', true)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async reviews(input: { reviewer_id: number; reviewee_id: number; listing_id: number }) {
    const whereCond = {};
    if (input.listing_id) {
      whereCond.listing_id = input.listing_id;
    }
    if (input.reviewer_id) {
      whereCond.reviewer_id = input.reviewer_id;
    }

    const res = camelizeKeys(
      await ListingReviewDAO.query()
        .eager('reviewer')
        .where(whereCond)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async updateUserProfile(listingId: number) {
    const userIdObj = await ListingDAO.query()
      .select('user_id')
      .where('id', listingId)
      .first();

    const userId = userIdObj.user_id;
    if (userId) {
      const avg = await knex('listing_review')
        .avg({ a: 'rating' })
        .where('listing_id', listingId);
      await knex('user_profile')
        .update({ rating: avg[0].a })
        .where({ user_id: userId });
    }
  }
}

// ListingImage model.
class ListingImage extends Model {
  static get tableName() {
    return 'listing_image';
  }

  static get idColumn() {
    return 'id';
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

  static get idColumn() {
    return 'id';
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

  static get idColumn() {
    return 'id';
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

  static get idColumn() {
    return 'id';
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

  static get idColumn() {
    return 'id';
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

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.HasManyRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_review.listing_id',
          to: 'listing.id'
        }
      },
      reviewer: {
        relation: Model.HasManyRelation,
        modelClass: UserProfile,
        join: {
          from: 'listing_review.reviewer_id',
          to: 'user_profile.user_id'
        }
      }
    };
  }
}

// ListingWatchListDAO model.
class ListingWatchListDAO extends Model {
  static get tableName() {
    return 'watchlist';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'watchlist.listing_id',
          to: 'listing.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'watchlist.user_id',
          to: 'user.id'
        }
      }
    };
  }
}
