import {
  PubSub
  //  withFilter
} from "graphql-subscriptions";
import { UserInputError } from "apollo-server-errors";
import { Referral } from "./sql";

interface ReferralInput {
  input: Referral;
}

// const REFERRED_SUBSCRIPTION = "referred_subscription";
export default (pubsub: PubSub) => ({
  Query: {
    referrals(obj: any, { userId }: any, context: any) {
      return context.Referral.referrals(userId || context.identity.id);
    },
    referralUser(obj: any, { userId }: any, context: any) {
      return context.User.getUser(userId || context.identity.id);
    }
  },
  Mutation: {
    async addReferred(obj: any, { input }: ReferralInput, context: any) {
      var errors = {};
      console.log("INPUT", input);
      const errMsg = {
        referral: "referral is invalid"
      };
      if (!input.referredId) {
        input.referredId = context.identity.id;
      }
      if (!input.userId && !input.referral) {
        errors = errMsg;
        throw new UserInputError(
          "Failed to get events as no referrals provided",
          { errors }
        );
      } else if (!input.userId && input.referral) {
        const userExists = await context.User.getUserByUsername(input.referral);
        if (!userExists) {
          errors = errMsg;
          throw new UserInputError(
            "Failed to get events due to validation errors",
            { errors }
          );
        } else {
          input.userId = userExists.id;
        }
      }
      const id = await context.Referral.addReferred(
        input.userId,
        input.referredId
      );
      const referral = await context.Referral.referral(id);
      // pubsub.publish(REFERRED_SUBSCRIPTION, {
      //   referredUpdated: {
      //     mutation: "CREATED",
      //     id,
      //     node: referral
      //   }
      // });
      return referral;
    }
  }
  // Subscription: {
  //   referredUserUpdated: {
  //     subscribe: withFilter(
  //       () => pubsub.asyncIterator(REFERRED_SUBSCRIPTION),
  //       (payload, variables) => {
  //         return payload.referredUpdated.id === variables.id;
  //       }
  //     )
  //   }
  // }
});
