import {
  PubSub
  //  withFilter
} from "graphql-subscriptions";
// import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-errors";
import { Referral } from "./sql";
import settings from "../../../settings";

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
    },
    async verifyReferral(obj: any, { userId, referredId }: any, context: any) {
      userId = userId || context.identity.id;
      const res = await context.Referral.verifyReferral(userId, referredId);
      console.log(res);
      const referral = await context.Referral.referral(res);
      return referral;
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
        console.log(sent);
        if (!sent) throw "Invitation couldn't be sent";
        else return true;
      }
      throw "Invitation couldn't be sent";
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
