import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

import ListingForm from './ListingForm';
import settings from '../../../../settings';

const onSubmit = (listing, editListing) => values => {
  editListing(listing.id, values.gearCategory, values.gearSubcategory, values.description);
};

const ListingEditView = ({ loading, listing, location, editListing, t }) => {
  let listingObj = listing;
  // if new listing was just added read it from router
  if (!listingObj && location.state) {
    listingObj = location.state.listing;
  }

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

  if (loading && !listingObj) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">{t('listing.loadMsg')}</div>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData()}
        <Link id="back-button" to="/listings">
          {t('listing.btn.back')}
        </Link>
        <h2>
          {t(`listing.label.edit`)} {t('listing.label.listing')}
        </h2>
        <ListingForm onSubmit={onSubmit(listingObj, editListing)} listing={listing} />
      </PageLayout>
    );
  }
};

ListingEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  editListing: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingEditView);
