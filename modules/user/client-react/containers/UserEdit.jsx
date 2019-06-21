import React from "react";
import PropTypes from "prop-types";
import { compose, graphql } from "react-apollo";
import { pick } from "lodash";
import { translate } from "@gqlapp/i18n-client-react";
import { FormError } from "@gqlapp/forms-client-react";
import UserEditView from "../components/UserEditView";
import { message } from "antd";
import USER_QUERY from "../graphql/UserQuery.graphql";
import EDIT_USER from "../graphql/EditUser.graphql";
import settings from "../../../../settings";
import UserFormatter from "../helpers/UserFormatter";

const UserEdit = props => {
  const { user, editUser, t, history, navigation } = props;

  const onSubmit = async values => {
    let userValues = pick(values, [
      "username",
      "email",
      "role",
      "isActive",
      "profile",
      "addresses",
      "portfolios"
    ]);
    //

    userValues = UserFormatter.trimExtraSpaces(userValues);

    if (settings.auth.certificate.enabled) {
      userValues["auth"] = {
        certificate: pick(values.auth.certificate, "serial")
      };
    }

    try {
      await editUser({ id: user.id, ...userValues });
    } catch (e) {
      throw new FormError(t("userEdit.errorMsg"), e);
    }
    message.info("Changes saved!");

    // if (history) {
    //   return history.goBack();
    // }
    //
    // if (navigation) {
    //   return navigation.goBack();
    // }
  };

  return <UserEditView onSubmit={onSubmit} {...props} />;
};

UserEdit.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export default compose(
  translate("user"),
  graphql(USER_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, user } }) {
      const userPayload = user ? { user: user } : {};
      return {
        loading,
        ...userPayload
      };
    }
  }),
  graphql(EDIT_USER, {
    props: ({ mutate }) => ({
      editUser: async input => {
        const {
          data: { editUser }
        } = await mutate({
          variables: { input }
        });

        return editUser;
      }
    })
  })
)(UserEdit);
