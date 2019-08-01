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
  let state = {
    gearCategory: ['','Cameras', 'Lenses', 'Tripods and Support', 'Lighting', 'Studio Space'],
    gearSubcategory: {
      Cameras: ['',"DSLR's", 'Point and Shoot cameras', 'Mirrorless cameras', 'Action cams', 'Cinema Cameras'],
      Lenses: ['','DSLR Lenses', 'Mirrorless Lenses', 'Cinema Lenses'],
      Lighting: ['','Photography Lighting', 'Video Lighting', 'Lighting Accesories'],
      'Tripods and Support': ['','Tripods/Monopods', 'Gimbals/Stabilizers', 'Rigs/Sliders']
    },
    gearSubSubcategory: {
      'DSLR Lenses': ['','Standard/Zoom Lens', 'Wide angle/Fish eye Lens', 'Fixed/Prime Lens'],
      'Mirrorless Lenses': ['','Standard/Zoom Lens', 'Wide angle/Fish eye Lens', 'Fixed/Prime Lens']
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
          // style={{ width: 110 }}
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
            style={{ width: 230 }}
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
