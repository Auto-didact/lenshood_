import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { StripeSubscriptionProfile } from "@gqlapp/payments-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Card,
  CardGroup,
  CardText,
  CardTitle,
  PageLayout
} from "@gqlapp/look-client-react";
// To Do Abstract Out
import { Row, Col, Divider, Icon, Button, Tabs } from "antd";
import PublicProfileHead from "./components/PublicProfileHead";
import PublicUsersCard from "./components/PublicUsersCard";
import PublicProfileListingCard from "./components/PublicProfileListingCard";

import settings from "../../../../settings";

const { TabPane } = Tabs;

class PublicProfileView extends React.Component {
  userCardData = () => {
    const { user, loading } = this.props;
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
        return follow.following.profile;
      } else {
        return null;
      }
    }
    return {
      endorsements: {
        title: t("profile.card.group.endorsements.title"),
        notFound: t("profile.card.group.endorsements.notFound"),
        list: endorsements.length === 0 ? [] : endorsements.map(getEndorsements)
      },
      endorsed: {
        title: t("profile.card.group.endorsed.title"),
        notFound: t("profile.card.group.endorsed.notFound"),
        list: endorsed.length === 0 ? [] : endorsed.map(getEndorsed)
      },
      followers: {
        title: t("profile.card.group.followers.title"),
        notFound: t("profile.card.group.followers.notFound"),
        list: followers.length === 0 ? [] : followers.map(getFollowers)
      },
      following: {
        title: t("profile.card.group.following.title"),
        notFound: t("profile.card.group.following.notFound"),
        list: following.length === 0 ? [] : following.map(getFollowing)
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

    if (loading && !user) {
      return (
        <PageLayout select="/profile">
          <div className="text-center">{t("profile.loadMsg")}</div>
        </PageLayout>
      );
    } else {
      return (
        <PageLayout select="/profile">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 15 }} align="center">
              <Card style={{ margin: "5px" }}>
                <PublicProfileHead
                  profile={user.profile && user.profile}
                  description={this.userCardData().profileHead}
                  role={user.role}
                  username={user.username}
                  email={user.email}
                  city={
                    user.addresses.length !== 0 && user.addresses[0].city
                      ? user.addresses[0].city
                      : null
                  }
                  portfolios={user.portfolios}
                />
              </Card>
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
                  <UserVerifications
                    data={user.verification}
                    verification={this.userCardData().verification}
                  />
                </Col>*/}

                <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 24 }}>
                  <Card
                    bodyStyle={{ margin: "0px", padding: "0px" }}
                    style={{ margin: "5px" }}
                  >
                    <Tabs tabPosition="left" defaultActiveKey="1">
                      <TabPane tab="Endorsements" key="1">
                        <PublicUsersCard
                          data={this.userCardData().endorsements}
                        />
                      </TabPane>
                      <TabPane tab="Endorsed" key="2">
                        <PublicUsersCard data={this.userCardData().endorsed} />
                      </TabPane>
                      <TabPane tab="followers" key="3">
                        <PublicUsersCard data={this.userCardData().followers} />
                      </TabPane>
                      <TabPane tab="following" key="4">
                        <PublicUsersCard data={this.userCardData().following} />
                      </TabPane>
                    </Tabs>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {user && user.listings.length !== 0
              ? user.listings.map((listing, key) => (
                  <Col span={6}>
                    <PublicProfileListingCard listing={listing} key={key} />
                  </Col>
                ))
              : "No Listings to show"}
          </Row>
        </PageLayout>
      );
    }
  }
}

PublicProfileView.propTypes = {
  UserLoading: PropTypes.bool,
  User: PropTypes.object,
  t: PropTypes.func
};
export default translate("user")(PublicProfileView);
