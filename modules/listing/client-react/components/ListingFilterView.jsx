import React, { useState } from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Form,
  FormItem,
  Select,
  Option,
  Label,
  Input
} from "@gqlapp/look-client-react";

const ListingFilterView = ({
  // filter: { searchText, gearSubcategory, gearCategory },
  searchText,
  gearSubcategory,
  gearCategory,
  onSearchTextChange,
  onRoleChange,
  t
}) => {
  let state = {
    gearCategory: ["", "Cameras", "Lenses"],
    gearSubcategory: {
      Cameras: [
        "",
        "DSLR",
        "SLR",
        "Mirrorless Camera",
        "Point & Shoot Camera",
        "Video Camera",
        "Cinema Camera",
        "Go Pro & Headcam",
        "Other"
      ],
      Lenses: [
        "",
        "DSLR Lens",
        "Prime Lens",
        "Mirrorless Lense",
        "Cinema Lens",
        "Lens Accessories",
        "Other Lenses"
      ]
    }
  };

  const [activeGearCategory, setActiveGearCategory] = useState(
    state.gearSubcategory[state.gearCategory[0]]
  );
  const [activegearSubcategory, setActivegearSubcategory] = useState(
    state.gearSubcategory[state.gearCategory[1]][0]
  );

  const handlegearCategoryChange = value => {
    setActiveGearCategory(value ? state.gearSubcategory[value] : null);
    setActivegearSubcategory(value ? state.gearSubcategory[value][0] : null);
  };

  const handlegearSubCategoryChange = value => {
    setActivegearSubcategory(value);
  };

  console.log(activeGearCategory, activegearSubcategory);
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
          defaultValue={state.gearCategory[0]}
          onChange={handlegearCategoryChange}
          style={{ width: 110 }}
        >
          {state.gearCategory.map((item, key) => (
            <Option key={key} value={item}>
              {item ? item : "All"}
            </Option>
          ))}
        </Select>
      </FormItem>
      &nbsp;
      {activeGearCategory ? (
        <FormItem label="gearSubcategory">
          <Select
            name="gearSubcategory"
            value={activegearSubcategory}
            onChange={handlegearSubCategoryChange}
            style={{ width: 190 }}
          >
            {activeGearCategory.map((item, key) => (
              <Option key={key} value={item}>
                {item ? item : "All"}
              </Option>
            ))}
          </Select>
        </FormItem>
      ) : null}
    </Form>
  );
};

ListingFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate("user")(ListingFilterView);
