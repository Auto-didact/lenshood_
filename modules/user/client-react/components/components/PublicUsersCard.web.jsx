import React from "react";
import { Card, CardText } from "@gqlapp/look-client-react";
import ProfileMini from "./ProfileMini";

const UsersCard = ({ data }) => {
  if (data.list.length === 0) {
    return (
      <div style={{ height: "70px", align: "center", padding: " 5px 0px" }}>
        <h4>{data.notFound}</h4>
      </div>
    );
  } else {
    return (
      <div style={{ height: "70px", align: "center" }}>
        {data.list.map((item, key) => (
          <ProfileMini item={item} key={key} />
          // <Divider />
        ))}
      </div>
    );
  }
};

export default UsersCard;