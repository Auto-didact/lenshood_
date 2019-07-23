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
import { Radio, Select, message } from "antd";

const RadioButton = Radio.Button;

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* To Do - Find a way to handle these options in a better way (Database or Constants) */
      listingCategories: {
        gearCategory: [
          "Cameras",
          "Lenses",
          "Tripods and Support",
          "Lighting",
          "Studio Space"
        ],
        gearSubcategory: {
          Cameras: [
            "DSLR's",
            "Point and Shoot cameras",
            "Mirrorless cameras",
            "Action cams",
            "Cinema Cameras"
          ],
          Lenses: ["DSLR Lenses", "Mirrorless Lenses", "Cinema Lenses"],
          Lighting: [
            "Photography Lighting",
            "Video Lighting",
            "Lighting Accesories"
          ],
          "Tripods and Support": [
            "Tripods/Monopods",
            "Gimbals/Stabilizers",
            "Rigs/Sliders"
          ]
        },
        gearSubSubcategory: {
          "DSLR Lenses": [
            "Standard/Zoom Lens",
            "Wide angle/Fish eye Lens",
            "Fixed/Prime Lens"
          ],
          "Mirrorless Lenses": [
            "Standard/Zoom Lens",
            "Wide angle/Fish eye Lens",
            "Fixed/Prime Lens"
          ]
        }
      },

      status: ["idle", "on_rent", "on_shelf", "disabled"],
      activeGearCategory: this.props.values.gearCategory,
      activeGearSubcategories: this.props.values.gearSubcategory,
      activeGearSubSubcategory: this.props.values.gearSubSubcategory,

      listingCondition: ["New", "Good", "Fair"],
      listingAge: ["< 1 year", "1 - 2 years", "> 3 years"],

      listingContent: props.values.listingContent,

      isAdmin: false,

      // FOR RENDERAUTOCOMPLETE
      dataSource: []
    };
    this.handleGearCategoryChange = this.handleGearCategoryChange.bind(this);
    this.handleGearSubSubcategoryChange = this.handleGearSubSubcategoryChange.bind(
      this
    );
    this.handleGearSubCategoryChange = this.handleGearSubCategoryChange.bind(
      this
    );

    // FOR RENDERAUTOCOMPLETE
    this.handleSearch = this.handleSearch.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  handleGearCategoryChange = value => {
    this.props.values.gearSubcategory = null;
    this.props.values.gearSubSubcategory = null;
    this.setState({
      activeGearCategory: value,
      activeGearSubcategories: null,
      activeGearSubSubcategory: null
    });
  };

  handleGearSubCategoryChange = value => {
    this.props.values.gearSubSubcategory = null;
    this.setState({
      activeGearSubcategories: value,
      activeGearSubSubcategory: null
    });
    if (value === "DSLR's" && this.state.listingContent.length === 0) {
      let content = [
        { gear: "Body", brand: null, model: null, serial: null },
        { gear: "Lens", brand: null, model: null, serial: null },
        { gear: "Battery", brand: null, model: null, serial: null },
        { gear: "Battery Charger", brand: null, model: null, serial: null },
        { gear: "Memory Card", brand: null, model: null, serial: null },
        { gear: "Bag", brand: null, model: null, serial: null }
      ];
      message.info("Please fill in the component details");
      this.props.values.listingContent = content;
    }
  };

  handleGearSubSubcategoryChange = value => {
    this.setState({
      activeGearSubSubcategory: value
    });
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
          value={this.state.activeGearCategory}
          onChange={this.handleGearCategoryChange}
        >
          {this.state.listingCategories.gearCategory.map((category, idx) => (
            <Select.Option key={idx} value={category}>
              {category}
            </Select.Option>
          ))}
        </Field>

        {/* Gear Sub-Category */}
        {this.state.listingCategories.gearSubcategory[
          this.state.activeGearCategory
        ] ? (
          <Field
            name="gearSubcategory"
            component={RenderSelect}
            type="text"
            label={t("listing.field.gearSubcategory")}
            value={this.state.activeGearSubcategories}
            onChange={this.handleGearSubCategoryChange}
          >
            {this.state.listingCategories.gearSubcategory[
              this.state.activeGearCategory
            ].map((category, idx) => (
              <Select.Option key={idx} value={category}>
                {category}
              </Select.Option>
            ))}
          </Field>
        ) : null}

        {this.state.listingCategories.gearSubSubcategory[
          this.state.activeGearSubcategories
        ] ? (
          <>
            {this.state.listingCategories.gearSubSubcategory[
              this.state.activeGearSubcategories
            ].some(
              item =>
                item == "Standard/Zoom Lens" ||
                item == "Wide angle/Fish eye Lens"
            ) ? (
              <p>
                <strong>Note: </strong>
                <ul>
                  <li>
                    <strong>Wide angle/fisheye</strong> - below 18mm
                  </li>
                  <li>
                    <strong>zoom/standard</strong> - above 18mm
                  </li>
                </ul>
              </p>
            ) : null}
            <Field
              name="gearSubSubcategory"
              component={RenderSelect}
              type="text"
              label={t("listing.field.gearSubSubcategory")}
              value={this.state.activeGearSubSubcategory}
              onChange={this.handleGearSubSubcategoryChange}
            >
              {this.state.listingCategories.gearSubSubcategory[
                this.state.activeGearSubcategories
              ].map((category, idx) => (
                <Select.Option key={idx} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Field>
          </>
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
              setload={this.props.setload}
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
            setload={this.props.setload}
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
              setload={this.props.setload}
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
