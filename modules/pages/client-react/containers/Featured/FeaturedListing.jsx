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
  // public
  render() {
    return <FeaturedListingView {...this.props} />;
  }
}

export default translate('pages')(FeaturedListing);
