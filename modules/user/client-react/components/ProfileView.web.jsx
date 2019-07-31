import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, CardGroup, CardText, CardTitle, AccountLayout, Loader } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Icon, Button } from 'antd';
import UserVerificationsComponent from './verification/UserVerificationsComponent';
import ProfileHeadComponent from './ProfileHeadComponent';
import UsersCardComponent from './UsersCardComponent';
import settings from '../../../../settings';
import AddressCardComponent from './AddressCardComponent';

// To Do Abstract Out

class ProfileView extends React.Component {
  userCardData = () => {
    const { currentUser, currentUserLoading } = this.props;
    const { t } = this.props;
    const endorsements = currentUser.endorsements;

    const endorsed = currentUser.endorsed;
    const followers = currentUser.followers;
    const following = currentUser.following;

    function getEndorsements(endorsement) {
      return endorsement.endorser.profile;
    }
    function getEndorsed(endorse) {
      return endorse.endorsee.profile;
    }

    function getFollowers(follower) {
      return follower.follower.profile;
    }

    function getFollowing(follow) {
      return follow.followee.profile;
    }
    return {
      endorsements: {
        title: t('profile.card.group.endorsements.title'),
        notFound: t('profile.card.group.endorsements.notFound'),
        list: endorsements? endorsements.map(getEndorsements) : []
      },
      endorsed: {
        title: t('profile.card.group.endorsed.title'),
        notFound: t('profile.card.group.endorsed.notFound'),
        list:endorsed? endorsed.map(getEndorsed) : []
      },
      followers: {
        title: t('profile.card.group.followers.title'),
        notFound: t('profile.card.group.followers.notFound'),
        list:followers?  followers.map(getFollowers) : []
      },
      following: {
        title: t('profile.card.group.following.title'),
        notFound: t('profile.card.group.following.notFound'),
        list:following? following.map(getFollowing): []
      },
      profileHead: {
        rating: t('profile.card.group.rating'),
        acceptanceRate: t('profile.card.group.acceptanceRate'),
        responseTime: t('profile.card.group.responseTime')
      },
      verification: {
        mobileVerification: {
          isVerified: currentUser && currentUser.verification && currentUser.verification.isMobileVerified,
          mobile: currentUser && currentUser.profile && currentUser.profile.mobile
        },
        emailVerification: {
          isVerified: currentUser && currentUser.verification && currentUser.verification.isEmailVerified,
          email: currentUser.email
        },
        dlVerification: {
          isVerified: currentUser && currentUser.verification && currentUser.verification.isIdVerified,
          identification: currentUser.identification
        }
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
    console.log(currentUser)
    if (currentUserLoading && !currentUser) {
      return (
        <AccountLayout select="/profile">
          <Loader text={t('profile.loadMsg')} />
        </AccountLayout>
      );
    } else if (currentUser) {
      return (
        <AccountLayout select="/profile">
          <Row gutter={5}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }} align="center">
              <Card>
                <div align="right">
                  <Link to={`/users/${currentUser.id}`}>
                    <Button shape="circle" size="large">
                      <Icon type="edit" />
                    </Button>
                  </Link>
                </div>

                <ProfileHeadComponent
                  profile={currentUser.profile && currentUser.profile}
                  description={this.userCardData().profileHead}
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
                      <h2>
                        <Icon type="link" />
                      </h2>
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
                          <AddressCardComponent
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
                  <UserVerificationsComponent
                    data={currentUser.verification}
                    verification={this.userCardData().verification}
                  />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 24 }}>
                  <Row>
                    {/*endorsements*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCardComponent data={this.userCardData().endorsements} />
                    </Col>
                    {/*endorsed*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCardComponent data={this.userCardData().endorsed} />
                    </Col>
                    {/*followers*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCardComponent data={this.userCardData().followers} />
                    </Col>
                    {/*following*/}
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                      <UsersCardComponent data={this.userCardData().following} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
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
