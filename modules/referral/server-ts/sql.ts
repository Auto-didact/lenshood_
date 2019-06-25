import { camelizeKeys, decamelizeKeys } from "humps";
import { Model } from "objection";
import { knex } from "@gqlapp/database-server-ts";
import { User } from "@gqlapp/user-server-ts/sql";

// Give the knex object to objection.
Model.knex(knex);

const eager = "[referred_user.[profile]]";

export interface Referral {
  userId: number;
  referral: string;
  referredId: number;
}

export default class ReferralDao extends Model {
  private id: any;

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

  public async addReferred(params: Referral) {
    console.log("params----------------", params);
    delete params["referral"];
    console.log(params);
    const res = await ReferralDao.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }
}
