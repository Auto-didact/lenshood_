import React from 'react';
import {
  translate
  // , TranslateFunction
} from '@gqlapp/i18n-client-react';
import FeaturedListingView from '../../components/Featured/Listing/FeaturedListingView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class FeaturedListing extends React.Component
// <PagesProps>
{
  state = {
    listings: [
      {
        createdAt: '2019-06-02 13:01:28',
        gearCategory: 'Listing gear_category 20',
        gearSubcategory: 'Listing gear_subcategory 20',
        id: 20,
        listingImages: {
          0: {
            id: 58,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            __typename: 'ListingImage'
          },
          1: {
            id: 59,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            __typename: 'ListingImage'
          },
          2: {
            id: 60,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            __typename: 'ListingImage'
          }
        },
        listingRental: {
          id: 20,
          perDay: 190,
          __typename: 'ListingRental'
        },
        user: {
          id: 1,
          profile: {
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            firstName: 'admin',
            lastName: 'lenshood',
            rating: '4'
          },
          username: 'admin'
        }
      },
      {
        createdAt: '2019-06-02 13:01:28',
        gearCategory: 'Listing gear_category 19',
        gearSubcategory: 'Listing gear_subcategory 19',
        id: 19,
        listingImages: {
          0: {
            id: 55,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            typename: 'ListingImage'
          },
          1: {
            id: 56,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            typename: 'ListingImage'
          },
          2: {
            id: 57,
            imageUrl:
              'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            typename: 'ListingImage'
          }
        },
        listingRental: { id: 19, perDay: 180, __typename: 'ListingRental' },
        user: {
          id: 1,
          profile: {
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            firstName: 'admin',
            lastName: 'lenshood',
            rating: '4',
            __typename: 'UserProfile'
          },
          username: 'admin'
        }
      }
    ]
  };
  // public
  render() {
    return <FeaturedListingView {...this.props} listings={this.state.listings} />;
  }
}

export default translate('pages')(FeaturedListing);
