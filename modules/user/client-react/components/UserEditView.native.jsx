import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { translate } from "@gqlapp/i18n-client-react";
import { Loading } from "@gqlapp/look-client-react-native";

import UserFormComponent from "./UserFormComponent";
import { withLoadedUser } from "../containers/Auth";

class UserEditView extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    t: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { loading, user, t, currentUser } = this.props;

    if (loading && !user) {
      return <Loading text={t("userEdit.loadMsg")} />;
    } else {
      const isNotSelf = !user || (user && user.id !== currentUser.id);
      return (
        <View style={styles.container}>
          <UserFormComponent
            onSubmit={this.props.onSubmit}
            shouldDisplayRole={isNotSelf}
            shouldDisplayActive={isNotSelf}
            initialValues={user || {}}
            userRole={currentUser && currentUser.role ? currentUser.role : null}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default withLoadedUser(translate("user")(UserEditView));
