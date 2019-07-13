import { camelizeKeys, decamelize } from 'humps';
import { has } from 'lodash';
import { knex, returnId } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';

import { Model, raw } from 'objection';

Model.knex(knex);

const eager = '[users.user.[profile]]';

export default class LiveSearch extends Model {
  static get tableName() {
    return 'live_search';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: LiveSearchUser,
        join: {
          from: 'live_search.id',
          to: 'live_search_user.search_id'
        }
      }
    };
  }

  public async liveSearches(orderBy: any, filter: any) {
    const queryBuilder = LiveSearch.query().eager(eager);

    // add order by
    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    // // add filter conditions
    if (filter) {
      if (has(filter, 'gearCategory') && filter.gearCategory !== '') {
        queryBuilder.where(function() {
          this.where('gear_category', filter.gearCategory);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['query_item', `%${filter.searchText}%`]));
        });
      }
    }
    const res = camelizeKeys(await queryBuilder);
    return res;
  }

  public async addSearchItem(userId: any, gearCategory: any, queryItem: any) {
    const res = await returnId(
      knex('live_search').insert({
        gear_category: gearCategory,
        query_item: queryItem
      })
    );
    const ref = await returnId(
      knex('live_search_user').insert({
        user_id: userId,
        search_id: res[0]
      })
    );
    return res;
  }

  public async increSearchItem(userId: any, searchId: any) {
    const res = await returnId(
      knex('live_search_user').insert({
        user_id: userId,
        search_id: searchId
      })
    );
    return res;
  }

  public async decreSearchItem(userId: any, searchId: any) {
    const res = await knex('live_search_user')
      .where('user_id', '=', userId)
      .andWhere('search_id', '=', searchId)
      .del();

    const ref = await returnId(knex('live_search_user').where('search_id', '=', searchId));
    if (ref.length === 0) {
      await knex('live_search')
        .where('id', '=', searchId)
        .del();
    }

    return res;
  }

  public async liveSearchItem(id: number) {
    const res = camelizeKeys(
      await LiveSearch.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }
}

class LiveSearchUser extends Model {
  static get tableName() {
    return 'live_search_user';
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
          from: 'live_search_user.user_id',
          to: 'user.id'
        }
      },
      search_item: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'live_search_user.search_id',
          to: 'live_search.id'
        }
      }
    };
  }
}
