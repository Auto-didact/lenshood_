import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import FeaturedUsersView from '../components/FeaturedUsersView';

interface PagesProps {
  t: TranslateFunction;
}

class FeaturedUsers extends React.Component<PagesProps> {
  public render() {
    return <FeaturedUsersView {...this.props} />;
  }
}

export default translate('pages')(FeaturedUsers);
