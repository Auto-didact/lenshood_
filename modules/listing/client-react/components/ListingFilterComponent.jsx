import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Input } from '@gqlapp/look-client-react';

const ListingFilterComponent = props => {
  const {
    filter: { searchText, gearSubcategory, gearCategory },
    onSearchTextChange,
    ongearCategoryChange,
    ongearSubcategoryChange,
    t
  } = props;
  console.log(props);
  let state = {
    gearCategory: ['', 'Cameras', 'Lenses', 'Drones', 'Lighting'],
    gearSubcategory: {
      Cameras: [
        '',
        'DSLR',
        'SLR',
        'Mirrorless Camera',
        'Point & Shoot Camera',
        'Video Camera',
        'Cinema Camera',
        'Go Pro & Headcam',
        'Other'
      ],
      Lenses: ['', 'DSLR Lens', 'Prime Lens', 'Mirrorless Lense', 'Cinema Lens', 'Lens Accessories', 'Other Lenses']
    }
  };

  const [activeGearCategory, setActiveGearCategory] = useState(gearCategory);

  const [activeGearSubCategory, setActiveGearSubCategory] = useState(gearSubcategory);

  const handlegearCategoryChange = value => {
    ongearCategoryChange(value);
    ongearSubcategoryChange('');
    setActiveGearCategory(value ? state.gearSubcategory[value] : null);
    setActiveGearSubCategory(value ? (state.gearSubcategory[value] ? state.gearSubcategory[value][0] : null) : null);
  };

  const handlegearSubCategoryChange = value => {
    ongearSubcategoryChange(value);
    setActiveGearSubCategory(value);
  };

  return (
    <Form layout="inline">
      <FormItem label="Filter">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder="Search"
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
      &nbsp;
      <FormItem label="gearCategory">
        <Select
          name="gearCategory"
          defaultValue={gearCategory}
          onChange={value => {
            handlegearCategoryChange(value);
          }}
          style={{ width: 110 }}
        >
          {state.gearCategory.map((item, key) => (
            <Option key={key} value={item}>
              {item ? item : 'All'}
            </Option>
          ))}
        </Select>
      </FormItem>
      &nbsp;
      {activeGearCategory ? (
        <FormItem label="gearSubcategory">
          <Select
            name="gearSubcategory"
            value={activeGearSubCategory}
            onChange={value => {
              handlegearSubCategoryChange(value);
            }}
            style={{ width: 190 }}
          >
            {activeGearCategory.map((item, key) => (
              <Option key={key} value={item}>
                {item ? item : 'All'}
              </Option>
            ))}
          </Select>
        </FormItem>
      ) : null}
    </Form>
  );
};

ListingFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  ongearCategoryChange: PropTypes.func.isRequired,
  ongearSubcategoryChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingFilterComponent);
