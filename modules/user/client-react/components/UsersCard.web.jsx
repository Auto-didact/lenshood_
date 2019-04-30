import React from "react";
import { Card, CardGroup, CardText } from "@gqlapp/look-client-react";
import ProfileMini from "./ProfileMini";

const UsersCard = ({ data }) => {
  if (data.list.length === 0) {
    return (
      <Card>
        <CardGroup>
          <h3>{data.title}</h3>
          <CardText>{data.notFound}</CardText>
        </CardGroup>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardGroup>
          <h3>{data.title}</h3>

          {data.list.map(item => (
            <ProfileMini item={item} />
          ))}
        </CardGroup>
      </Card>
    );
  }
};

export default UsersCard;
