import { knex } from '@gqlapp/database-server-ts';

export default class LiveSearch {
  public liveSearchs() {
    return knex.select();
  }
}
