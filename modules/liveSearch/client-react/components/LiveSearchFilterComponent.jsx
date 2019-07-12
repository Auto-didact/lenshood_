import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';

const activeGearCategory = ['', 'Cameras', 'Lenses', 'Drones', 'Lighting'];

const LiveSearchFilterComponent = ({
  filter: { searchText, gearCategory },
  onSearchTextChange,
  onGearCategoryChange
}) => (
  <Form layout="inline">
    {console.log('Entries', gearCategory, searchText)}
    <FormItem label="Search">
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        placeholder="Search Item"
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
          onGearCategoryChange(value);
        }}
      >
        {activeGearCategory.map((item, key) => (
          <Option key={key} value={item}>
            {item ? item : 'All'}
          </Option>
        ))}
      </Select>
    </FormItem>
  </Form>
);

LiveSearchFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onGearCategoryChange: PropTypes.func.isRequired
};

export default LiveSearchFilterComponent;
