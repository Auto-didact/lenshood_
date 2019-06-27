import ServerModule from "@gqlapp/module-server-ts";

import schema from "./schema.graphql";
import createResolvers from "./resolvers";
import scopes from "./scopes";
import Listing from "./sql";

const createContextFunc = ({ graphqlContext: { identity } }: any) => ({
  Listing: new Listing(),
  auth: {
    isAuthenticated: !!identity,
    scope: identity && identity.role ? scopes[identity.role] : null
  }
});

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
  createContextFunc: [createContextFunc]
});
