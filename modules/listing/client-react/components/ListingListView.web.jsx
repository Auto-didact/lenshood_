/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Button } from '@gqlapp/look-client-react';
import ListingFilterComponent from './ListingFilterComponent';
import ListingListComponent from './ListingListComponent';
import settings from '../../../../settings';

const ListingListView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('list.meta')}`
          }
        ]}
      />
      <h2>{t('list.subTitle')}</h2>
      <Link to="/listing/new">
        <Button color="primary">{t('list.btn.add')}</Button>
      </Link>
      <hr />
      <ListingFilterComponent {...props} />
      <hr />
      <ListingListComponent {...props} />
    </PageLayout>
  );
};

ListingListView.propTypes = {
  t: PropTypes.func
};

export default translate('listing')(ListingListView);
