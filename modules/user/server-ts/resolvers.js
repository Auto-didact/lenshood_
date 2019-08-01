/*eslint-disable no-unused-vars*/
import { pick, isEmpty } from "lodash";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import withAuth from "graphql-auth";
import { withFilter } from "graphql-subscriptions";
import { UserInputError } from "apollo-server-errors";
import DrivingLicenseAPI from "./helpers/DrivingLicenseAPI";
import OTPAPI from "./helpers/OTPAPI";

// To Do
// import { createTransaction } from '@gqlapp/database-server-ts';
// import { transaction } from 'objection';

import settings from "../../../settings";

const USERS_SUBSCRIPTION = "users_subscription";
const {
  auth: { secret, certificate, password },
  app
} = settings;

const createPasswordHash = password => {
  return bcrypt.hash(password, 12) || false;
};

export default pubsub => ({
  Query: {
    users(obj, { orderBy, filter }, { User, identity }) {
      if (identity) return User.getUsers(orderBy, filter);
      else return null;
    },
    user: withAuth(
      ["user:view:self"],
      async (obj, { id }, { identity, User, req: { t } }) => {
        if (identity.id === id) {
          return null;
        }
        if (identity.id === id || identity.role === "admin") {
          try {
            const user = await User.getUser(id);
            return user;
          } catch (e) {
            return { errors: e };
          }
        }
      }
    ),
    displayUser: withAuth(async (obj, { id }, { User, identity }) => {
      if (identity.id === id) {
        return null;
      }
      const user = await User.getUser(id);
      return user;
    }),
    currentUser(obj, args, { User, identity }) {
      if (identity) {
        const user = User.getUser(identity.id);
        return user;
      } else {
        return null;
      }
    },
    featuredUsers: async (obj, args, { User, identity }) => {
      return User.featuredUsers();
    },
    userProfile: withAuth(async (obj, { userId }, { User, identity }) => {
      return User.userProfile(userId);
    })
  },
  // User: {
  //   profile(obj) {
  //     return obj;
  //   },
  //   auth(obj) {
  //     return obj;
  //   }
  // },
  // UserProfile: {
  //   firstName(obj) {
  //     return obj.firstName;
  //   },
  //   lastName(obj) {
  //     return obj.lastName;
  //   },
  //   fullName(obj) {
  //     if (obj.firstName && obj.lastName) {
  //       return `${obj.firstName} ${obj.lastName}`;
  //     } else {
  //       return null;
  //     }
  //   }
  // },
  Mutation: {
    addUser: withAuth(
      (obj, { input }, { identity }) => {
        return identity.id !== input.id
          ? ["user:create"]
          : ["user:create:self"];
      },
      async (
        obj,
        { input },
        { User, req: { universalCookies, t }, mailer, req }
      ) => {
        const errors = {};
        const userExists = await User.getUserByUsername(input.username);
        if (userExists) {
          errors.username = t("user:usernameIsExisted");
        }
        const emailExists = await User.getUserByEmail(input.email);
        if (emailExists) {
          errors.email = t("user:emailIsExisted");
        }
        if (input.password.length < password.minLength) {
          errors.password = t("user:passwordLength", {
            length: password.minLength
          });
        }
        if (!isEmpty(errors))
          throw new UserInputError(
            "Failed to get events due to validation errors",
            { errors }
          );

        const passwordHash = await createPasswordHash(input.password);

        let trx;
        let createdUserId;
        // trx = await transaction.start(User);
        // try {
        input["password_hash"] = passwordHash;
        delete input["password"];
        // To Do Transactions
        createdUserId = await User.register(input);
        // await User.editUserProfile({ id: createdUserId, ...input });

        // confirm this To Do
        if (certificate.enabled)
          await User.editAuthCertificate({ id: createdUserId, ...input });
        //   trx.commit();
        // } catch (e) {
        //   console.log(e);
        //   trx.rollback();
        // }

        try {
          const user = await User.getUser(createdUserId);
          // console.log(user);
          if (mailer && password.sendAddNewUserEmail && !emailExists && req) {
            // async email
            jwt.sign(
              { identity: pick(user, "id") },
              secret,
              { expiresIn: "1d" },
              (err, emailToken) => {
                const encodedToken = Buffer.from(emailToken).toString("base64");
                const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
                mailer.sendMail({
                  from: `${app.name} <${process.env.EMAIL_USER}>`,
                  to: user.email,
                  subject: "Your account has been created",
                  html: `<p>Hi, ${user.username}!</p>
                <p>Welcome to ${
                  app.name
                }. Please click the following link to confirm your email:</p>
                <p><a href="${url}">${url}</a></p>
                <p>Below are your login information</p>
                <p>Your email is: ${user.email}</p>
                <p>Your password is: ${user.password}</p>`
                });
              }
            );
          }

          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "CREATED",
              node: user
            }
          });
          return user;
        } catch (e) {
          return e;
        }
      }
    ),
    editUser: withAuth(
      (obj, args, { identity }) => {
        return identity.id !== args.input.id
          ? ["user:update"]
          : ["user:update:self"];
      },
      async (obj, { input }, { User, identity, req: { t } }) => {
        const isAdmin = () => identity.role === "admin";
        const isSelf = () => identity.id === input.id;

        const errors = {};
        const userExists = await User.getUserByUsername(input.username);
        if (userExists && userExists.id !== input.id) {
          errors.username = t("user:usernameIsExisted");
        }

        const emailExists = await User.getUserByEmail(input.email);
        if (emailExists && emailExists.id !== input.id) {
          errors.email = t("user:emailIsExisted");
        }

        if (input.password && input.password.length < password.minLength) {
          errors.password = t("user:passwordLength", {
            length: password.minLength
          });
        }

        if (!isEmpty(errors))
          throw new UserInputError(
            "Failed to get events due to validation errors",
            { errors }
          );

        // To Do
        // const userInfo = !isSelf() && isAdmin() ? input : pick(input, ['id', 'username', 'email', 'password']);

        const userInfo = !isSelf() && isAdmin() ? input : input;

        // const isProfileExists = await User.isUserProfileExists(input.id);
        if (input.password) {
          const passwordHash = await createPasswordHash(input.password);
          // console.log(passwordHash);
          userInfo["password_hash"] = passwordHash;
          delete userInfo["password"];
        }
        // To Do transactions
        // const trx = await createTransaction();
        // try {
        await User.editUser(userInfo);
        // await User.editUserProfile(input, isProfileExists);
        // trx.commit();
        // } catch (e) {
        //   trx.rollback();
        // }

        if (certificate.enabled) {
          await User.editAuthCertificate(input);
        }

        try {
          const user = await User.getUser(input.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "UPDATED",
              node: user
            }
          });
          // console.log(user);
          return user;
        } catch (e) {
          throw e;
        }
      }
    ),
    deleteUser: withAuth(
      (obj, args, { identity }) => {
        return identity.id !== args.id ? ["user:delete"] : ["user:delete:self"];
      },
      async (obj, { id }, { identity, User, req: { t } }) => {
        const isAdmin = () => identity.role === "admin";
        const isSelf = () => identity.id === id;

        const user = await User.getUser(id);
        if (!user) {
          throw new Error(t("user:userIsNotExisted"));
        }

        if (isSelf()) {
          throw new Error(t("user:userCannotDeleteYourself"));
        }

        const isDeleted =
          !isSelf() && isAdmin() ? await User.deleteUser(id) : false;

        if (isDeleted) {
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "DELETED",
              node: user
            }
          });
          return { user };
        } else {
          throw new Error(t("user:userCouldNotDeleted"));
        }
      }
    ),
    addUserDrivingLicense: withAuth(
      (obj, args, { identity, auth }) => {
        if (typeof args.id !== "undefined") {
          return identity.id !== args.input.id
            ? ["user:update"]
            : ["user:update:self"];
        } else {
          return ["user:update:self"];
        }
      },
      async (obj, { input }, { User, identity, req: { t } }) => {
        // To Do Check for user type and have validations for adding appropriately
        // const isAdmin = () => identity.role === 'admin';
        // const isSelf = () => identity.id === input.id;

        const dl = await DrivingLicenseAPI(input);
        // const dl = {
        //   id: "332323",
        //   result: {
        //     issue_date: "dsfsf",
        //     "father/husband": "dsfdsf",
        //     image_url: "sfsdf",
        //     name: "dsfsfd",
        //     blood_group: "sfsd",
        //     dob: "sfsdf",
        //     cov_details: [{ cov: "sdfdsf" }],
        //     address: "dsfdsfd"
        //   }
        // };

        //To Do Convert image bytecode to image url
        const params = {
          transaction_id: dl.id,
          driving_license_id: input.dlId,
          issue_date: dl.result.issue_date,
          father_or_husband: dl.result["father/husband"],
          image_url: dl.result.img,
          name: dl.result.name,
          blood_group: dl.result.blood_group,
          dob: dl.result.dob,
          cov: dl.result.cov_details[0].cov,
          address: dl.result.address
          // validity_transport: dl.result.validity['non-transport'],
          // validity_non_transport: dl.result.validity['non-transport']
        };

        var user_dl;
        if (typeof input.id !== "undefined") {
          user_dl = await User.addUserDrivingLicense(input.id, params);
          await User.updateUserVerification(input.id, {
            is_id_verified: true
          });
        } else {
          user_dl = await User.addUserDrivingLicense(identity.id, params);
          await User.updateUserVerification(identity.id, {
            is_id_verified: true
          });
        }

        // To Do set id verified to true

        try {
          const user = await User.getUser(input.id || identity.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "UPDATED",
              node: user
            }
          });
          // console.log(user);
          return user_dl;
        } catch (e) {
          throw e;
        }
      }
    ),
    addUserMobile: withAuth(
      (obj, args, { identity }) => {
        if (typeof args.id !== "undefined") {
          return identity.id !== args.input.id
            ? ["user:update"]
            : ["user:update:self"];
        } else {
          return ["user:update:self"];
        }
      },
      async (obj, { input }, { User, identity, req: { t } }) => {
        // To Do Check for user type and have validations for adding appropriately
        // const isAdmin = () => identity.role === 'admin';
        // const isSelf = () => identity.id === input.id;

        // if user doesnt have the mobile call otp & save to database
        const mobile = {
          mobile: input.mobile
        };

        if (typeof input.otp === "undefined") {
          // call otp api
          const otp = await OTPAPI(input.mobile);
          // const otp = 1111;
          // console.log(otp);
          mobile.otpSent = otp && true;

          var mobile_db;
          if (typeof input.id !== "undefined") {
            mobile_db = await User.addUserMobile(input.id, {
              mobile: input.mobile,
              otp: otp
            });
          } else {
            mobile_db = await User.addUserMobile(identity.id, {
              mobile: input.mobile,
              otp: otp
            });
          }
        } else {
          // check if otp is correct
          const user = await User.getUser(input.id || identity.id);
          const otp = user.mobile.otp;
          mobile.otpSent = otp && true;
          mobile.isVerified = input.otp === otp;
          if (mobile.isVerified) {
            await User.updateUserMobileVerified(user.mobile.id);
            await User.updateUserVerification(user.id, {
              is_mobile_verified: true
            });

            // set as primary mobile
            const patched = await User.patchProfile(user.id, {
              mobile: mobile.mobile
            });
            console.log(patched);
          } else {
            mobile.error = "Wrong OTP";
          }
        }
        // else check for otp and return value
        // save mobile to database

        try {
          const user = await User.getUser(input.id || identity.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "UPDATED",
              node: user
            }
          });
          // console.log(user);
          return mobile;
        } catch (e) {
          throw e;
        }
      }
    ),

    addUserPhotoId: withAuth(
      (obj, args, { identity }) => {
        if (typeof args.id !== "undefined") {
          return identity.id !== args.input.id
            ? ["user:update"]
            : ["user:update:self"];
        } else {
          return ["user:update:self"];
        }
      },
      async (obj, { input }, { User, identity }) => {
        input["id"] = input.id ? input.id : identity.id;
        let pId = await User.addUserPhotoId(input);
        await User.updateUserVerification(input.id, {
          is_photo_id_verified: false
        });
        const userPhotoId = await User.getPhotoId(pId);
        try {
          const user = await User.getUser(input.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: "UPDATED",
              node: user
            }
          });
          return userPhotoId;
        } catch (e) {
          throw e;
        }
      }
    ),
    toggleEndorse: withAuth(
      ["user:update:self"],
      async (obj, input, { User, identity, req: { t } }) =>
        User.toggleEndorse(input.endorseeId, input.endorserId)
    ),
    isEndorsed: withAuth(
      ["user:update:self"],
      async (obj, input, { User, identity, req: { t } }) =>
        User.isEndorsedF(input.endorseeId, input.endorserId)
    ),
    toggleFollow: withAuth(
      ["user:update:self"],
      async (obj, input, { User, identity, req: { t } }) =>
        User.toggleFollow(input.userId, input.followerId)
    ),
    isFollwed: withAuth(
      ["user:update:self"],
      async (obj, input, { User, identity, req: { t } }) =>
        User.isFollowedF(input.userId, input.followerId)
    ),
    toggleIsFeatured: withAuth(
      ["user:update:self"],
      async (obj, input, { User, identity, req: { t } }) =>
        User.toggleIsFeatured(input.userId, input.isFeatured)
    )
  },
  Subscription: {
    usersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USERS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.usersUpdated;
          const {
            filter: { isActive, role, searchText }
          } = variables;

          const checkByFilter =
            !!node.isActive === isActive &&
            (!role || role === node.role) &&
            (!searchText ||
              node.username.toUpperCase().includes(searchText.toUpperCase()) ||
              node.email.toUpperCase().includes(searchText.toUpperCase()));

          switch (mutation) {
            case "DELETED":
              return true;
            case "CREATED":
              return checkByFilter;
            case "UPDATED":
              return !checkByFilter;
          }
        }
      )
    }
  }
});
