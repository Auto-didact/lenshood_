import React, { Component } from 'react';
import { Row, Col, Rate, Button, Card, Avatar, message } from 'antd';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { CardText } from '@gqlapp/look-client-react';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserId.graphql';
import { ImgUser } from '../../constants/DefaultImages';
// import '../resources/listingCatalogue.css';
import TOGGLE_ENDORSE from '../../graphql/ToggleEndorse.graphql';
import TOGGLE_FOLLOW from '../../graphql/ToggleFollow.graphql';
import IS_FOLLOW from '../../graphql/IsFollowed.graphql';
import Is_Endorse from '../../graphql/IsEndorsed.graphql';

const { Meta } = Card;

class UserCardComponent extends Component {
  state = {
    currentUserId: parseInt(this.props.userId),
    sellerId: parseInt(this.props.seller.id),
    isFollow: false,
    isEndorse: false
  };

  componentWillMount = async () => {
    await this.current_user();
    await this.isEndorsedF();
    await this.isFollowF();
  };

  isEndorsedF = async () => {
    let result = await this.props.client.mutate({
      mutation: Is_Endorse,
      variables: { endorsee: parseInt(this.props.seller.id), endorser: this.state.currentUserId }
    });
    this.setState({ isEndorse: result.data.isEndorsed });
  };

  isFollowF = async () => {
    let result = await this.props.client.mutate({
      mutation: IS_FOLLOW,
      variables: { u_Id: parseInt(this.props.seller.id), f_Id: this.state.currentUserId }
    });
    this.setState({ isFollow: result.data.isFollwed });
  };

  toggleEndorse = async () => {
    let result = await this.props.client.mutate({
      mutation: TOGGLE_ENDORSE,
      variables: { endorsee: this.state.sellerId, endorser: this.state.currentUserId }
    });
    this.setState({ isEndorse: result.data.toggleEndorse.isEndorsed });
    message.info('Endorse Count is ' + result.data.toggleEndorse.endorsecount);
  };

  toggleFollow = async () => {
    let result = await this.props.client.mutate({
      mutation: TOGGLE_FOLLOW,
      variables: { u_Id: this.state.sellerId, f_Id: this.state.currentUserId }
    });
    this.setState({ isFollow: result.data.toggleFollow.isFollwed });
    message.info('Follower Count is ' + result.data.toggleFollow.follwerCount);
  };

  current_user = async () => {
    let result = await this.props.client.query({
      query: CURRENT_USER_QUERY
    });
    this.setState({ currentUserId: parseInt(result.data.currentUser.id) });
  };

  render() {
    let seller = this.props.seller;
    const portfolios = this.props.seller && this.props.seller.portfolios;
    const firstName = seller && seller.profile && seller.profile.firstName;
    const lastName = seller && seller.profile && seller.profile.lastName;

    const sellerName =
      firstName && lastName
        ? `${firstName} ${lastName}`
        : firstName || lastName
        ? firstName
          ? firstName
          : lastName
        : 'Name Not Provided';

    return (
      <Card style={{ backgroundColor: '#FAFAFA', width: '100%', marginTop: '10px' }}>
        <Row type="flex" justify="space-around" align="middle">
          <Col lg={{ span: 18 }} md={{ span: 24 }} xs={{ span: 24 }} sm={{ span: 16 }} style={{ marginTop: '5px' }}>
            <Meta
              avatar={<Avatar size={70} src={seller.profile.avatar ? seller.profile.avatar : ImgUser} />}
              title={
                <div>
                  <h4 className="UserCardUserName">{sellerName}</h4>
                  <div>
                    {seller.profile.rating ? (
                      <Rate disabled defaultValue={Number(seller.profile.rating)} className="font10 mainColor" />
                    ) : (
                      <p>Not Rated</p>
                    )}
                  </div>
                  <h6>Read Reviews ({seller.reviewsCount || '0'})</h6>
                </div>
              }
            />
          </Col>
          <Col
            lg={{ span: 6 }}
            md={{ span: 24 }}
            xs={{ span: 24 }}
            sm={{ span: 8 }}
            style={{ marginTop: '5px', maxWidth: '150px' }}
          >
            <div align="center">
              <Button type="primary" onClick={this.toggleFollow} value="Follow" block>
                {this.state.isFollow ? 'UnFollow' : 'Follow'}
              </Button>
              <br />
              <br />
              <Button type="primary" onClick={this.toggleEndorse} block>
                {this.state.isEndorse ? 'UnEndorse' : 'Endorse'}
              </Button>
              <br />
            </div>
          </Col>
        </Row>

        <br />
        <h4 className="font14">About</h4>
        <p className="font12">{seller.profile.about}</p>
        <h4 className="font14">Web references</h4>
        {portfolios ? (
          portfolios.map((item, id) => (
            <strong key={id}>
              <a href={item.portfolioUrl} className="font12 itemLink">
                {item.portfolioUrl}
                <br />
              </a>
            </strong>
          ))
        ) : (
          <CardText>Not Available</CardText>
        )}
        <br />
        <br />
        <div align="center">
          <Button href={`/public-profile/${seller.id}`}>View Profile</Button>
        </div>
      </Card>
    );
  }
}

UserCardComponent.propTypes = {
  client: PropTypes.object,
  seller: PropTypes.object,
  userId: PropTypes.number
};

export default withApollo(UserCardComponent);