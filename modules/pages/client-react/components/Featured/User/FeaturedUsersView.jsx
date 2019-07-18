import React from "react"; // , { useEffect }
// import Helmet from 'react-helmet';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';
import FeaturedUserCardListComponent from "./FeaturedUserCardListComponent";

// interface FeaturedUsersViewProps {
//   t: TranslateFunction;
// }

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

export default class FeaturedUsersView extends React.Component
// <FeaturedUsersViewProps>
{
  state = {
    users: [
      {
        id: 1,
        avatar:
          "http://static.eharmony.com/blog/wp-content/uploads/2010/04/eHarmony-Blog-profile-picture.jpg",
        userName: "John Doe",
        firstName: "John",
        lastName: "Doe",
        designation: "CEO",
        platform: "Google",
        portfoliourl: "www.google.com"
      },
      {
        id: 2,
        avatar:
          "https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg",
        userName: "Mario Speedwagon",
        firstName: "Mario",
        lastName: "Speedwagon",
        platform: "Facebook",
        portfoliourl: "www.facebook.com",
        designation: "Business Head"
      },
      {
        id: 3,
        avatar:
          "http://static.eharmony.com/blog/wp-content/uploads/2010/04/eHarmony-Blog-profile-picture.jpg",
        userName: "John Doe",
        firstName: "John",
        lastName: "Doe",
        designation: "CEO",
        platform: "Google",
        portfoliourl: "www.google.com"
      },
      {
        id: 4,
        avatar:
          "https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg",
        userName: "Mario Speedwagon",
        firstName: "Mario",
        lastName: "Speedwagon",
        platform: "Facebook",
        portfoliourl: "www.facebook.com",
        designation: "Business Head"
      }
    ]
  };

  render() {
    return (
      <React.Fragment style={{ backgroundColor: "#c3c3c3" }}>
        <h1 style={{ textAlign: "center", fontSize: "30px" }}>
          Featured Users
        </h1>

        <div align="center">
          <div
            style={{ height: "2px", width: "342px", background: "#23b195" }}
          />
        </div>
        <br />
        <FeaturedUserCardListComponent relatedUser={this.state.users} />
      </React.Fragment>
    );
  }
}
