import React, { Component } from "react";
import PropTypes from "prop-types";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { FieldArray } from "formik";
import {
  RenderField,
  RenderSelect,
  RenderAutoComplete,
  // Option,
  RenderUploadMultiple,
  RenderDynamicField,
  RenderCheckBox,
  RenderRadioGroup
} from "@gqlapp/look-client-react";

// Abstract Radio Button out To Do
import { Radio, Select } from "antd";

const RadioButton = Radio.Button;

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* To Do - Find a way to handle these options in a better way (Database or Constants) */
      listingCategories: [
        {
          gearCategory: "Cameras",
          gearSubcategories: [
            "DSLR",
            "SLR",
            "Mirrorless Camera",
            "Point & Shoot Camera",
            "Video Camera",
            "Cinema Camera",
            "Go Pro & Headcam",
            "Other"
          ],
          components: [
            "Body",
            "Lens",
            "Memory Card",
            "Battery",
            "Battery Charger"
          ]
        },
        {
          gearCategory: "Lenses",
          gearSubcategories: [
            "DSLR Lens",
            "Prime Lens",
            "Mirrorless Lense",
            "Cinema Lens",
            "Lens Accessories",
            "Other Lenses"
          ],
          components: ["Lens"]
        }
      ],
      status: ["idle", "on_rent", "on_shelf", "disabled"],
      activeGearCategory: null,
      activeGearSubcategories: null,
      activeComponents: null,

      listingCondition: ["New", "Good", "Fair"],
      listingAge: ["< 1 year", "1 - 2 years", "> 3 years"],

      listingContent: props.values.listingContent,

      isAdmin: false,

      // FOR RENDERAUTOCOMPLETE
      dataSource: []
    };
    this.handleGearCategoryChange = this.handleGearCategoryChange.bind(this);
    this.handleGearSubCategoryChange = this.handleGearSubCategoryChange.bind(
      this
    );

    // FOR RENDERAUTOCOMPLETE
    this.handleSearch = this.handleSearch.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  handleGearCategoryChange = value => {
    const activeGearCategory = this.state.listingCategories.filter(category => {
      return category.gearCategory == value;
    });
    const gearSubcategories = activeGearCategory[0].gearSubcategories;

    this.setState({
      activeGearCategory: activeGearCategory,
      activeGearSubcategories: gearSubcategories
    });
  };

  handleGearSubCategoryChange = value => {
    // const activeCategory = this.state.listingCategories.filter(category => {
    //   return category.gearCategory == value;
    // });
    // const gearSubcategories = activeCategory[0].gearSubcategories;
    // this.setState({ activeGearSubcategories: gearSubcategories });
    const componentsObject = this.state.listingCategories[0].components.map(
      component => {
        const container = {};

        container["gear"] = component;
        container["brand"] = "";
        container["model"] = "";
        container["serial"] = "";

        return container;
      }
    );

    if (this.state.listingContent.length === 0 && value === "DSLR") {
      this.setState({ listingContent: componentsObject });
    }
  };

  // To Do Create a function to render options
  // renderOptions = values => {
  //   const options = values.map((value, idx) => (
  //     <Option key={idx} value={value}>
  //       {value}
  //     </Option>
  //   ));

  //   return <>{options}</>;
  // };

  // FOR RENDERAUTOCOMPLETE
  handleSearch = value => {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    });
  };

  searchResult(query) {
    var items = this.props.users.filter(
      item =>
        item.username.toUpperCase().includes(query.toUpperCase()) ||
        (item.profile &&
          ((item.profile.firstName &&
            item.profile.firstName
              .toUpperCase()
              .includes(query.toUpperCase())) ||
            (item.profile.lastName &&
              item.profile.lastName
                .toUpperCase()
                .includes(query.toUpperCase()))))
    );
    return items;
  }

  render() {
    const values = this.props.values;
    const t = this.props.t;
    const isAdmin = this.props.isAdmin;
    console.log(this.props);
    return (
      <>
        {/* // FOR RENDERAUTOCOMPLETE */}
        {isAdmin && (
          <>
            <Field
              name="username"
              dataSource={this.state.dataSource.map(item => item.username)}
              component={RenderAutoComplete}
              label={t("listing.field.username")}
              value={values.username}
              // onSelect={this.onSelect}
              onSearch={this.handleSearch}
            />
          </>
        )}

        {/* Gear Category */}
        <Field
          name="gearCategory"
          component={RenderSelect}
          type="text"
          label={t("listing.field.gearCategory")}
          value={values.gearCategory}
          onChange={this.handleGearCategoryChange}
        >
          {this.state.listingCategories.map((category, idx) => (
            <Select.Option key={idx} value={category.gearCategory}>
              {category.gearCategory}
            </Select.Option>
          ))}
        </Field>

        {/* Gear Sub-Category */}
        {this.state.activeGearSubcategories ? (
          <Field
            name="gearSubcategory"
            component={RenderSelect}
            type="text"
            label={t("listing.field.gearSubcategory")}
            value={values.gearSubcategory}
            onChange={this.handleGearSubCategoryChange}
          >
            {this.state.activeGearSubcategories.map((category, idx) => (
              <Select.Option key={idx} value={category}>
                {category}
              </Select.Option>
            ))}
          </Field>
        ) : null}

        {/* Listing Status */}
        {this.state.isAdmin ? (
          <Field
            name="status"
            component={RenderSelect}
            type="select"
            label={t("listing.field.status")}
            value={values.status}
          >
            {this.state.status.map((status, idx) => (
              <Select.Option key={idx} value={status}>
                {status}
              </Select.Option>
            ))}
          </Field>
        ) : null}

        {/* Listing Is Active (for not showind anywhere) */}
        {this.state.isAdmin ? (
          <Field
            name="isActive"
            component={RenderCheckBox}
            label={t("listing.field.isActive")}
            checked={values.isActive}
          />
        ) : null}

        {/* Listing Content */}
        <FieldArray
          name="listingContent"
          render={arrayHelpers => (
            <RenderDynamicField
              buttonText="Add Component"
              keys={[
                {
                  key: "gear",
                  type: "text",
                  label: "Component Type",
                  placeholder: "ex: Body, Lens"
                },
                {
                  key: "brand",
                  type: "text",
                  label: "Brand",
                  placeholder: "ex: Canon, NIkon"
                },
                {
                  key: "model",
                  type: "text",
                  label: "Model",
                  placeholder: "ex: 5D MARK IV, D5600"
                },
                { key: "serial", type: "text", label: "Serial Number" }
              ]}
              arrayHelpers={arrayHelpers}
              values={values.listingContent}
              initialValues={this.state.listingContent}
              name="listingContent"
              label={t("listing.field.gearComponents")}
            />
          )}
        />

        {/* To Do - Convert Field Array to Field Adaptor */}
        {/* Listing Images */}
        <FieldArray
          name="listingImages"
          label={t("listing.field.listingImages")}
          render={arrayHelpers => (
            <RenderUploadMultiple
              arrayHelpers={arrayHelpers}
              values={values.listingImages}
              dictKey="imageUrl"
            />
          )}
        />

        {/* Gear description */}
        <Field
          name="description"
          component={RenderField}
          type="textarea"
          label={t("listing.field.description")}
          value={values.description}
        />

        {isAdmin && (
          <Field
            name="listingDetail.condition"
            component={RenderRadioGroup}
            type="text"
            label={t("listing.field.listingDetail.condition")}
            value={values.listingDetail.condition}
          >
            {this.state.listingCondition.map((condition, idx) => (
              <RadioButton key={idx} value={condition}>
                {condition}
              </RadioButton>
            ))}
          </Field>
        )}

        <Field
          name="listingDetail.age"
          component={RenderRadioGroup}
          type="text"
          label={t("listing.field.listingDetail.age")}
          value={values.listingDetail.age}
        >
          {this.state.listingAge.map((value, idx) => (
            <RadioButton key={idx} value={value}>
              {value}
            </RadioButton>
          ))}
        </Field>

        <FieldArray
          name="listingDetail.damages"
          render={arrayHelpers => (
            <RenderDynamicField
              buttonText="Add Damages"
              keys={[
                { key: "imageUrl", type: "image", label: "Image" },
                { key: "damageDetail", type: "text", label: "Details" }
              ]}
              arrayHelpers={arrayHelpers}
              values={values.listingDetail.damages}
              name="listingDetail.damages"
              label={t("listing.field.listingDamages")}
            />
          )}
        />
      </>
    );
  }
}

ProductDetails.propTypes = {
  props: PropTypes.object,
  isAdmin: PropTypes.bool,
  t: PropTypes.func
};
