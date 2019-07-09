import React from 'react';
import PropTypes from 'prop-types';
import { PageLayout } from '@gqlapp/look-client-react';
import ListingCatalogue from '../containers/ListingCatalogue';

const ListingCatalogueView = () => {
  return (
    <PageLayout style={{ padding: '5px' }}>
      <ListingCatalogue />
    </PageLayout>
  );
};

ListingCatalogueView.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ListingCatalogueView;
