import {
  PubSub
  // withFilter
} from "graphql-subscriptions";
// import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-errors";
import { Referral } from "./sql";
import settings from "../../../settings";

interface ReferralInput {
  input: Referral;
}

const USERS_SUBSCRIPTION = "users_subscription";
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
      let errors = {};
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
      await context.Referral.addReferred(input.userId, input.referredId);
      const referral = await context.User.getUser(input.referredId);
      pubsub.publish(USERS_SUBSCRIPTION, {
        usersUpdated: {
          mutation: "UPDATED",
          node: referral
        }
      });
      const user2 = await context.User.getUser(input.userId);
      pubsub.publish(USERS_SUBSCRIPTION, {
        usersUpdated: {
          mutation: "UPDATED",
          node: user2
        }
      });
      return referral;
    },

    async updateReferred(obj: any, { input }: ReferralInput, context: any) {
      let errors = {};
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
      await context.Referral.updateReferred(input.userId, input.referredId);
      const referral = await context.User.getUser(input.referredId);
      pubsub.publish(USERS_SUBSCRIPTION, {
        usersUpdated: {
          mutation: "UPDATED",
          node: referral
        }
      });
      const user2 = await context.User.getUser(input.userId);
      pubsub.publish(USERS_SUBSCRIPTION, {
        usersUpdated: {
          mutation: "UPDATED",
          node: user2
        }
      });
      return referral;
    },
    async verifyReferral(obj: any, { input }: any, context: any) {
      if (!input.userId) {
        input.userId = context.identity.id;
      }
      const res = await context.Referral.verifyReferral(
        input.userId,
        input.referredId
      );
      if (res) {
        let id = input.referredId;
        const user = await context.User.getUser(id);
        // pubsub.publish(REFERRED_SUBSCRIPTION, {
        //   referredUpdated: {
        //     mutation: "CREATED",
        //     id,
        //     node: user
        //   }
        // });
        pubsub.publish(USERS_SUBSCRIPTION, {
          usersUpdated: {
            mutation: "UPDATED",
            node: user
          }
        });
        const user2 = await context.User.getUser(input.userId);
        pubsub.publish(USERS_SUBSCRIPTION, {
          usersUpdated: {
            mutation: "UPDATED",
            node: user2
          }
        });
        return true;
      } else {
        throw new Error("Couldn't verify the user");
      }
    },
    async sendRefEmail(obj: any, { input }: any, { mailer }: any) {
      const url = `${__WEBSITE_URL__}/invites/${input.username}`;
      if (mailer) {
        const sent = await mailer.sendMail({
          from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
          to: input.email,
          subject: "LeensHood Invitation",
          html: `Earn cash when you sign-up using the following link: <a href="${url}">${url}</a> Use the referral code - <strong>"${
            input.username
          }"</strong> while signing up to earn cash.`
        });
        if (!sent) {
          throw new Error("Invitation couldn't be sent");
        } else {
          return true;
        }
      }
      throw new Error("Invitation couldn't be sent");
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
