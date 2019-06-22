import { knex } from '@gqlapp/database-server-ts';

export default class Referral {
  public referrals() {
    return knex.select();
  }
}
