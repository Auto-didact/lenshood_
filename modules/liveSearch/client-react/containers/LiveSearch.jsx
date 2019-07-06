import React from "react";
import { translate } from "@gqlapp/i18n-client-react";
import LiveSearchView from "../components/LiveSearchView";

const LiveSearch = props => {
  // const { sendRefEmail, loading } = props;
  let state = {
    liveSearchList: [
      {
        id: 1,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 1",
        gearCategory: "Cameras"
      },
      {
        id: 2,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 2",
        gearCategory: "Cameras"
      },
      {
        id: 3,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 3",
        gearCategory: "Lenses"
      },
      {
        id: 4,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 12",
        gearCategory: "Cameras"
      },
      {
        id: 5,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 1",
        gearCategory: "Lenses"
      },
      {
        id: 6,
        users: [
          {
            id: 1,
            username: "theZalophus"
          },
          {
            id: 2,
            username: "thebishaldeb"
          },
          {
            id: 3,
            username: "zalo"
          }
        ],
        itemName: "Assumption 1234",
        gearCategory: "Lenses"
      }
    ]
  };

  return <LiveSearchView {...props} state={state} />;
};

export default translate("liveSearch")(LiveSearch);
