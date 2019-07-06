import React from "react";
import { translate } from "@gqlapp/i18n-client-react";
import { Input, Icon, AutoComplete, Button } from "antd";
import { Link } from "react-router-dom";

const { Option } = AutoComplete;

class AutoCompleteNavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.searchResult = this.searchResult.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    if (this.props.history) {
      return this.props.history.push(`/listing-detail/${value}`);
    }
  }

  // FOR RENDERAUTOCOMPLETE
  handleSearch = value => {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    });
  };

  renderOption(item) {
    return (
      <Option key={item.id} text={item.description}>
        <span>
          Found in{" "}
          <Link to={`/listing-detail/${item.id}`}>{item.description}</Link> in{" "}
          {item.gearSubcategory}
        </span>
        <span className="rightfloat">{item.gearCategory}</span>
      </Option>
    );
  }

  searchResult(query) {
    var items = this.props.listings.filter(
      item =>
        item.gearCategory.toUpperCase().includes(query.toUpperCase()) ||
        item.gearSubcategory.toUpperCase().includes(query.toUpperCase()) ||
        item.description.toUpperCase().includes(query.toUpperCase()) ||
        (item.listingContent &&
          item.listingContent.some(
            listitem =>
              (listitem.gear &&
                listitem.gear.toUpperCase().includes(query.toUpperCase())) ||
              (listitem.brand &&
                listitem.brand.toUpperCase().includes(query.toUpperCase())) ||
              (listitem.model &&
                listitem.model.toUpperCase().includes(query.toUpperCase()))
          ))
    );
    return items;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        size="large"
        dataSource={dataSource.map(this.renderOption)}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="Search brand, camera, model number, category"
        optionLabelProp="text"
      >
        <Input suffix={<Icon type="search" />} />
      </AutoComplete>
    );
  }
}

export default translate("listing")(AutoCompleteNavbarComponent);
