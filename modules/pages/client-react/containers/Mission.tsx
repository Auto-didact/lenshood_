import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import MissionView from '../components/MissionView';

interface PagesProps {
  t: TranslateFunction;
}

class Mission extends React.Component<PagesProps> {
  public render() {
    return <MissionView {...this.props} />;
  }
}

export default translate('pages')(Mission);
