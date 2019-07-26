// Helpers
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { has } from 'lodash';
import bcrypt from 'bcryptjs';
import { knex, returnId } from '@gqlapp/database-server-ts';

import { Model, raw } from 'objection';

import Listing from '@gqlapp/listing-server-ts/sql';
import Referral from '@gqlapp/referral-server-ts/sql';

// Give the knex object to objection.
Model.knex(knex);

// Actual query fetching and transformation in DB
const user_eager = `[
  listings.[listing_images,  listing_detail.damages, listing_rental, listing_content],
  profile.[referred_by.profile],
  referrals.[referred_user.profile],
  addresses,
  identification,
  verification,
  driving_license,
  mobile,
  endorsements.[endorser.profile],
  endorsed.[endorsee.profile],
  followers.[follower.profile],
  following.[followee.profile],
  portfolios,
  remarks, remarks.admin,
  auth_linkedin, auth_github, auth_google, auth_facebook, auth_certificate
]`;

export class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listings: {
        relation: Model.HasManyRelation,
        modelClass: Listing,
        join: {
          from: 'user.id',
          to: 'listing.user_id'
        }
      },
      profile: {
        relation: Model.HasOneRelation,
        modelClass: UserProfile,
        join: {
          from: 'user.id',
          to: 'user_profile.user_id'
        }
      },
      referrals: {
        relation: Model.HasManyRelation,
        modelClass: Referral,
        join: {
          from: 'user.id',
          to: 'referral.user_id'
        }
      },
      addresses: {
        relation: Model.HasManyRelation,
        modelClass: UserAddress,
        join: {
          from: 'user.id',
          to: 'user_address.user_id'
        }
      },
      identification: {
        relation: Model.HasManyRelation,
        modelClass: UserIdentification,
        join: {
          from: 'user.id',
          to: 'user_identification.user_id'
        }
      },
      verification: {
        relation: Model.HasOneRelation,
        modelClass: UserVerification,
        join: {
          from: 'user.id',
          to: 'user_verification.user_id'
        }
      },
      endorsements: {
        relation: Model.HasManyRelation,
        modelClass: UserEndorsement,
        join: {
          from: 'user.id',
          to: 'user_endorsement.endorsee_id'
        }
      },
      endorsed: {
        relation: Model.HasManyRelation,
        modelClass: UserEndorsement,
        join: {
          from: 'user.id',
          to: 'user_endorsement.endorser_id'
        }
      },
      followers: {
        relation: Model.HasManyRelation,
        modelClass: UserFollower,
        join: {
          from: 'user.id',
          to: 'user_follower.followee_id'
        }
      },
      following: {
        relation: Model.HasManyRelation,
        modelClass: UserFollower,
        join: {
          from: 'user.id',
          to: 'user_follower.follower_id'
        }
      },
      portfolios: {
        relation: Model.HasManyRelation,
        modelClass: UserPortfolio,
        join: {
          from: 'user.id',
          to: 'user_portfolio.user_id'
        }
      },
      remarks: {
        relation: Model.HasManyRelation,
        modelClass: UserRemark,
        join: {
          from: 'user.id',
          to: 'user_remark.user_id'
        }
      },
      auth_certificate: {
        relation: Model.HasOneRelation,
        modelClass: AuthCertificate,
        join: {
          from: 'user.id',
          to: 'auth_certificate.user_id'
        }
      },
      auth_facebook: {
        relation: Model.HasOneRelation,
        modelClass: AuthFacebook,
        join: {
          from: 'user.id',
          to: 'auth_facebook.user_id'
        }
      },
      auth_google: {
        relation: Model.HasOneRelation,
        modelClass: AuthGoogle,
        join: {
          from: 'user.id',
          to: 'auth_google.user_id'
        }
      },
      auth_github: {
        relation: Model.HasOneRelation,
        modelClass: AuthGithub,
        join: {
          from: 'user.id',
          to: 'auth_github.user_id'
        }
      },
      auth_linkedin: {
        relation: Model.HasOneRelation,
        modelClass: AuthLinkedin,
        join: {
          from: 'user.id',
          to: 'auth_linkedin.user_id'
        }
      },
      driving_license: {
        relation: Model.HasOneRelation,
        modelClass: UserDrivingLicense,
        join: {
          from: 'user.id',
          to: 'user_driving_license.user_id'
        }
      },
      mobile: {
        relation: Model.HasOneRelation,
        modelClass: UserMobile,
        join: {
          from: 'user.id',
          to: 'user_mobile.user_id'
        }
      }
    };
  }

  async getUsers(orderBy, filter) {
    const queryBuilder = User.query().eager(user_eager);

    // add order by
    if (orderBy && orderBy.column) {
      let column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    }

    // // add filter conditions
    if (filter) {
      if (has(filter, 'role') && filter.role !== '') {
        queryBuilder.where(function() {
          this.where('role', filter.role);
        });
      }

      if (has(filter, 'isActive') && filter.isActive !== null) {
        queryBuilder.where(function() {
          this.where('is_active', filter.isActive);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder
          .from('user')
          .leftJoin('user_profile AS up', 'up.user_id', 'user.id')
          .where(function() {
            this.where(raw('LOWER(??) LIKE LOWER(?)', ['username', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['email', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['up.first_name', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['up.last_name', `%${filter.searchText}%`]));
          });
      }
    }
    const res = camelizeKeys(await queryBuilder);
    return res;
  }

  async getUser(id) {
    const queryBuilder = User.query()
      .findById(id)
      .eager(user_eager);
    const res = camelizeKeys(await queryBuilder);
    return res;
  }

  // async getUserWithPassword(id) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.password_hash',
  //         'u.role',
  //         'u.is_active',
  //         'u.email',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .where('u.id', '=', id)
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .first()
  //   );
  // }

  async getUserWithSerial(serial) {
    // return camelizeKeys(
    //   await knex
    //     .select('u.id', 'u.username', 'u.role', 'u.is_active', 'ca.serial', 'up.first_name', 'up.last_name')
    //     .from('user AS u')
    //     .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
    //     .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
    //     .where('ca.serial', '=', serial)
    //     .first()
    // );

    // confirm this To Do
    const queryBuilder = User.query()
      .where('user.id', '=', AuthCertificate.query().where('serial', serial)[0].user_id)
      .eager(user_eager);
    const res = camelizeKeys(await queryBuilder);
    // console.log(res);
    return res;
  }

  async register(params) {
    // return knex('user').insert(decamelizeKeys({ username, email, role, passwordHash, isActive }));
    const res = await User.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  createFacebookAuth({ id, displayName, userId }) {
    return returnId(knex('auth_facebook')).insert({
      fb_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createGithubAuth({ id, displayName, userId }) {
    return returnId(knex('auth_github')).insert({
      gh_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createGoogleOAuth({ id, displayName, userId }) {
    return returnId(knex('auth_google')).insert({
      google_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createLinkedInAuth({ id, displayName, userId }) {
    return returnId(knex('auth_linkedin')).insert({
      ln_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  async editUser(params) {
    // const localAuthInput = passwordHash ? { email, passwordHash } : { email };
    // return knex('user')
    //   .update(decamelizeKeys({ username, role, isActive, ...localAuthInput }))
    //   .where({ id });
    const userId = params.profile ? params.profile.referredId : null;
    const res = await User.query().upsertGraph(decamelizeKeys(params));
    if (userId)
      await returnId(
        knex('user_profile')
          .where('user_id', '=', res.id)
          .update('referrer_id', userId)
      );
    await returnId(
      knex('referral')
        .where('user_id', '=', userId)
        .andWhere('referred_id', '=', res.id)
        .update('is_verified', params.profile.isVerified)
    );
    return res.id;
  }

  async patchProfile(id, params) {
    const user = await User.query().findById(id);
    const profile = await user.$relatedQuery('profile').patch(params);
    if (!profile) {
      await user.$relatedQuery('profile').insert(params);
    }
    return camelizeKeys(profile);
  }

  async addUserDrivingLicense(id, params) {
    const user = await User.query().findById(id);
    const driving_license = await user.$relatedQuery('driving_license').insert(params);
    return camelizeKeys(driving_license);
  }

  async addUserMobile(id, params) {
    const user = await User.query().findById(id);
    const mobile = await user.$relatedQuery('mobile').insert(params);
    return camelizeKeys(mobile);
  }

  async updateUserMobileVerified(id) {
    const mobile = await UserMobile.query().patchAndFetchById(id, {
      is_verified: true
    });
    return camelizeKeys(mobile);
  }

  async updateUserVerification(id, params) {
    const user = await User.query().findById(id);

    let verification = await user.$relatedQuery('verification').patch(params);
    if (!verification) {
      verification = await user.$relatedQuery('verification').insert(params);
    }

    return camelizeKeys(verification);
  }

  // async isUserProfileExists(userId) {
  //   return !!(await knex('user_profile')
  //     .count('id as count')
  //     .where(decamelizeKeys({ userId }))
  //     .first()).count;
  // }

  // async editUserProfile(params, isExists) {
  //   if (isExists) {
  //     // return knex('user_profile')
  //     //   .update(decamelizeKeys(profile))
  //     //   .where({ user_id: id });

  //     const res = await UserProfile.query().upsertGraph(decamelizeKeys(params));
  //     return res.id;
  //   } else {
  //     return returnId(knex('user_profile')).insert({ ...decamelizeKeys(profile), user_id: id });
  //   }
  // }

  async editAuthCertificate({ id, authCertificate: { serial } }) {
    const userProfile = await knex
      .select('id')
      .from('auth_certificate')
      .where({ user_id: id })
      .first();

    if (userProfile) {
      return knex('auth_certificate')
        .update({ serial })
        .where({ user_id: id });
    } else {
      return returnId(knex('auth_certificate')).insert({ serial, user_id: id });
    }
  }

  deleteUser(id) {
    return knex('user')
      .where('id', '=', id)
      .del();
  }

  async updatePassword(id, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 12);

    return knex('user')
      .update({ password_hash: passwordHash })
      .where({ id });
  }

  updateActive(id, isActive) {
    return knex('user')
      .update({ is_active: isActive })
      .where({ id });
  }

  async getUserByEmail(email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.password_hash',
          'u.role',
          'u.is_active',
          'u.email',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where({ email })
        .first()
    );
  }

  async getUserByFbIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'fa.fb_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('fa.fb_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByLnInIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'lna.ln_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('lna.ln_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByGHIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'gha.gh_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('gha.gh_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByGoogleIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'ga.google_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('ga.google_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByUsername(username) {
    return camelizeKeys(
      await knex
        .select('u.id', 'u.username', 'u.role', 'u.is_active', 'u.email', 'up.first_name', 'up.last_name')
        .from('user AS u')
        .where('u.username', '=', username)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  async getUserByUsernameOrEmail(usernameOrEmail) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.password_hash',
          'u.role',
          'u.is_active',
          'u.email',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .where('u.username', '=', usernameOrEmail)
        .orWhere('u.email', '=', usernameOrEmail)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  async endorseCount(endorsee_id) {
    return camelizeKeys(
      await knex
        .count('u.id')
        .from('user_endorsement as u')
        .where('u.endorsee_id', '=', endorsee_id)
        .first()
    )['count(`u`.`id`)'];
  }

  async isEndorsedF(endorsee_id, endorser_id) {
    const count = camelizeKeys(
      await knex
        .count('u.id')
        .from('user_endorsement as u')
        .where('u.endorser_id', '=', endorser_id)
        .andWhere('u.endorsee_id', '=', endorsee_id)
        .first()
    )['count(`u`.`id`)'];
    let isEndorsed = false;
    if (count != 0) {
      isEndorsed = true;
    }
    return isEndorsed;
  }

  async toggleEndorse(endorsee_id, endorser_id) {
    const count = camelizeKeys(
      await knex
        .count('u.id')
        .from('user_endorsement as u')
        .where('u.endorser_id', '=', endorser_id)
        .andWhere('u.endorsee_id', '=', endorsee_id)
        .first()
    )['count(`u`.`id`)'];
    let isEndorsed = false;
    if (count == 0) {
      await returnId(
        knex('user_endorsement').insert({
          endorser_id: endorser_id,
          endorsee_id: endorsee_id
        })
      );
      isEndorsed = true;
    } else {
      await knex('user_endorsement')
        .where('endorser_id', '=', endorser_id)
        .andWhere('endorsee_id', '=', endorsee_id)
        .del();
    }
    let endorseCount = await this.endorseCount(endorsee_id);
    return {
      endorsecount: endorseCount,
      isEndorsed: isEndorsed
    };
  }

  async follwersCount(userId) {
    return camelizeKeys(
      await knex
        .count('u.id')
        .from('user_follower as u')
        .where('u.followee_id', '=', userId)
        .first()
    )['count(`u`.`id`)'];
  }

  async isFollowedF(userId, followerId) {
    const count = camelizeKeys(
      await knex
        .count('u.id')
        .from('user_follower as u')
        .where('u.followee_id', '=', userId)
        .andWhere('u.follower_id', '=', followerId)
        .first()
    )['count(`u`.`id`)'];

    let isFollowed = false;
    if (count != 0) {
      isFollowed = true;
    }
    return isFollowed;
  }

  async toggleFollow(userId, followerId) {
    const count = camelizeKeys(
      await knex
        .count('u.id')
        .from('user_follower as u')
        .where('u.followee_id', '=', userId)
        .andWhere('u.follower_id', '=', followerId)
        .first()
    )['count(`u`.`id`)'];
    let isFollowed = false;
    if (count == 0) {
      await returnId(
        knex('user_follower').insert({
          followee_id: userId,
          follower_id: followerId
        })
      );
      isFollowed = true;
    } else {
      await knex('user_follower')
        .where('followee_id', '=', userId)
        .andWhere('follower_id', '=', followerId)
        .del();
    }
    let follwerCount = await this.follwersCount(userId);
    return {
      follwerCount: follwerCount,
      isFollwed: isFollowed
    };
  }

  async toggleIsFeatured(userId, isFeatured) {
    return knex('user')
      .where({ id: userId })
      .update({ is_featured: isFeatured });
  }

  async featuredUsers() {
    const res = camelizeKeys(
      await knex('user')
        .where('is_featured', true)
        .orderBy('id', 'desc')
    );
    return res;
  }
  async userProfile(userId) {
    const res = camelizeKeys(
      await UserProfile.query()
        .where('user_id', userId)
        .first()
    );
    return res;
  }
}

const UserDAO = new User();
export default UserDAO;

// UserProfile model.
export class UserProfile extends Model {
  static get tableName() {
    return 'user_profile';
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
          from: 'user_profile.user_id',
          to: 'user.id'
        }
      },
      referred_by: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'user_profile.referrer_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserAddress model.
class UserAddress extends Model {
  static get tableName() {
    return 'user_address';
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
          from: 'user_address.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserIdentification model.
class UserIdentification extends Model {
  static get tableName() {
    return 'user_identification';
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
          from: 'user_identification.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserVerification model.
class UserVerification extends Model {
  static get tableName() {
    return 'user_verification';
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
          from: 'user_verification.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserDrivingLicense model.
class UserDrivingLicense extends Model {
  static get tableName() {
    return 'user_driving_license';
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
          from: 'user_driving_license.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserMobile model.
class UserMobile extends Model {
  static get tableName() {
    return 'user_mobile';
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
          from: 'user_mobile.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserEndorsement model.
class UserEndorsement extends Model {
  static get tableName() {
    return 'user_endorsement';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      endorser: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_endorsement.endorser_id',
          to: 'user.id'
        }
      },
      endorsee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_endorsement.endorsee_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserFollower model.
class UserFollower extends Model {
  static get tableName() {
    return 'user_follower';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      follower: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_follower.follower_id',
          to: 'user.id'
        }
      },
      followee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_follower.followee_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserPortfolio model.
class UserPortfolio extends Model {
  static get tableName() {
    return 'user_portfolio';
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
          from: 'user_portfolio.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserRemark model.
class UserRemark extends Model {
  static get tableName() {
    return 'user_remark';
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
          from: 'user_remark.user_id',
          to: 'user.id'
        }
      },
      admin: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_remark.admin_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthLinkedin model.
class AuthLinkedin extends Model {
  static get tableName() {
    return 'auth_linkedin';
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
          from: 'auth_linkedin.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthGithub model.
class AuthGithub extends Model {
  static get tableName() {
    return 'auth_github';
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
          from: 'auth_github.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthGoogle model.
class AuthGoogle extends Model {
  static get tableName() {
    return 'auth_google';
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
          from: 'auth_google.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthFacebook model.
class AuthFacebook extends Model {
  static get tableName() {
    return 'auth_facebook';
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
          from: 'auth_facebook.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthCertificate model.
class AuthCertificate extends Model {
  static get tableName() {
    return 'auth_certificate';
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
          from: 'auth_certificate.user_id',
          to: 'user.id'
        }
      }
    };
  }
}
