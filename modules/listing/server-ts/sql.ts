import { knex } from '@gqlapp/database-server-ts';

export default class Listing {
  public listings() {
    return knex.select();
  }
}
