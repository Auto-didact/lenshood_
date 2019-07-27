import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout, Loader, DataNotFound } from "@gqlapp/look-client-react";
import TOGGLE_ENDORSE from "@gqlapp/listing-client-react/graphql/ToggleEndorse.graphql";
import TOGGLE_FOLLOW from "@gqlapp/listing-client-react/graphql/ToggleFollow.graphql";
import IS_FOLLOW from "@gqlapp/listing-client-react/graphql/IsFollowed.graphql";
import Is_Endorse from "@gqlapp/listing-client-react/graphql/IsEndorsed.graphql";
// To Do Abstract Out
import { Row, Col, Divider, Tabs, Button, message } from "antd";
import { withApollo } from "react-apollo";

import PublicProfileHeadComponent from "./components/PublicProfileHeadComponent";
import PublicUsersCardComponent from "./components/PublicUsersCardComponent";
import PublicProfileListingCardComponent from "./components/PublicProfileListingCardComponent";

import settings from "../../../../settings";

const { TabPane } = Tabs;

class PublicProfileView extends React.Component {
  state = {
    currentUserId: parseInt(this.props.currentUser.id),
    isFollow: false,
    isEndorse: false
  };

  componentWillMount = async () => {
    await this.isEndorsedF();
    await this.isFollowF();
  };

  isEndorsedF = async () => {
    let result = await this.props.client.mutate({
      mutation: Is_Endorse,
      variables: {
        endorsee: parseInt(this.getUserId()),
        endorser: this.state.currentUserId
      }
    });
    this.setState({ isEndorse: result.data.isEndorsed });
  };

  isFollowF = async () => {
    let result = await this.props.client.mutate({
      mutation: IS_FOLLOW,
      variables: {
        u_Id: parseInt(this.getUserId()),
        f_Id: this.state.currentUserId
      }
    });
    this.setState({ isFollow: result.data.isFollwed });
  };

  toggleEndorse = async () => {
    let result = await this.props.client.mutate({
      mutation: TOGGLE_ENDORSE,
      variables: {
        endorsee: parseInt(this.getUserId()),
        endorser: this.state.currentUserId
      }
    });
    this.setState({ isEndorse: result.data.toggleEndorse.isEndorsed });
    message.info("Endorse Count is " + result.data.toggleEndorse.endorsecount);
  };

  toggleFollow = async () => {
    let result = await this.props.client.mutate({
      mutation: TOGGLE_FOLLOW,
      variables: {
        u_Id: parseInt(this.getUserId()),
        f_Id: this.state.currentUserId
      }
    });
    this.setState({ isFollow: result.data.toggleFollow.isFollwed });
    message.info("Follower Count is " + result.data.toggleFollow.follwerCount);
  };
  getUserId = () => {
    let id = 0;
    if (this.props.match) {
      id = Number(this.props.match.params.id);
    } else if (this.props.navigation) {
      id = Number(this.props.navigation.state.params.id);
    }
    return id;
  };
  isCurrentUser = () =>
    this.props.currentUser && this.getUserId() === this.props.currentUser.id;
  userCardData = () => {
    const { user } = this.props;
    const { t } = this.props;
    const endorsements = user.endorsements;

    const endorsed = user.endorsed;
    const followers = user.followers;
    const following = user.following;

    function getEndorsements(endorsement) {
      if (endorsement) {
        var data = endorsement.endorser.profile;

        return data;
      } else {
        return null;
      }
    }
    function getEndorsed(endorse) {
      if (endorse) {
        var data = endorse.endorsee.profile;

        return data;
      } else {
        return null;
      }
    }

    function getFollowers(follower) {
      if (follower) {
        var data = follower.follower.profile;
        return data;
      } else {
        return null;
      }
    }

    function getFollowing(follow) {
      if (follow) {
        return follow.followee.profile;
      } else {
        return null;
      }
    }

    return {
      endorsements: {
        title: t("profile.card.group.endorsements.title"),
        notFound: t("profile.card.group.endorsements.notFound"),
        list:
          !this.isCurrentUser() || endorsements.length === 0
            ? []
            : endorsements.map(getEndorsements)
      },
      endorsed: {
        title: t("profile.card.group.endorsed.title"),
        notFound: t("profile.card.group.endorsed.notFound"),
        list:
          !this.isCurrentUser() || endorsed.length === 0
            ? []
            : endorsed.map(getEndorsed)
      },
      followers: {
        title: t("profile.card.group.followers.title"),
        notFound: t("profile.card.group.followers.notFound"),
        list:
          !this.isCurrentUser() || followers.length === 0
            ? []
            : followers.map(getFollowers)
      },
      following: {
        title: t("profile.card.group.following.title"),
        notFound: t("profile.card.group.following.notFound"),
        list:
          !this.isCurrentUser() || following.length === 0
            ? []
            : following.map(getFollowing)
      },
      profileHead: {
        rating: t("profile.card.group.rating"),
        acceptanceRate: t("profile.card.group.acceptanceRate"),
        responseTime: t("profile.card.group.responseTime")
      }
      // verification: {
      //   mobileVerification: {
      //     isVerified: user.verification.isMobileVerified,
      //     mobile:
      //       user && user.profile && user.profile.mobile
      //   },
      //   emailVerification: {
      //     isVerified: user.verification.isEmailVerified,
      //     email: user.email
      //   },
      //   dlVerification: {
      //     isVerified: user.verification.isIdVerified,
      //     identification: user.identification
      //   }
      // }
    };
  };

  renderMetaData = t => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t("profile.title")}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${t("profile.meta")}`
          }
        ]}
      />
    );
  };

  render() {
    const { t } = this.props;
    const { user, loading } = this.props;
    return (
      <PageLayout select="/profile">
        {loading && !user && <Loader text={t("profile.loadMsg")} />}
        {!loading && !user && (
          <DataNotFound description={<h3>User not found!</h3>} />
        )}
        {user && (
          <div>
            <Row style={{ margin: "40px 0px " }}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <div style={{ margin: "5px" }}>
                  <PublicProfileHeadComponent
                    profile={user.profile && user.profile}
                    description={this.userCardData().profileHead}
                    role={user.role}
                    username={user.username}
                    portfolios={user.portfolios}
                  />
                </div>
              </Col>
              <Col
                lg={{ span: 6 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                sm={{ span: 8 }}
                style={{ marginTop: "67px", maxWidth: "80px" }}
              >
                <div align="center">
                  <Button
                    type="primary"
                    onClick={this.toggleFollow}
                    value="Follow"
                    block
                  >
                    {this.state.isFollow ? "UnFollow" : "Follow"}
                  </Button>
                  <br />
                  <br />
                  <Button type="primary" onClick={this.toggleEndorse} block>
                    {this.state.isEndorse ? "UnEndorse" : "Endorse"}
                  </Button>
                  <br />
                </div>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }}>
                <Row
                  gutter={10}
                  type="flex"
                  justify="space-around"
                  align="middle"
                >
                  {/*Verification
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 24 }}
                  style={{ height: "100%" }}
                >
                  <UserVerificationsComponent
                    data={user.verification}
                    verification={this.userCardData().verification}
                  />
                </Col>*/}

                  <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="public-profile-connections">
                      <Tabs tabPosition="left" defaultActiveKey="1">
                        <TabPane tab="Endorsements" key="1">
                          <PublicUsersCardComponent
                            data={this.userCardData().endorsements}
                          />
                        </TabPane>
                        <TabPane tab="Endorsed" key="2">
                          <PublicUsersCardComponent
                            data={this.userCardData().endorsed}
                          />
                        </TabPane>
                        <TabPane tab="followers" key="3">
                          <PublicUsersCardComponent
                            data={this.userCardData().followers}
                          />
                        </TabPane>
                        <TabPane tab="following" key="4">
                          <PublicUsersCardComponent
                            data={this.userCardData().following}
                          />
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
            <h2 style={{ marginLeft: "10px" }}>Listings</h2>
            <Divider />
            <Row>
              {user && user.listings.length !== 0
                ? user.listings.map((listing, key) => (
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                      <PublicProfileListingCardComponent
                        listing={listing}
                        key={key}
                      />
                    </Col>
                  ))
                : "No Listings to show"}
            </Row>
          </div>
        )}
      </PageLayout>
    );
  }
}

PublicProfileView.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object,
  client: PropTypes.object,
  t: PropTypes.func
};
export default translate("user")(withApollo(PublicProfileView));
