import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Subscription } from "react-apollo";

import LIVESEARCH_SUBSCRIPTION from "../graphql/LiveSearchSubscription.graphql";

export const useLiveSearchWithSubscription = (subscribeToMore, filter) => {
  const [liveSearchUpdated, setLiveSearchUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToUsers();
    return () => subscribe();
  });

  const subscribeToUsers = () => {
    return subscribeToMore({
      document: LIVESEARCH_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { liveSearchUpdated: newData }
          }
        }
      ) => {
        setLiveSearchUpdated(newData);
      }
    });
  };

  return liveSearchUpdated;
};

export default Component => {
  const LiveSearchWithSubscription = props => {
    const { filter } = props;
    return (
      <Subscription
        subscription={LIVESEARCH_SUBSCRIPTION}
        variables={{ filter }}
      >
        {({ data, loading }) => {
          if (!loading && data.liveSearchUpdated) {
            return (
              <Component
                {...props}
                liveSearchUpdated={data.liveSearchUpdated}
              />
            );
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  LiveSearchWithSubscription.propTypes = {
    filter: PropTypes.object
  };

  return LiveSearchWithSubscription;
};
