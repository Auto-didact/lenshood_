import { camelizeKeys } from "humps";
import { Model } from "objection";
import { knex } from "@gqlapp/database-server-ts";
import { User } from "@gqlapp/user-server-ts/sql";
import { returnId } from "@gqlapp/database-server-ts";

// Give the knex object to objection.
Model.knex(knex);

const eager = "[referred_user.[profile]]";

export interface Referral {
  userId: number;
  referral: string;
  referredId: number;
}

export interface ReferralInput {
  userId: number;
  referredId: number;
}

export default class ReferralDao extends Model {
  // private id: any;

  static get tableName() {
    return "referral";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      referred_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "referral.referred_id",
          to: "user.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "referral.user_id",
          to: "user.id"
        }
      }
    };
  }

  public async referrals(userId: number) {
    const res = camelizeKeys(
      await ReferralDao.query()
        .where("user_id", userId)
        .eager(eager)
        .orderBy("id", "desc")
    );
    return res;
  }

  public async referral(id: number) {
    const res = camelizeKeys(
      await ReferralDao.query()
        .findById(id)
        .eager(eager)
        .orderBy("id", "desc")
    );
    // console.log(query[0]);
    return res;
  }

  public async addReferred(userId: number, referredId: number) {
    const res = await returnId(
      knex("referral").insert({
        user_id: userId,
        referred_id: referredId
      })
    );
    return res;
  }
}
