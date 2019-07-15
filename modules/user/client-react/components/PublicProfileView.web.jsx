import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Loader } from '@gqlapp/look-client-react';
// To Do Abstract Out
import { Row, Col, Divider, Tabs } from 'antd';

import PublicProfileHeadComponent from './components/PublicProfileHeadComponent';
import PublicUsersCardComponent from './components/PublicUsersCardComponent';
import PublicProfileListingCardComponent from './components/PublicProfileListingCardComponent';

import settings from '../../../../settings';

const { TabPane } = Tabs;

class PublicProfileView extends React.Component {
  isCurrentUser = () => {
    let id = 0;
    if (this.props.match) {
      id = Number(this.props.match.params.id);
    } else if (this.props.navigation) {
      id = Number(this.props.navigation.state.params.id);
    }
    return this.props.currentUser && id === this.props.currentUser.id;
  };
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
        title: t('profile.card.group.endorsements.title'),
        notFound: t('profile.card.group.endorsements.notFound'),
        list: !this.isCurrentUser() || endorsements.length === 0 ? [] : endorsements.map(getEndorsements)
      },
      endorsed: {
        title: t('profile.card.group.endorsed.title'),
        notFound: t('profile.card.group.endorsed.notFound'),
        list: !this.isCurrentUser() || endorsed.length === 0 ? [] : endorsed.map(getEndorsed)
      },
      followers: {
        title: t('profile.card.group.followers.title'),
        notFound: t('profile.card.group.followers.notFound'),
        list: !this.isCurrentUser() || followers.length === 0 ? [] : followers.map(getFollowers)
      },
      following: {
        title: t('profile.card.group.following.title'),
        notFound: t('profile.card.group.following.notFound'),
        list: !this.isCurrentUser() || following.length === 0 ? [] : following.map(getFollowing)
      },
      profileHead: {
        rating: t('profile.card.group.rating'),
        acceptanceRate: t('profile.card.group.acceptanceRate'),
        responseTime: t('profile.card.group.responseTime')
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
        title={`${settings.app.name} - ${t('profile.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('profile.meta')}`
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
        {loading && !user && <Loader text={t('profile.loadMsg')} />}
        {user && (
          <div>
            <Row style={{ margin: '40px 0px ' }}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <div style={{ margin: '5px' }}>
                  <PublicProfileHeadComponent
                    profile={user.profile && user.profile}
                    description={this.userCardData().profileHead}
                    role={user.role}
                    username={user.username}
                    portfolios={user.portfolios}
                  />
                </div>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }}>
                <Row gutter={10} type="flex" justify="space-around" align="middle">
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
                          <PublicUsersCardComponent data={this.userCardData().endorsements} />
                        </TabPane>
                        <TabPane tab="Endorsed" key="2">
                          <PublicUsersCardComponent data={this.userCardData().endorsed} />
                        </TabPane>
                        <TabPane tab="followers" key="3">
                          <PublicUsersCardComponent data={this.userCardData().followers} />
                        </TabPane>
                        <TabPane tab="following" key="4">
                          <PublicUsersCardComponent data={this.userCardData().following} />
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
            <h2 style={{ marginLeft: '10px' }}>Listings</h2>
            <Divider />
            <Row>
              {user && user.listings.length !== 0
                ? user.listings.map((listing, key) => (
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                      <PublicProfileListingCardComponent listing={listing} key={key} />
                    </Col>
                  ))
                : 'No Listings to show'}
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
  t: PropTypes.func
};
export default translate('user')(PublicProfileView);
