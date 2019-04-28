import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

import ListingForm from './ListingForm';
import settings from '../../../../settings';

const onSubmit = addListing => values => {
  addListing(values);
};

const ListingAddView = ({ addListing, t }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('listing.title')}`}
      meta={[
        {
          name: 'description',
          content: t('listing.meta')
        }
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <Link id="back-button" to="/listings">
        {t('listing.btn.back')}
      </Link>
      <ListingForm onSubmit={onSubmit(addListing)} />
      <br />
    </PageLayout>
  );
};

ListingAddView.propTypes = {
  addListing: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingAddView);
