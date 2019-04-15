import { knex } from '@gqlapp/database-server-ts';

export default class Order {
  public orders() {
    return knex.select();
  }
}
