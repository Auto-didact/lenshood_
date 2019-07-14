import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card } from 'antd';
import Featured_Img from '../images/download.png';

// import '../resources/listingCatalogue.css';

const { Meta } = Card;

export default class FeaturedUserCardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // To Do: check if it is not present then set as default value

    let { relatedUsers: user } = this.props;
    const user_img = user.avatar ? user.avatar : null;

    const firstName = (user && user.firstName) || null;
    const lastName = (user && user.lastName) || null;
    const title = firstName + ' ' + lastName || 'Not Provided';

    return (
      <Link
        className="listing-link"
        // Link to corresponding users public profile
        to="#"
      >
        <Card
          bodyStyle={{ margin: '0px' }}
          hoverable
          style={{
            height: '335px',
            width: '250px',
            textAlign: 'center'
          }}
          cover={
            <div
              style={{
                // Card
                overflow: 'hidden',
                // Background img
                height: '120px',
                borderRadius: '8px 8px 0px 0px',
                background: '#c3c3c3',
                objectFit: 'cover'
              }}
              align="center"
            >
              <img
                src={Featured_Img}
                style={{
                  objectFit: 'cover',
                  height: '100%'
                }}
              />
            </div>
          }
        >
          <img
            src={user_img}
            style={{
              width: '140px',
              height: '140px',
              border: '#fff 5px solid',
              borderRadius: '50%',
              margin: '20px',
              objectFit: 'cover',
              objectPosition: 'center right',
              position: 'relative',
              bottom: '125px'
            }}
          />
          {/* <Meta avatar={<Avatar src={user_img} />} /> */}
          <Meta
            title={<b>{title.substring(0, 25)}</b>}
            description={
              <div>
                <h4>{user.designation}</h4>
                <h4>{user.platform} </h4>
                <h4>{user.portfoliourl} </h4>
              </div>
            }
            style={{ position: 'relative', bottom: '125px' }}
          />

          {/* <Meta
            className="RelCardMeta"
            avatar={<Avatar src={sellerAvatar} />}
            title={
              <h3 className="CatalogUserName">
                {seller}
                <br />
                {rating ? <Rate disabled defaultValue={Number(rating)} className="CardRate" /> : <a>Not Reviewed</a>}
                // <div className="RelIconGroup">
                //   <Icon type="car" theme="filled" className="marginR10" />
                //   <Icon type="safety-certificate" theme="filled" />
                // </div>
              </h3>
            }
          /> */}
        </Card>
      </Link>
    );
  }
}

FeaturedUserCardComponent.propTypes = {
  relatedUsers: PropTypes.object.isRequired
};
