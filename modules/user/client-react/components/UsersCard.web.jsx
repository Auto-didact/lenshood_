import React from "react";
import { Card, CardGroup, CardText } from "@gqlapp/look-client-react";
import ProfileMini from "./ProfileMini";

const UsersCard = ({ data }) => {
  if (data.list.length === 0) {
    return (
      <Card>
        <h3>{data.title}</h3>
        <div style={{ height: "70px", overflow: "auto" }}>
          <CardText>{data.notFound}</CardText>
        </div>
      </Card>
    );
  } else {
    return (
      <Card>
        <h3>{data.title}</h3>
        <div style={{ height: "70px", overflow: "auto" }}>
          {data.list.map(item => (
            <ProfileMini item={item} />
            // <Divider />
          ))}
        </div>
      </Card>
    );
  }
};

export default UsersCard;
