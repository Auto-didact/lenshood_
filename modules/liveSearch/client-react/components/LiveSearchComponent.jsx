import React from "react";
import { Button, List } from "antd";

export default class LiveSearchComponent extends React.Component {
  state = this.props.state;

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.liveSearchList}
          renderItem={item => (
            <List.Item className="marginB20">
              <List.Item.Meta
                title={item.itemName}
                description={item.gearCategory}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
