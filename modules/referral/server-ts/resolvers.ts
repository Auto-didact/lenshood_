import { PubSub, withFilter } from "graphql-subscriptions";
// import Referral from "./sql";
import { User } from "@gqlapp/user-server-ts/sql";
import { UserInputError } from "apollo-server-errors";
import { Referral } from "./sql";

interface ReferralInput {
  input: Referral;
}

const REFERRED_SUBSCRIPTION = "referred_subscription";
export default (pubsub: PubSub) => ({
  Query: {
    referrals(obj: any, { userId }: any, context: any) {
      return context.Referral.referrals(userId || context.identity.id);
    }
  },
  Mutation: {
    async addReferred(obj: any, { input }: ReferralInput, context: any) {
      var errors = {};
      const errMsg = {
        referral: "referral is invalid"
      };
      input.referredId = context.identity.id;
      if (input.referral) {
        const userExists = await User.getUserByUsername(input.referral);

        if (!userExists) {
          errors = errMsg;
          throw new UserInputError(
            "Failed to get events due to validation errors",
            { errors }
          );
        } else {
          // let regUser = User.patchProfile(input.userId, {
          //   referred_by: userExists.id
          // });
          input.userId = userExists.id;
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          // console.log(regUser);
          console.log(input);
          let id = await context.Referral.addReferred(input);
          console.log(id);
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          const referral = await context.Referral.referral(id);
          pubsub.publish(REFERRED_SUBSCRIPTION, {
            referredUpdated: {
              mutation: "CREATED",
              id,
              node: referral
            }
          });
          return referral;
        }
      }
    }
  },
  Subscription: {
    referredUUserpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(REFERRED_SUBSCRIPTION),
        (payload, variables) => {
          return payload.referredUpdated.id === variables.id;
        }
      )
    }
  }
});
