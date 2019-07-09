import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import LiveSearchComponent from '../components/LiveSearchComponent';
import LiveSearchFilterComponent from '../components/LiveSearchFilterComponent';
import { useLiveSearchWithSubscription } from './withSubscription';
import {
  withFilterUpdating,
  withOrderByUpdating,
  withLiveSearch,
  withIncreSearchItem,
  withdecreSearchItem,
  withLiveSearchState,
  updateLiveSearchState
} from './LiveSearchOperations';

const LiveSearch = props => {
  const { t, updateQuery, subscribeToMore, filter } = props;
  const liveSearchUpdated = useLiveSearchWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (liveSearchUpdated) {
      updateLiveSearchState(liveSearchUpdated, updateQuery);
    }
  });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
  );

  console.log(props);
  return (
    <PageLayout>
      {renderMetaData()}
      <h1>Live searches</h1>
      <h2>See if someone needs something you have…</h2>
      <hr />
      <LiveSearchFilterComponent {...props} />
      <hr />
      <LiveSearchComponent {...props} />
    </PageLayout>
  );
};

LiveSearch.propTypes = {
  liveSearchUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  withLiveSearchState,
  withLiveSearch,
  withIncreSearchItem,
  withdecreSearchItem,
  withOrderByUpdating,
  withFilterUpdating
)(translate('liveSearch')(LiveSearch));
