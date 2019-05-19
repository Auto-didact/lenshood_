import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, CardGroup, CardText, AccountLayout } from '@gqlapp/look-client-react';
import { Row, Col } from 'antd';
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
    // To Do remove these hardcode values use map instead
    return {
      endorsements: {
        title: t('profile.card.group.endorsements.title'),
        notFound: t('profile.card.group.endorsements.notFound'),
        list: [
          {
            avatar: endorsements[0].endorser.profile.avatar,
            firstName: endorsements[0].endorser.profile.firstName,
            lastName: endorsements[0].endorser.profile.lastName
          },
          {
            avatar: endorsements[1].endorser.profile.avatar,
            firstName: endorsements[1].endorser.profile.firstName,
            lastName: endorsements[1].endorser.profile.lastName
          }
        ]
      },
      endorsed: {
        title: t('profile.card.group.endorsed.title'),
        notFound: t('profile.card.group.endorsed.notFound'),
        list: [
          {
            avatar: endorsed[0].endorsee.profile.avatar,
            firstName: endorsed[0].endorsee.profile.firstName,
            lastName: endorsed[0].endorsee.profile.lastName
          }
        ]
      },
      followers: {
        title: t('profile.card.group.followers.title'),
        notFound: t('profile.card.group.followers.notFound'),
        list: [
          {
            avatar: followers[0].follower.profile.avatar,
            firstName: followers[0].follower.profile.firstName,
            lastName: followers[0].follower.profile.lastName
          },
          {
            avatar: followers[1].follower.profile.avatar,
            firstName: followers[1].follower.profile.firstName,
            lastName: followers[1].follower.profile.lastName
          }
        ]
      },
      following: {
        title: t('profile.card.group.following.title'),
        notFound: t('profile.card.group.following.notFound'),
        list: []
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
      // console.log(currentUser);
      return (
        <AccountLayout select="/profile">
          <h2 style={{ padding: '0 20px 0px 33%' }}>
            <strong>{t('profile.card.title')}</strong>
          </h2>

          <Row gutter={5} style={{ padding: '0px 0px 0px 3%' }}>
            <Col span={16}>
              <Card>
                <ProfileHead profile={currentUser.profile} description={this.usersCardData().profileHead} />

                <Row>
                  <Col span={12}>
                    <CardGroup>
                      <h2>{t('profile.card.group.name')}:</h2>
                      <CardText>{currentUser.username}</CardText>
                    </CardGroup>
                    {currentUser.profile && currentUser.profile.website && (
                      <CardGroup>
                        <h2>{t('profile.card.group.website')}:</h2>
                        <CardText>{currentUser.profile.website}</CardText>
                      </CardGroup>
                    )}

                    <CardGroup>
                      <h2>{t('profile.card.group.email')}:</h2>
                      <CardText>{currentUser.email}</CardText>
                    </CardGroup>

                    {currentUser.profile && currentUser.profile.mobile && (
                      <CardGroup>
                        <h2>{t('profile.card.group.mobile')}:</h2>
                        <CardText>{currentUser.profile.mobile}</CardText>
                      </CardGroup>
                    )}

                    <CardGroup>
                      <h2>{t('profile.card.group.role')}:</h2>
                      <CardText>{currentUser.role}</CardText>
                    </CardGroup>
                    {/* Portfolios */}
                    <CardGroup>
                      <h2>{t('profile.card.group.portfolios.title')}</h2>
                      {currentUser.portfolios.map((portfolio, key) => (
                        <h3>
                          {t('profile.card.group.portfolios.subtitle')} : {key + 1}
                        </h3>
                      ))}
                    </CardGroup>
                  </Col>
                  <Col span={12}>
                    {/* Addresses */}
                    {currentUser.profile && currentUser.profile.about && (
                      <CardGroup>
                        <h2>{t('profile.card.group.about')}:</h2>
                        <CardText>{currentUser.profile.about}</CardText>
                      </CardGroup>
                    )}

                    <CardGroup>
                      <h2>{t('profile.card.group.addresses.title')}</h2>
                      {currentUser.addresses.map((address, key) => (
                        <AddressCard
                          address={address}
                          subTitle={t('profile.card.group.addresses.subTitle')}
                          index={key}
                        />
                      ))}
                    </CardGroup>

                    {/* Credit card info (Stripe subscription module)*/}
                    {settings.stripe.subscription.enabled &&
                      settings.stripe.subscription.publicKey &&
                      currentUser.role === 'user' && <StripeSubscriptionProfile />}
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <UserVerifications data={currentUser.verification} />
              <UsersCard data={this.usersCardData().endorsements} />
              <UsersCard data={this.usersCardData().endorsed} />
              <UsersCard data={this.usersCardData().followers} />
              <UsersCard data={this.usersCardData().following} />
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
