import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Loader, DataNotFound } from '@gqlapp/look-client-react';

import ListingFormComponent from './ListingFormComponent';
import settings from '../../../../settings';

const onSubmit = (listing, editListing) => values => {
  values['id'] = listing.id;

  editListing(values);
};

const ListingEditView = ({ loading, listing, location, editListing, t, currentUser, users }) => {
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
        <Loader text={t('listing.loadMsg')} />
      </PageLayout>
    );
  } else if ((!loading && !listingObj) || (currentUser.id != listingObj.user.id && currentUser.role === 'user')) {
    return (
      <PageLayout>
        {renderMetaData()}
        <DataNotFound description={<h3>Listing not found!</h3>} />
      </PageLayout>
    );
  } else if (listingObj) {
    return (
      <PageLayout>
        {renderMetaData()}
        {/* <Link id="back-button" to="/listings">
          {t('listing.btn.back')}
        </Link>
        <h2>
          {t(`listing.label.edit`)} {t('listing.label.listing')}
        </h2> */}
        <ListingFormComponent
          onSubmit={onSubmit(listingObj, editListing)}
          listing={listing}
          currentUser={currentUser}
          users={users}
        />
      </PageLayout>
    );
  }
};

ListingEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  editListing: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  users: PropTypes.array,
  t: PropTypes.func
};

export default translate('listing')(ListingEditView);
