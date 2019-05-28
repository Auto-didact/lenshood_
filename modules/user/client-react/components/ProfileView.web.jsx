import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, CardGroup, CardText, CardTitle, AccountLayout } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Icon } from 'antd';
import UserVerifications from './verification/UserVerifications';
import ProfileHead from './ProfileHead';
import UsersCard from './UsersCard';
import settings from '../../../../settings';
import AddressCard from './AddressCard';

// To Do Abstract Out

class ProfileView extends React.Component {
  usersCardData = () => {
    const { currentUser, currentUserLoading } = this.props;
    const { t } = this.props;
    const endorsements = currentUser.endorsements;

    const endorsed = currentUser.endorsed;
    const followers = currentUser.followers;
    const following = currentUser.following;

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
        console.log('there', follow);
        return follow;
      } else {
        return null;
      }
    }
    return {
      endorsements: {
        title: t('profile.card.group.endorsements.title'),
        notFound: t('profile.card.group.endorsements.notFound'),
        list: endorsements.map(getEndorsements)
      },
      endorsed: {
        title: t('profile.card.group.endorsed.title'),
        notFound: t('profile.card.group.endorsed.notFound'),
        list: endorsed.map(getEndorsed)
      },
      followers: {
        title: t('profile.card.group.followers.title'),
        notFound: t('profile.card.group.followers.notFound'),
        list: followers.map(getFollowers)
      },
      following: {
        title: t('profile.card.group.following.title'),
        notFound: t('profile.card.group.following.notFound'),
        list: following.map(getFollowing)
      },
      profileHead: {
        rating: t('profile.card.group.rating'),
        acceptanceRate: t('profile.card.group.acceptanceRate'),
        responseTime: t('profile.card.group.responseTime')
      }
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
    const { currentUser, currentUserLoading } = this.props;

    if (currentUserLoading && !currentUser) {
      return (
        <AccountLayout select="/profile">
          <div className="text-center">{t('profile.loadMsg')}</div>
        </AccountLayout>
      );
    } else if (currentUser) {
      console.log(currentUser);
      return (
        <AccountLayout select="/profile">
          <Row gutter={5}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }} align="center">
              <Card>
                <CardTitle>{t('profile.card.title')}</CardTitle>
                <Divider />
                <ProfileHead
                  profile={currentUser.profile && currentUser.profile}
                  description={this.usersCardData().profileHead}
                />
                <Divider />
                <Row>
                  <Col span={12}>
                    <div>
                      <h2>{t('profile.card.group.name')}:</h2>
                      <CardText>{currentUser.username}</CardText>
                    </div>
                    <div>
                      <h2>{t('profile.card.group.about')}:</h2>

                      <CardText>
                        {currentUser.profile && currentUser.profile.about ? currentUser.profile.about : 'Not Provided'}
                      </CardText>
                    </div>

                    <div>
                      <h2>{t('profile.card.group.role')}:</h2>

                      <CardText>{currentUser.role ? currentUser.role : 'Not Provided'}</CardText>
                    </div>

                    {/* Portfolios */}
                    <h2>{t('profile.card.group.portfolios.title')}</h2>
                    {currentUser.portfolios && currentUser.portfolios.length !== 0
                      ? currentUser.portfolios.map((portfolio, key) => (
                          <div key={key}>
                            <CardText>
                              {portfolio.platform} : {portfolio.portfolioUrl}
                            </CardText>
                          </div>
                        ))
                      : 'Not Provided'}
                  </Col>
                  <Col span={12}>
                    <div>
                      <Icon type="link" />

                      <CardText>
                        {currentUser.profile && currentUser.profile.website
                          ? currentUser.profile.website
                          : 'Not Provided'}
                      </CardText>
                    </div>

                    <div>
                      <h2>{t('profile.card.group.email')}:</h2>
                      <CardText>{currentUser.email ? currentUser.email : 'Not Provided'}</CardText>
                    </div>

                    <div>
                      <h2>
                        <Icon type="contacts" />
                      </h2>
                      <CardText>
                        {currentUser.profile && currentUser.profile.mobile
                          ? currentUser.profile.mobile
                          : 'Not Provided'}
                      </CardText>
                    </div>
                  </Col>
                </Row>
                <Divider />
                <h2>{t('profile.card.group.addresses.title')}</h2>
                <Row gutter={10}>
                  {currentUser.addresses && currentUser.addresses.length !== 0
                    ? currentUser.addresses.map((address, key) => (
                        <Col xs={{ span: 24 }} md={{ span: 12 }} key={key}>
                          <AddressCard
                            address={address}
                            subTitle={t('profile.card.group.addresses.subTitle')}
                            index={key}
                          />
                        </Col>
                      ))
                    : 'Not Provided'}
                </Row>

                {/* Credit card info (Stripe subscription module)*/}
                {settings.stripe.subscription.enabled &&
                  settings.stripe.subscription.publicKey &&
                  currentUser.role === 'user' && <StripeSubscriptionProfile />}
              </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Row gutter={10} type="flex" justify="space-around" align="middle">
                {/*Verification*/}
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 24 }} style={{ height: '100%' }}>
                  <UserVerifications data={currentUser.verification} />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 24 }}>
                  <Row>
                    {/*endorsements*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCard data={this.usersCardData().endorsements} />
                    </Col>
                    {/*endorsed*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCard data={this.usersCardData().endorsed} />
                    </Col>
                    {/*followers*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCard data={this.usersCardData().followers} />
                    </Col>
                    {/*following*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCard data={this.usersCardData().following} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Link className="mt-2 btn user-link" to={`/users/${currentUser.id}`}>
            {t('profile.editProfileText')}
          </Link>
        </AccountLayout>
      );
    } else {
      return (
        <AccountLayout>
          <h2>{t('profile.errorMsg')}</h2>
        </AccountLayout>
      );
    }
  }
}

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func
};
export default translate('user')(ProfileView);
