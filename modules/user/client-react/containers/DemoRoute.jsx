import React from "react";
import Helmet from "react-helmet";
import { graphql, compose } from "react-apollo";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";
import USERS_QUERY from "../graphql/UsersQuery.graphql";
import settings from "../../../../settings";
import UserDemoView from "../components/UserDemoView";

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - DEMOLINK`}
    meta={[
      {
        name: "description",
        content: `${settings.app.name}`
      }
    ]}
  />
);

class Users extends React.Component {
  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <h2>USERS AUTOCOMPLETE DEMO</h2>
        <UserDemoView {...this.props} />
      </PageLayout>
    );
  }
}

export default compose(
  graphql(USERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: "network-only",
        variables: { orderBy, filter }
      };
    },
    props({
      data: { loading, users, refetch, error, updateQuery, subscribeToMore }
    }) {
      return {
        loading,
        users,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })
)(translate("user")(Users));
