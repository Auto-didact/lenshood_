import React from "react";
import { Query } from "react-apollo";
import update from "immutability-helper";

import { CartCounterView } from "../components/CartCounterView";
import { COUNTER_QUERY, COUNTER_SUBSCRIPTION } from "@gqlapp/counter-common";

interface CounterProps {
  subscribeToMore: (opts: any) => any;
  loading: boolean;
  counter: any;
}

class CartCounter extends React.Component<CounterProps> {
  private subscription: any;

  constructor(props: CounterProps) {
    super(props);
    this.subscription = null;
  }

  public componentDidMount() {
    if (!this.props.loading) {
      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCount();
      }
    }
  }

  // remove when Renderer is overwritten
  public componentDidUpdate(prevProps: CounterProps) {
    if (!prevProps.loading) {
      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCount();
      }
    }
  }

  public componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
  }

  public subscribeToCount() {
    this.subscription = this.props.subscribeToMore({
      document: COUNTER_SUBSCRIPTION,
      variables: {},
      updateQuery: (
        prev: any,
        {
          subscriptionData: {
            data: {
              counterUpdated: { amount }
            }
          }
        }: any
      ) => {
        return update(prev, {
          cartCounter: {
            amount: {
              $set: amount
            }
          }
        });
      }
    });
  }

  public render() {
    const { counter, loading } = this.props;
    return <CartCounterView counter={counter} loading={loading} />;
  }
}

const CartCounterWithQuery = (props: any) => (
  <Query query={COUNTER_QUERY}>
    {({ loading, error, data: { serverCounter }, subscribeToMore }) => {
      if (error) {
        throw new Error(String(error));
      }
      return (
        <CartCounter
          {...props}
          loading={loading}
          subscribeToMore={subscribeToMore}
          counter={serverCounter}
        />
      );
    }}
  </Query>
);

export default CartCounterWithQuery;
