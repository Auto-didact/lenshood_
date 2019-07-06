import { camelizeKeys, decamelizeKeys, decamelize } from "humps";
import { Model, raw } from "objection";
import { has } from "lodash";
import { knex, returnId, orderedFor } from "@gqlapp/database-server-ts";
import { User } from "@gqlapp/user-server-ts/sql";

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

  public async listingsPagination(
    limit: number,
    after: number,
    orderBy: any,
    filter: any
  ) {
    const queryBuilder = ListingDAO.query().eager(eager);

    if (orderBy && orderBy.column) {
      let column = orderBy.column;
      let order = "asc";
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else queryBuilder.orderBy("id", "desc");

    if (filter) {
      if (has(filter, "gearCategory") && filter.gearCategory !== "") {
        queryBuilder.where(function() {
          this.where("gear_category", filter.gearCategory);
        });
      }

      if (has(filter, "gearSubcategory") && filter.gearSubcategory !== "") {
        queryBuilder.where(function() {
          this.where("gear_subcategory", filter.gearSubcategory);
        });
      }

      if (has(filter, "searchText") && filter.searchText !== "") {
        queryBuilder
          .from("listing")
          .leftJoin("listing_content AS ld", "ld.listing_id", "listing.id")
          .where(function() {
            this.where(
              raw("LOWER(??) LIKE LOWER(?)", [
                "description",
                `%${filter.searchText}%`
              ])
            )
              .orWhere(
                raw("LOWER(??) LIKE LOWER(?)", [
                  "ld.model",
                  `%${filter.searchText}%`
                ])
              )
              .orWhere(
                raw("LOWER(??) LIKE LOWER(?)", [
                  "ld.gear",
                  `%${filter.searchText}%`
                ])
              )
              .orWhere(
                raw("LOWER(??) LIKE LOWER(?)", [
                  "ld.brand",
                  `%${filter.searchText}%`
                ])
              );
          });
      }
    }

    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return res;
  }
  
  public async listingsList() {
    return camelizeKeys(
      await ListingDAO.query()
        .eager(eager)
        .orderBy("id", "desc")
    );
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

  public addListingReviewDAO({ comment, rating, listingId }: ListingReview) {
    return returnId(knex('listing_review')).insert({
      comment,
      rating,
      listing_id: listingId
    });
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

  public editListingReviewDAO({ id, comment, rating }: ListingReview & Identifier) {
    return knex('listing_review')
      .where('id', '=', id)
      .update({
        comment,
        rating
      });
  }

  public async patchListing(id: any, params: any) {
    console.log("params", params);
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
