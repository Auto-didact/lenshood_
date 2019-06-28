import React from "react";
import { Card, CardText } from "@gqlapp/look-client-react";
import ProfileMiniComponent from "./components/ProfileMiniComponent";

const UsersCardComponent = ({ data }) => {
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
          {data.list.map((item, key) => (
            <ProfileMiniComponent item={item} key={key} />
            // <Divider />
          ))}
        </div>
      </Card>
    );
  }
};

export default UsersCardComponent;
