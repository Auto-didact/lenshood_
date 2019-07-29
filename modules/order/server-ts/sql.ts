import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model } from 'objection';
import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
// import { has } from 'lodash';

// Give the knex object to objection.
Model.knex(knex);

interface OrderDetail {
  orderId: number;
  days: number;
  startDate: string;
  endDate: string;
  totalR: number;
  refundableDeposit: number;
  serviceFee: number;
  rentPerDay: number;
  rentPerWeek: number;
}

interface OrderPayment {
  rpTransactionId: string;
  rpTransactionAmount: string;
}

interface OrderDelivery {
  hustlerId: number;
  source: string;
  destination: string;
  type: string;
  deliveryDateTime: string;
}

export interface Order {
  userId: number;
  state: string;
  isActive: boolean;
  orderDetails: OrderDetail[];
  orderPayment: OrderPayment;
  orderDeliveries: OrderDelivery[];
}

export interface Identifier {
  id: number;
}

const eager = '[user.[profile], order_detail.[order], order_payment, order_delivery]';
export default class OrderDAO extends Model {
  // private id: any;

  static get tableName() {
    return 'order';
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
          from: 'order.user_id',
          to: 'user.id'
        }
      },
      order_details: {
        relation: Model.HasManyRelation,
        modelClass: OrderDetail,
        join: {
          from: 'order.id',
          to: 'order_detail.order_id'
        }
      },
      order_payment: {
        relation: Model.HasOneRelation,
        modelClass: OrderPayment,
        join: {
          from: 'order.id',
          to: 'order_payment.order_id'
        }
      },
      order_delivery: {
        relation: Model.HasManyRelation,
        modelClass: OrderDelivery,
        join: {
          from: 'order.id',
          to: 'order_delivery.order_id'
        }
      }
    };
  }

  public async ordersPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = OrderDAO.query().eager(eager);

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

    // if (filter) {
    //   if (has(filter, 'gearCategory') && filter.gearCategory !== '') {
    //     queryBuilder.where(function() {
    //       this.where('gear_category', filter.gearCategory);
    //     });
    //   }

    //   if (has(filter, 'gearSubcategory') && filter.gearSubcategory !== '') {
    //     queryBuilder.where(function() {
    //       this.where('gear_subcategory', filter.gearSubcategory);
    //     });
    //   }

    //   if (has(filter, 'searchText') && filter.searchText !== '') {
    //     queryBuilder
    //       .from('order')
    //       .leftJoin('order_content AS ld', 'ld.order_id', 'order.id')
    //       .where(function() {
    //         this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.model', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.gear', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.brand', `%${filter.searchText}%`]));
    //       });
    //   }
    // }

    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return res;
  }

  public async ordersList() {
    return camelizeKeys(
      await OrderDAO.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public getTotal() {
    return knex('order')
      .countDistinct('id as count')
      .first();
  }

  public async order(id: number) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async userOrders(userId: number) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('user_id', userId)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async addOrder(params: Order) {
    const res = await OrderDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async editOrder(params: Order & Identifier) {
    const res = await OrderDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async patchOrder(id: any, params: any) {
    const order = await OrderDAO.query()
      .patch(params)
      .findById(id);

    return camelizeKeys(order);
  }

  public deleteOrder(id: number) {
    return knex('order')
      .where('id', '=', id)
      .del();
  }

  public async asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

// OrderDetail model.
class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderDAO,
        join: {
          from: 'order_detail.order_id',
          to: 'order.id'
        }
      }
    };
  }
}

// OrderPayment model.
class OrderPayment extends Model {
  static get tableName() {
    return 'order_payment';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      order_detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderDAO,
        join: {
          from: 'order_payment.order_detail_id',
          to: 'order.id'
        }
      }
    };
  }
}

// OrderDelivery model.
class OrderDelivery extends Model {
  static get tableName() {
    return 'order_delivery';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderDAO,
        join: {
          from: 'order_delivery.order_id',
          to: 'order.id'
        }
      }
    };
  }
}
